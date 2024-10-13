import { ref, onMounted, onBeforeUnmount } from "vue";

export function useMediaQuery(query: string) {
  const matches = ref(false);

  const mediaQueryList = window.matchMedia(query);

  // Function to update the reactive state
  const updateMatches = () => {
    matches.value = mediaQueryList.matches;
  };

  // Set the initial value
  updateMatches();

  // Listener for changes
  const handleChange = (event: MediaQueryListEvent) => {
    matches.value = event.matches;
  };

  onMounted(() => {
    mediaQueryList.addEventListener("change", handleChange);
  });

  onBeforeUnmount(() => {
    mediaQueryList.removeEventListener("change", handleChange);
  });

  return { matches };
}
