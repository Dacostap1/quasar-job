<template>
  <q-item clickable @click="navigateTo">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useRouter } from "vue-router";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "",
  },
  route: {
    type: String,
    default: "",
  },
});
const router = useRouter();
const navigateTo = () => {
  router.push({ name: props.route });
};
</script>
