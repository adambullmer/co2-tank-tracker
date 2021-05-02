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
          <p class="text-h3">Litres Produced</p>
        </v-card-text>
      </v-card>

      <v-card class="mt-4">
        <v-card-title>Add Gas Usage</v-card-title>
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col cols="12" md="6" order-md="1">
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

@Component
export default class Index extends Vue {
  currentDate = initialDate();

  async created() {
    await usageStore.watchUsageDocument();
  }

  async destroyed() {
    await usageStore.unwatchUsageDocument();
  }

  handleInput(value: number) {
    usageStore.addUsageDocument({ value, filledAt: this.currentDate });
  }

  get usageValues() {
    return usageStore.usage.map(({ value }) => value);
  }

  get usageLabels() {
    return usageStore.usage.map(({ filledAt }) => filledAt);
  }
}
</script>

<style lang="scss">
.v-sheet--offset {
  position: relative;
  top: -16px;
}
</style>
