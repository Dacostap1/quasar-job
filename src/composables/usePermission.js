import { useAuthStore } from "src/stores/auth-store";

export const usePermission = () => {
  const authStore = useAuthStore();

  const can = (permission) => {
    console.log(permission);
    console.log(authStore.permissions.includes(permission));

    return authStore.permissions.includes(permission);
  };

  return { can };
};
