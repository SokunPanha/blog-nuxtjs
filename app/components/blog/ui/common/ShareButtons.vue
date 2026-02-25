<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
  url: string;
  title: string;
}>();

const copied = ref(false);

const encodedUrl = computed(() => encodeURIComponent(props.url));
const encodedTitle = computed(() => encodeURIComponent(props.title));

const facebookUrl = computed(
  () => `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl.value}`
);

const xUrl = computed(
  () => `https://x.com/intent/tweet?url=${encodedUrl.value}&text=${encodedTitle.value}`
);

const telegramUrl = computed(
  () => `https://t.me/share/url?url=${encodedUrl.value}&text=${encodedTitle.value}`
);

function openShare(url: string) {
  window.open(url, "_blank", "width=600,height=400,noopener,noreferrer");
}

async function copyLink() {
  await navigator.clipboard.writeText(props.url);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}
</script>

<template>
  <div class="flex items-center gap-1 mt-1">
    <span class="text-sm text-gray-500 dark:text-gray-400 mr-1">
      {{ t("label.share") || "Share" }}:
    </span>

    <!-- Facebook -->
    <UTooltip :text="t('label.share_facebook') || 'Share on Facebook'">
      <UButton
        color="neutral"
        variant="ghost"
        size="sm"
        aria-label="Share on Facebook"
        @click="openShare(facebookUrl)"
      >
        <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </UButton>
    </UTooltip>

    <!-- X (Twitter) -->
    <UTooltip :text="t('label.share_x') || 'Share on X'">
      <UButton
        color="neutral"
        variant="ghost"
        size="sm"
        aria-label="Share on X"
        @click="openShare(xUrl)"
      >
        <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
        </svg>
      </UButton>
    </UTooltip>

    <!-- Telegram -->
    <UTooltip :text="t('label.share_telegram') || 'Share on Telegram'">
      <UButton
        color="neutral"
        variant="ghost"
        size="sm"
        aria-label="Share on Telegram"
        @click="openShare(telegramUrl)"
      >
        <svg viewBox="0 0 24 24" class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      </UButton>
    </UTooltip>

    <!-- Copy link -->
    <UTooltip :text="copied ? (t('message.link_copied') || 'Copied!') : (t('label.copy_link') || 'Copy link')">
      <UButton
        color="neutral"
        variant="ghost"
        size="sm"
        :icon="copied ? 'i-lucide-check' : 'i-lucide-link'"
        aria-label="Copy link"
        @click="copyLink"
      />
    </UTooltip>
  </div>
</template>
