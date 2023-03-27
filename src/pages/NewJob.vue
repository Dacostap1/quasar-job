<template>
  <q-dialog v-model="jobStore.showDialogJob">
    <q-card style="width: 700px; max-width: 80vw" class="q-pa-md">
      <div class="text-h6 q-pa-sm">Crear trabajo</div>
      <q-form @submit="createJob" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="title"
          label="Titulo"
          hint="Titulo"
          type="text"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Ingrese el Titulo']"
        />
        <q-input
          filled
          v-model="company"
          label="Compañia"
          hint="Compañia"
          type="text"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Ingrese la Compañia']"
        />
        <q-input
          filled
          v-model="description"
          label="Description"
          hint="Description"
          type="text"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Ingrese la descriptcion',
          ]"
        />
        <q-input
          filled
          v-model="salary"
          label="Sueldo"
          hint="Sueldo"
          type="text"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Ingrese el sueldo']"
        />

        <div>
          <q-btn label="Aceptar" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Notify } from "quasar";

import { ref } from "vue";
import { useRouter } from "vue-router";

import { useJobStore } from "src/stores/job-store";

const title = ref(null);
const company = ref(null);
const description = ref(null);
const salary = ref(null);

const jobStore = useJobStore();

const router = useRouter();

const emit = defineEmits(["reload-table"]);

const createJob = async () => {
  console.log(title.value);
  console.log(description.value);
  console.log(salary.value);

  try {
    const res = await jobStore.createJob(
      title.value,
      company.value,
      description.value,
      salary.value
    );
    if (res.status == 200) {
      setTimeout(() => {
        jobStore.$patch({ showDialogJob: false });
        onReset();
        emit("reload-table");
      }, 500);
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);
    Notify.create({
      message: error.response.data.message ?? "Error",
    });
  }
};

const onReset = () => {
  title.value = null;
  company.value = null;
  description.value = null;
  salary.value = null;
};
</script>
