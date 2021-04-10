import { shallowMount } from "@vue/test-utils";
import Login from "@/pages/login.vue";

describe("Login", () => {
  it("renders successfully", () => {
    const vm = shallowMount(Login);

    expect(vm).toBeDefined();
  });
});
