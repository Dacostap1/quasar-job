<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Trabajos"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :dense="$q.screen.lt.md"
        :grid="$q.screen.xs"
        v-model:pagination="pagination"
        :rows-per-page-options="[10, 15, 30]"
        :loading="loading"
        :filter="filter"
        @request="onRequest('/api/jobs', $event)"
      >
        <template v-slot:top-right="{ inFullscreen, toggleFullscreen }">
          <div class="col-2">
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-2">
            <q-btn
              v-if="!$q.screen.lt.md"
              flat
              round
              dense
              :icon="inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="toggleFullscreen"
              class="q-ml-md"
            />
          </div>

          <div class="col-2">
            <q-btn
              color="primary"
              icon="add"
              label="Nuevo Trabajo"
              size="md"
              @click="jobStore.$patch({ showDialogJob: true })"
            />
          </div>
        </template>

        <template v-slot:body-cell-avatar="props">
          <q-td :props="props">
            <q-avatar rounded>
              <img :src="props.value" />
            </q-avatar>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
  <NewJob @reload-table="reloadTable"></NewJob>
</template>

<script setup>
import NewJob from "./NewJob.vue";

import { useJobStore } from "src/stores/job-store";
import useTable from "src/composables/useTable";
import { ref, onMounted } from "vue";

const { rows, filter, loading, pagination, onRequest } = useTable();

const jobStore = useJobStore();

const columns = [
  // {
  //   name: "id",
  //   align: "center",
  //   label: "ID",
  //   field: "id",
  // },
  {
    name: "title",
    label: "Titulo",
    field: "title",
    align: "center",
    sortable: false,
  },
  {
    name: "company",
    label: "Compañia",
    field: "company",
    align: "center",
    sortable: false,
  },
  {
    name: "salary",
    label: "Salario",
    field: (row) => `S/. ${row.salary}`,
    align: "center",
    sortable: false,
  },

  {
    name: "tag",
    label: "Tipo",
    field: "tag",
    align: "center",
    sortable: false,
  },
];

onMounted(() => {
  onRequest("/api/jobs", {
    pagination: pagination.value,
    filter: "",
  });
});

const reloadTable = () => {
  onRequest("/api/jobs", {
    pagination: pagination.value,
    filter: "",
  });
};

// onMounted(async () => {
//   await applyStore.getApplys();
// });
</script>
