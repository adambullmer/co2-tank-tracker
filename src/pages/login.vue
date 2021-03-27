<template>
  <v-row justify="center" align="center" class="fill-height">
    <v-col cols="9">
      <v-card>
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="onSubmit">
            <v-text-field v-model="email" label="email" />
            <v-text-field
              v-model="password"
              label="password"
              :type="passwordVisible ? 'text' : 'password'"
              :append-icon="passwordVisible ? 'fa-eye-slash' : 'fa-eye'"
              @click:append="passwordVisible = !passwordVisible"
            />
            <v-btn type="submit">Login</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class Login extends Vue {
  email = "";
  password = "";
  passwordVisible = false;

  async onSubmit() {
    try {
      await this.$fire.auth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      this.$router.push({ name: "index" });
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
