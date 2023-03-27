<template>
  <q-dialog v-model="applyStore.showDialogApply">
    <q-card style="width: 700px; max-width: 80vw" class="q-pa-md">
      <div class="text-h6 q-pa-sm">
        Postular a {{ jobStore.jobSelected.title }}
      </div>
      <q-form @submit="createApply" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="file"
          @update:model-value="
            (val) => {
              file = val[0];
            }
          "
          hint="Selecciona tu cv"
          type="file"
          lazy-rules
          accept=".pdf"
          :rules="[(val) => val || 'Ingrese el archivo']"
        />

        <q-input
          filled
          v-model="message"
          label="Descriptcion"
          hint="Descriptcion"
          type="textarea"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Ingrese la descriptcion',
          ]"
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

import { useApplyStore } from "src/stores/apply-store";

import { useJobStore } from "src/stores/job-store";

const file = ref(null);
const message = ref("");

const applyStore = useApplyStore();
const jobStore = useJobStore();

const router = useRouter();

const createApply = async () => {
  console.log(message.value);
  console.log(file.value);
  console.log(jobStore.jobSelected.id);

  const data = new FormData();

  data.append("file", file.value || "");
  data.append("description", message.value || "");
  data.append("job_id", jobStore.jobSelected.id || "");

  try {
    const res = await applyStore.createApply(data);
    if (res.status == 200) {
      setTimeout(() => {
        router.push({ name: "applys" });
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
  message.value = "";
  file.value = null;
};
</script>
