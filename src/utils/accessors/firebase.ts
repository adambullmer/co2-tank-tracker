/* eslint-disable import/no-mutable-exports */
import { NuxtFireInstance } from "@nuxtjs/firebase";

let $fire: NuxtFireInstance;

export const expose = ($firebase: NuxtFireInstance) => {
  $fire = $firebase;
};

export { $fire };
