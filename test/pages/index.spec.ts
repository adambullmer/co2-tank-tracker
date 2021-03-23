import { mount } from "@vue/test-utils";
import Logo from "@/pages/index.vue";

describe("index", () => {
  test("is a Vue instance", () => {
    const wrapper = mount(Logo);
    expect(wrapper.vm).toBeTruthy();
  });
});
