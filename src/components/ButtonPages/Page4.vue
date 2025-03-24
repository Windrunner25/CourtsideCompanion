<template>
  <v-row>
    <component :is="currentPage" />
  </v-row>
</template>

<script>
import { computed } from "vue";
import { useMatchScoreStore } from "@/stores/matchScoreStore";
import Page4Left from "./PagePieces/Page4Left.vue";
import Page4Right from "./PagePieces/Page4Right.vue";

export default {
  components: { Page4Left, Page4Right },
  setup() {
    const scoreStore = useMatchScoreStore();

    // Dynamically determine which component to render
    const currentPage = computed(() => 
      scoreStore.playerServing === 1 ? Page4Left : Page4Right
    );

    return { currentPage };
  },
};
</script>
