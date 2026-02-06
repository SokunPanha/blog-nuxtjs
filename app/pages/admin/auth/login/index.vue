<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";
import { useAuth } from "~/compossables/useAuth";

definePageMeta({
  layout: false,
});

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  username: "",
  password: "",
});

const errorMessage = ref("");
const { login, loading } = useAuth();
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4"
  >
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Login
          </h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to access the admin panel
          </p>
        </div>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="login(state.username, state.password)"
      >
        <UFormField label="Username" name="username">
          <UInput
            v-model="state.username"
            placeholder="Enter your username"
            icon="i-lucide-user"
            size="lg"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput
            v-model="state.password"
            type="password"
            placeholder="Enter your password"
            icon="i-lucide-lock"
            size="lg"
            class="w-full"
          />
        </UFormField>

        <UAlert
          v-if="errorMessage"
          color="error"
          variant="soft"
          :title="errorMessage"
          icon="i-lucide-alert-circle"
        />

        <UButton
          type="submit"
          color="primary"
          size="lg"
          block
          :loading="loading"
        >
          Sign In
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>
