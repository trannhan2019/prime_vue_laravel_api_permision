<script setup>
import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { useAuth } from "@/stores/auth";
// import { useLayout } from "@/layouts/app/composables/layout";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import { useForm } from "vee-validate";
import { useToast } from "primevue/usetoast";
import { login } from "@/api-services/auth";

import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import InputError from "@/components/InputError.vue";

// const { layoutConfig } = useLayout();
const authStore = useAuth();
const toast = useToast();
const router = useRouter();

const schema = toTypedSchema(
  zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
  })
);

const { defineField, handleSubmit, errors, setFieldError, isSubmitting } =
  useForm({
    validationSchema: schema,
  });

const [email] = defineField("email");
const [password] = defineField("password");

const { mutate, isPending } = useMutation({
  mutationFn: (values) => login(values),
});

const submitLogin = handleSubmit((values) => {
  mutate(values, {
    onSuccess: async (data) => {
      toast.add({
        severity: "success",
        summary: "Login Success",
        detail: "Login Success",
        life: 5000,
      });
      authStore.setData(data.data);
      await router.push({ name: "dashboard" });
    },
    onError: (error) => {
      if (error.response.status === 422) {
        setFieldError("email", error.response.data.message);
      }
      toast.add({
        severity: "error",
        summary: "Login Failed",
        detail: "Login Failed",
        life: 5000,
      });
    },
  });
});
</script>

<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <img
        src="/images/logo_sba_2.png"
        alt="Sakai logo"
        class="mb-7 w-15rem flex-shrink-0"
      />
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="w-full surface-card py-8 px-5 sm:px-8"
          style="border-radius: 53px"
        >
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">
              Welcome, Isabel!
            </div>
            <span class="text-600 font-medium">Sign in to continue</span>
          </div>
          <form @submit.prevent="submitLogin">
            <div>
              <div class="field mb-4">
                <label
                  for="email1"
                  class="block text-900 text-xl font-medium mb-2"
                  >Email</label
                >
                <InputText
                  id="email1"
                  type="text"
                  placeholder="Email address"
                  class="w-full md:w-30rem mb-2"
                  style="padding: 1rem"
                  v-model="email"
                  :invalid="!!errors.email"
                />
                <InputError :msg="errors.email" />
              </div>

              <div class="field mb-5">
                <label
                  for="password1"
                  class="block text-900 font-medium text-xl mb-2"
                  >Password</label
                >
                <Password
                  id="password1"
                  v-model="password"
                  placeholder="Password"
                  :toggleMask="true"
                  class="w-full mb-2"
                  inputClass="w-full"
                  :inputStyle="{ padding: '1rem' }"
                  :feedback="false"
                  :invalid="!!errors.password"
                />
                <InputError :msg="errors.password" />
              </div>
              <div
                class="flex align-items-center justify-content-between mb-5 gap-5"
              >
                <a
                  class="font-medium no-underline ml-2 text-right cursor-pointer"
                  style="color: var(--primary-color)"
                  >Forgot password?</a
                >
              </div>
              <Button
                label="Sign In"
                class="w-full p-3 text-xl"
                type="submit"
                :loading="isPending"
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
