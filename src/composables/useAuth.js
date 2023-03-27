import { Notify } from "quasar";
import { useAuthStore } from "src/stores/auth-store";
import { reactive } from "vue";
import { useRouter } from "vue-router";

export const useAuth = () => {
  const authStore = useAuthStore();
  const router = useRouter();

  const loginForm = reactive({
    email: "admin@example.com",
    password: "password",
  });

  const registerForm = reactive({
    name: "Usuario Test",
    email: "postulante2@gmail.com",
    documentNumber: "702539377",
    documentType: "dni",
    birthDate: "",
    password: "password",
    confirmPassword: "password",
  });

  const loginWithCredentials = async () => {
    try {
      // "admin@hotmail.com"// "12345678"
      await authStore.login(loginForm.email, loginForm.password);
      await authStore.getAuthUser();

      router.push({ name: "home" });
    } catch (error) {
      console.log(error);

      Notify.create({
        message: error.response.data.message ?? "Error",
      });
    }
  };

  const register = async () => {
    try {
      await authStore.registerUser(
        registerForm.name,
        registerForm.email,
        registerForm.password,
        registerForm.confirmPassword,
        registerForm.documentNumber,
        registerForm.documentType,
        registerForm.birthDate
      );

      await authStore.getAuthUser();
      router.push({ name: "home" });
    } catch (error) {
      console.log(error);

      Notify.create({
        message: error.response.data.message ?? "Error",
      });
    }
  };

  const logout = async () => {
    authStore
      .logout()
      .then(() => router.push({ name: "login" }))
      .catch((res) => {
        Notify.create({
          message: error.response.data.message ?? "Error",
        });
      });
  };

  return {
    loginForm,
    loginWithCredentials,
    registerForm,
    register,
    logout,
  };
};
