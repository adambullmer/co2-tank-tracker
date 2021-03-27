/* eslint-disable import/no-mutable-exports */
import { config, getModule } from "vuex-module-decorators";
import Auth from "@/store/auth";

config.rawError = true;

let authStore: Auth;

function initializeStores(store: any) {
  authStore = getModule(Auth, store);
}

export const state = () => ({});
export const plugins = [initializeStores];
export { authStore };
