<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="9">
      <v-card class="mt-4">
        <v-sheet
          class="v-sheet--offset mx-auto"
          color="green"
          elevation="12"
          max-width="calc(100% - 32px)"
        >
          <v-sparkline
            :value="usageValues"
            :labels="usageLabels"
            :smooth="10"
            auto-draw
            color="white"
            line-width="2"
            height="150"
          />
        </v-sheet>
        <v-card-text class="pt-0">
          <p class="text-h3">Litres: {{ totalLitresProduced }}</p>
          <p class="text-h3 green--text">
            Produced: {{ valueProduced | money }}
          </p>
          <p class="text-h3 red--text">Supplies: {{ -suppliesCost | money }}</p>
          <p
            class="text-h3"
            :class="{
              'green--text': valueProduced - suppliesCost > 0,
              'red--text': valueProduced - suppliesCost < 0,
            }"
          >
            Savings: {{ (valueProduced - suppliesCost) | money }}
          </p>
        </v-card-text>
      </v-card>

      <v-card class="mt-4">
        <v-card-title>Add Gas Usage</v-card-title>
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col
              cols="12"
              md="6"
              order-md="1"
              class="d-flex align-center justify-center"
            >
              <v-date-picker v-model="currentDate" />
            </v-col>

            <v-col cols="12" md="6">
              <v-row align="center" justify="center">
                <v-col
                  v-for="i in 10"
                  :key="i"
                  cols="4"
                  class="d-flex justify-center"
                >
                  <v-btn fab @click="handleInput(i)">{{ i }}</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-snackbar v-model="snackbarModel" color="success">
        <span class="text-h5">Added Usage of {{ recentAmount }} Litres</span>
        <template #action="{ attrs }">
          <v-btn v-bind="attrs" icon @click="snackbarModel = false">
            <v-icon>fa-times</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { usageStore } from "@/store";
import { format } from "date-fns";

function initialDate() {
  return format(new Date(), "yyyy-MM-dd");
}

@Component({
  filters: {
    money(value: any) {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD",
      }).format(value);
    },
  },
})
export default class Index extends Vue {
  currentDate = initialDate();
  snackbarModel = false;
  recentAmount = 0;

  async created() {
    await usageStore.watchUsageDocument();
  }

  async destroyed() {
    await usageStore.unwatchUsageDocument();
  }

  async handleInput(value: number) {
    await usageStore.addUsageDocument({ value, filledAt: this.currentDate });
    this.recentAmount = value;
    this.snackbarModel = true;
  }

  get usageValues() {
    return usageStore.dailyUsage().map(({ value }) => value);
  }

  get usageLabels() {
    const length = usageStore.dailyUsage().length;
    const maxMiddleLabels = 5;
    const mod = Math.ceil(length / maxMiddleLabels) - 1;

    return usageStore
      .dailyUsage()
      .map(({ filledAt }, index) =>
        index === 0 || index === length - 1 || index % mod === 0
          ? format(filledAt, "MM-dd")
          : " "
      );
  }

  get suppliesCost() {
    return 200;
  }

  get totalLitresProduced() {
    return usageStore.usage.reduce((total, { value }) => total + value, 0);
  }

  get valueProduced() {
    const topoPrice = 10.99;
    const tax = 8.25 / 100 + 1;
    const topoLitres = (12 * 12) / 33.814;

    return (this.totalLitresProduced / topoLitres) * topoPrice * tax;
  }
}
</script>

<style lang="scss">
.v-sheet--offset {
  position: relative;
  top: -16px;
}
</style>
