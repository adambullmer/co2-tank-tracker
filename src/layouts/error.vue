<template>
  <v-container>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <nuxt-link to="/"> Home page </nuxt-link>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({
  head(this: ErrorLayout) {
    const title =
      this.error?.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
})
export default class ErrorLayout extends Vue {
  layout = "default";

  @Prop({ type: Object, default: null }) readonly error!: {
    statusCode: number;
  } | null;

  pageNotFound = "404 Not Found";
  otherError = "An error occurred";
}
</script>
