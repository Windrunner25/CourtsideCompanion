<template>
  <v-row>
    <component :is="currentPage" />
  </v-row>
</template>

<script>
import { computed } from "vue";
import { useMatchScoreStore } from "@/stores/matchScoreStore";
import Page1Left from "./PagePieces/Page1Left.vue";
import Page1Right from "./PagePieces/Page1Right.vue";

export default {
  components: { Page1Left, Page1Right },
  setup() {
    const scoreStore = useMatchScoreStore();

    // Dynamically determine which component to render
    const currentPage = computed(() => 
      scoreStore.playerServing === 1 ? Page1Left : Page1Right
    );

    return { currentPage };
  },
};
</script>
