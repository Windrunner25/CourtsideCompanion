<template>
  <v-row>
    <component :is="currentPage" />
  </v-row>
</template>

<script>
import { computed } from "vue";
import { useMatchScoreStore } from "@/stores/matchScoreStore";
import Page2Left from "./PagePieces/Page2Left.vue";
import Page2Right from "./PagePieces/Page2Right.vue";

export default {
  components: { Page2Left, Page2Right },
  setup() {
    const scoreStore = useMatchScoreStore();

    // Dynamically determine which component to render
    const currentPage = computed(() => 
      scoreStore.playerServing === 1 ? Page2Left : Page2Right
    );

    return { currentPage };
  },
};
</script>
