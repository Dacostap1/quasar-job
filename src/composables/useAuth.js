import { Notify } from "quasar";
import { useAuthStore } from "src/stores/auth-store";
import { reactive } from "vue";
import { useRouter } from "vue-router";

export const useAuth = () => {
  const authStore = useAuthStore();
  const router = useRouter();

  const loginForm = reactive({
    email: "admin@hotmail.com",
    password: "12345678",
  });

  const registerForm = reactive({
    name: "Usuario Test",
    email: "test1@gmail.com",
    documentNumber: "702539377",
    documentType: "dni",
    birthDate: "",
    password: "12345678",
    confirmPassword: "12345678",
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
        message: res.message,
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
        message: res.message,
      });
    }
  };

  const logout = async () => {
    authStore
      .logout()
      .then(() => router.push({ name: "login" }))
      .catch((res) => {
        console.log(res);

        Notify.create({
          message: res.message,
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
