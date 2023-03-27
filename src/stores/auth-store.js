import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => state.user != null,
  },
  actions: {
    async getAuthUser() {
      try {
        const res = await api.get("/api/user");
        this.$state.user = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async login(email, password) {
      await api.get("/sanctum/csrf-cookie");
      await api.post("/login", {
        email,
        password,
      });
    },

    async registerUser(
      name,
      email,
      password,
      confirmPassword,
      document_type,
      document_number
    ) {
      await api.get("/sanctum/csrf-cookie");
      await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
        document_type,
        document_number,
      });
    },
    async logout() {
      await api.post("/logout").then((res) => {
        this.$state.user = null;
      });
    },
  },
  persist: true,
});
