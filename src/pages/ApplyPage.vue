<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Postulaciones"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :dense="$q.screen.lt.md"
        :grid="$q.screen.xs"
        v-model:pagination="pagination"
        :rows-per-page-options="[10, 15, 30]"
        :loading="loading"
        :filter="filter"
        @request="onRequest('/api/users', $event)"
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
</template>

<script setup>
import { useApplyStore } from "src/stores/apply-store";
import useTable from "src/composables/useTable";
import { date } from "quasar";

import { ref, onMounted } from "vue";

const { rows, filter, loading, pagination, onRequest } = useTable();

const applyStore = useApplyStore();

const columns = [
  {
    name: "id",
    align: "center",
    label: "ID",
    field: "id",
  },
  {
    name: "description",
    label: "Descripcion",
    field: "description",
    align: "center",
    sortable: false,
  },
  {
    name: "created_at",
    label: "Fecha de Registro",
    field: (row) => date.formatDate(row.created_at, "YYYY-MM-DD"),
    align: "center",
    sortable: false,
  },
];

onMounted(() => {
  onRequest("/api/apply", {
    pagination: pagination.value,
    filter: "",
  });
});

// onMounted(async () => {
//   await applyStore.getApplys();
// });
</script>
