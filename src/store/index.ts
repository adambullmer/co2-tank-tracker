/* eslint-disable import/no-mutable-exports */
import { getModule } from "vuex-module-decorators";
import Auth from "@/store/auth";
import Usage from "@/store/usage";

let authStore: Auth;
let usageStore: Usage;

function initializeStores(store: any) {
  authStore = getModule(Auth, store);
  usageStore = getModule(Usage, store);
}

export const state = () => ({});
export const plugins = [initializeStores];
export { authStore, usageStore };
