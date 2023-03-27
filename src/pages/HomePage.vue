<template>
  <q-page>
    <div class="q-pa-md">
      <q-list>
        <q-item
          @click="selectJob(job)"
          clickable
          v-for="job in jobsStore.jobs"
          :key="job.id"
        >
          <q-item-section avatar>
            <q-avatar
              size="75px"
              font-size="45px"
              color="teal"
              text-color="white"
              icon="work"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label> {{ job.title }}</q-item-label>
            <q-item-label caption lines="2">{{ job.description }}</q-item-label>
            <div class="q-pa-xs">
              <q-chip color="teal" size="md" text-color="white" icon="bookmark">
                {{ job.tag }}
              </q-chip>
            </div>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-icon name="star" color="yellow" />
          </q-item-section>
        </q-item>

        <q-separator spaced inset />

        <div class="q-pa-lg flex flex-center">
          <q-pagination
            v-model="page"
            :max="maxPage"
            :max-pages="5"
            @update:model-value="updatePaginate"
            direction-links
          />
        </div>
      </q-list>
    </div>
  </q-page>

  <NewApply></NewApply>
</template>

<script setup>
import { useJobStore } from "src/stores/job-store";
import { useApplyStore } from "src/stores/apply-store";

import { ref, onMounted } from "vue";

import NewApply from "./NewApply.vue";

const jobsStore = useJobStore();

const applyStore = useApplyStore();

const page = ref(1);
const maxPage = ref(0);

const updatePaginate = async (val) => {
  console.log(val);

  maxPage.value = await jobsStore.getJobs(val);
};

const selectJob = (job) => {
  console.log(job);
  jobsStore.$patch({ jobSelected: job });
  applyStore.$patch({ showDialogApply: true });
};

onMounted(async () => {
  // showDialog.value = true;
  maxPage.value = await jobsStore.getJobs(page.value);
});
</script>
