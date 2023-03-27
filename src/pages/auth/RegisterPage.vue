<template>
  <div class="text-center text-h4 q-pa-lg">Registro</div>

  <q-card-section>
    <q-form class="q-gutter-md">
      <q-input outlined v-model="registerForm.name" type="text" label="Name">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>

      <q-input outlined v-model="registerForm.email" type="email" label="Email">
        <template v-slot:prepend>
          <q-icon name="email" />
        </template>
      </q-input>

      <q-input
        outlined
        v-model="registerForm.documentType"
        type="text"
        label="Tipo de Documento"
      >
      </q-input>

      <q-input
        outlined
        v-model="registerForm.documentNumber"
        type="text"
        label="Numero de documento"
      >
      </q-input>

      <q-input
        outlined
        v-model="registerForm.birthDate"
        type="date"
        label="Fecha de Nacimiento"
      >
      </q-input>

      <q-input
        outlined
        v-model="registerForm.password"
        :type="isPwd ? 'password' : 'text'"
        label="Contraseña"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-input
        outlined
        v-model="registerForm.password"
        :type="isPwd ? 'password' : 'text'"
        label="Contraseña"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </q-form>
  </q-card-section>

  <q-card-actions class="q-px-md">
    <q-btn
      unelevated
      class="full-width"
      color="blue"
      size="lg"
      label="REGISTRAR"
      @click="register"
    />
  </q-card-actions>

  <div
    class="text-grey-6 q-pa-md text-center"
    @click="$router.push({ name: 'login' })"
  >
    Ya tienes una cuenta?
  </div>

  <q-separator spaced inset />
</template>

<style>
.q-card {
  width: 360px;
}
</style>

<script setup>
import { useAuth } from "src/composables/useAuth";

import { ref } from "vue";

const { registerForm, register } = useAuth();

const isPwd = ref(true);
</script>
