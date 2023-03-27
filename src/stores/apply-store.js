import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useApplyStore = defineStore("apply", {
  state: () => ({
    showDialogApply: false,
  }),

  actions: {
    async createApply(data) {
      return await api.post("/api/apply", data);
    },
    async getApplys() {
      try {
        const res = await api.get("/api/jobs");
        this.$state.jobs = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
