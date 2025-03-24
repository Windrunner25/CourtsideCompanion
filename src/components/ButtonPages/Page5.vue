<template>
  <v-row>
    <component :is="currentPage" />
  </v-row>
</template>

<script>
import { computed } from "vue";
import { useMatchScoreStore } from "@/stores/matchScoreStore";
import Page5Left from "./PagePieces/Page5Left.vue";
import Page5Right from "./PagePieces/Page5Right.vue";

export default {
  components: { Page5Left, Page5Right },
  setup() {
    const scoreStore = useMatchScoreStore();

    // Dynamically determine which component to render
    const currentPage = computed(() => 
      scoreStore.playerServing === 1 ? Page5Left : Page5Right
    );

    return { currentPage };
  },
};
</script>
