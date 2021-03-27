import { Plugin } from "@nuxt/types";
import { expose } from "@/utils/accessors/firebase";

const plugin: Plugin = ({ $fire }) => {
  expose($fire);
};

export default plugin;
