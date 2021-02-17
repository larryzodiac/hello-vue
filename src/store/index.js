import { createStore } from "vuex";
import cartModule from "./modules/cart.js";
import productsModule from "./modules/products.js";

export default createStore({
  state() {
    return {
      isLoggedIn: false
    };
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    }
  },
  actions: {
    setLogin(context) {
      context.commit("login");
    },
    setLogout(context) {
      context.commit("logout");
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isLoggedIn;
    }
  },
  modules: {
    prods: productsModule,
    cart: cartModule
  }
});
