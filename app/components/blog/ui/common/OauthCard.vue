<script setup lang="ts">
import { useBlogAuth } from "~/composables/blog/useBlogAuth";

const { loginWithGithub, loginWithGoogle } = useBlogAuth();

const props = defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});
</script>

<template>
      <div class="p-6 flex flex-col items-center gap-6">
        <div class="text-center">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ title || $t("label.sign_up_with") || "Sign up with" }}
          </h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{
              description ||
              $t("message.choose_provider") ||
              "Choose your preferred sign up method"
            }}
          </p>
        </div>

        <div class="flex flex-col gap-3 w-full max-w-xs">
          <UButton
            color="neutral"
            variant="outline"
            size="lg"
            icon="i-simple-icons-google"
            class="justify-center"
            @click="loginWithGoogle"
          >
            Google
          </UButton>
          <UButton
            color="neutral"
            variant="outline"
            size="lg"
            icon="i-simple-icons-github"
            class="justify-center"
            @click="loginWithGithub"
          >
            GitHub
          </UButton>
          <slot name="footer"></slot>
        </div>
      </div>
</template>
