<template>
  <div class="text-center text-h4 q-pa-lg">Logo</div>

  <q-card-section>
    <q-form class="q-gutter-md">
      <q-input outlined v-model="loginForm.email" type="email" label="Email">
        <template v-slot:prepend>
          <q-icon name="email" />
        </template>
      </q-input>

      <q-input
        outlined
        v-model="loginForm.password"
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
      label="Iniciar Sesion"
      @click="loginWithCredentials"
    />
  </q-card-actions>

  <div
    class="text-grey-6 q-pa-md text-center"
    @click="$router.push({ name: 'register' })"
  >
    ¿No tienes una cuenta?
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

const { loginForm, loginWithCredentials } = useAuth();
const isPwd = ref(true);
</script>
