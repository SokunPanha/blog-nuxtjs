export const useMediaQuery = (query: "sm" | "md" | "lg" | "xl" | "2xl") => {
  const ScreenSize = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  };
  const isMatch = ref(false);
  let el: any;

  onMounted(() => {
    el = window.addEventListener("resize", () => {
      if (window.innerWidth >= ScreenSize[query]) {
        isMatch.value = true;
      } else {
        isMatch.value = false;
      }
    });
  });

  onUnmounted(() => {
    window.removeEventListener("resize", el);
  });

  return isMatch;
};
