import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const useJobStore = defineStore("job", {
  state: () => ({
    showDialogJob: false,
    jobSelected: null,
    jobs: [],
  }),

  actions: {
    async createJob(title, company, description, salary) {
      return await api.post("/api/jobs", {
        title,
        company,
        description,
        salary,
      });
    },
    async getJobs(page) {
      try {
        const res = await api.get("/api/jobs", {
          params: {
            page: page,
          },
        });

        console.log(res.data.data);
        this.jobs = res.data.data;

        // this.pagination.page = res.data.meta.current_page;
        // this.pagination.rowsPerPage = res.data.meta.per_page;
        // this.pagination.rowsNumber = res.data.meta.total;
        return res.data.meta.last_page;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
