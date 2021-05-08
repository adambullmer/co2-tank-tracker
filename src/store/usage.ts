import {
  Vue,
  Module,
  VuexModule,
  VuexAction as Action,
  VuexMutation as Mutation,
} from "nuxt-property-decorator";
import { config } from "vuex-module-decorators";
import { $fire } from "@/utils/accessors/firebase";
import { subDays, format, compareAsc } from "date-fns";

let ref: ReturnType<typeof $fire["database"]["ref"]> | null;

config.rawError = true;

@Module({
  name: "usage",
  namespaced: true,
  stateFactory: true,
  preserveState: true,
})
export default class Usage extends VuexModule {
  usage: any[] = [];

  get indexById() {
    return (id: string) => this.usage.findIndex((entry) => entry.id === id);
  }

  get dailyUsage() {
    return (days = 30) => {
      const usageData: Record<string, any> = {};
      const today = Date.now();

      for (let x = days; x >= 0; x--) {
        const day = subDays(today, x);
        const date = format(day, "yyyy-MM-dd");
        usageData[date] = {
          filledAt: day,
          value: 0,
        };
      }

      this.usage.reduce((acc, item) => {
        if (acc[item.filledAt]) {
          acc[item.filledAt].value += item.value;
        }

        return acc;
      }, usageData);

      const usage = Object.values(usageData)
        .map(({ filledAt, value }: any) => ({
          filledAt,
          value,
        }))
        .sort((a, b) => compareAsc(a.filledAt, b.filledAt));

      return usage;
    };
  }

  @Action
  watchUsageDocument() {
    ref = $fire.database
      .ref(`usage/${$fire.auth.currentUser?.uid}/events`)
      .orderByChild("createdAt").ref;

    ref?.on("child_added", this.addChild.bind(this));
    ref?.on("child_changed", this.changeUsageDocument.bind(this));
    ref?.on("child_removed", this.removeUsageDocument.bind(this));
  }

  @Action
  unwatchUsageDocument() {
    ref?.off();
    ref = null;
    this.resetStore();
  }

  @Action
  async addUsageDocument({
    value,
    filledAt,
  }: {
    value: number;
    filledAt: string;
  }) {
    const createdAt = Date.now();
    const key = ref?.push();

    await key?.set({
      createdAt,
      value,
      filledAt,
    });
  }

  @Action
  changeUsageDocument(snapshot: any) {
    const id = snapshot.key;
    const index = this.indexById(id);
    this.changeChild({ snapshot, index });
  }

  @Action
  removeUsageDocument(snapshot: any) {
    const id = snapshot.key;
    const index = this.indexById(id);
    this.removeChild(index);
  }

  @Mutation
  addChild(snapshot: any) {
    const id = snapshot.key;
    const item = {
      ...snapshot.val(),
      id,
    };

    this.usage.push(item);
  }

  @Mutation
  changeChild({ snapshot, index }: { snapshot: any; index: number }) {
    if (index !== -1) {
      Vue.set(this.usage, index, snapshot.val());
    }
  }

  @Mutation
  removeChild(index: number) {
    if (index !== -1) {
      this.usage.splice(index, 1);
    }
  }

  @Mutation
  resetStore() {
    this.usage.splice(0, this.usage.length);
  }
}
