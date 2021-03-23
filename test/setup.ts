import Vue from "vue";
import Vuetify from "vuetify";
import { config as testUtilsConfig } from "@vue/test-utils";
import { config } from "vuex-module-decorators";

// Use server testing config
// jest.mock("@/utils/accessors/config");
// jest.mock("@/utils/accessors/http");

Vue.config.silent = true;
Vue.config.productionTip = false;
Vue.use(Vuetify);

config.rawError = true;

testUtilsConfig.stubs = {
  // Nuxt stub components
  NuxtLink: { template: `<a v-bind="$attrs"><slot /></a>` },
  ClientOnly: { template: `<div><slot /></div>` },
};
