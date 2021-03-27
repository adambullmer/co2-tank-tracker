import { Middleware } from "@nuxt/types";
import { authStore } from "@/store";

const middleware: Middleware = ({ app, redirect, route }) => {
  const loggedIn = app.$fire.auth && authStore.isLoggedIn;

  if (route.path === "/login") {
    if (!loggedIn) {
      return;
    }

    return redirect("/");
  }

  if (!loggedIn) {
    redirect("/login");
  }
};

export default middleware;
