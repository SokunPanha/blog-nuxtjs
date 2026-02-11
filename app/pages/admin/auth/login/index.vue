<script setup lang="ts">
import * as z from "zod";
import { useAuth } from "~/composables/useAuth";
const {t} = useI18n()
definePageMeta({
  layout: false,
});

const schema = z.object({
  username: z.string().min(1, t("validation.username_required")),
  password: z.string().min(1, t("validation.password_required")),
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
            {{ $t('label.login_to_system') }}
          </h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {{ $t('label.blog_admin') }}
          </p>
        </div>
      </template>

      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="login(state.username, state.password)"
      >
        <UFormField :label="$t('label.username')" name="username">
          <UInput
            v-model="state.username"
            :placeholder="$t('placeholder.enter_username')"
            icon="i-lucide-user"
            size="lg"
            class="w-full"
          />
        </UFormField>

        <UFormField :label="$t('label.password')" name="password">
          <UInput
            v-model="state.password"
            type="password"
            :placeholder="$t('placeholder.enter_password')"
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
          {{ $t('label.login') }}
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>
