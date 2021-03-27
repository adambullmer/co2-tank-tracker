import {
  Vue,
  Module,
  VuexModule,
  VuexAction as Action,
  VuexMutation as Mutation,
} from "nuxt-property-decorator";

@Module({
  name: "auth",
  namespaced: true,
  stateFactory: true,
  preserveState: true,
})
export default class Auth extends VuexModule {
  authUser = null;
  claims = null;

  get isLoggedIn() {
    return Boolean(this.claims);
  }

  @Action
  authChange(_: { authUser: any; claims: any }) {
    // this.setAuth({ authUser, claims });
  }

  @Mutation
  setAuth({ authUser, claims }: { authUser: any; claims: any }) {
    if (!authUser) {
      Vue.set(this, "authUser", null);
      Vue.set(this, "claims", null);
    } else {
      const { uid, email, emailVerified } = authUser;

      Vue.set(this, "claims", claims);
      Vue.set(this, "authUser", { uid, email, emailVerified });
    }
  }
}
