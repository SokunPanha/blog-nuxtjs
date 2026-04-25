import { useIntersectionObserver } from '@vueuse/core'

export function useAnimateOnEnter(threshold = 0.1) {
  const el = ref<HTMLElement | null>(null)
  const entered = ref(false)
  const mounted = ref(false)

  onMounted(() => {
    mounted.value = true
  })

  useIntersectionObserver(el, ([entry]) => {
    if (entry.isIntersecting) entered.value = true
  }, { threshold })

  // Before mount (SSR): no class → fully visible.
  // After mount, not yet intersected: hidden. After intersect: visible + animated.
  const animClass = computed(() => {
    if (!mounted.value) return ''
    return entered.value
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-8'
  })

  return { el, entered, mounted, animClass }
}
