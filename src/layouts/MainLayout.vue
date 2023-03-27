<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Job App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section side>
            <q-avatar rounded size="48px">
              {{ authStore.user.name.substring(0, 2).toUpperCase() }}
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ authStore.user.name }}</q-item-label>
            <q-item-label caption>{{ authStore.user.email }}</q-item-label>
          </q-item-section>
        </q-item>

        <EssentialLink v-for="link in linksList" :key="link" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

import { useAuthStore } from "src/stores/auth-store";

const authStore = useAuthStore();

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const linksList = [
  {
    title: "Home",
    icon: "home",
    route: "inicio",
  },
  {
    title: "Mis Postulaciones",
    icon: "school",
    route: "applys",
  },
  {
    title: "Trabajos",
    icon: "work",
    route: "jobs",
  },
];
</script>
