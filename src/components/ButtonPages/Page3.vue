<template>
  <v-row>
    <component :is="currentPage" />
  </v-row>
</template>

<script>
import { computed } from "vue";
import { useMatchScoreStore } from "@/stores/matchScoreStore";
import Page3Left from "./PagePieces/Page3Left.vue";
import Page3Right from "./PagePieces/Page3Right.vue";

export default {
  components: { Page3Left, Page3Right },
  setup() {
    const scoreStore = useMatchScoreStore();

    // Dynamically determine which component to render
    const currentPage = computed(() => 
      scoreStore.playerServing === 1 ? Page3Left : Page3Right
    );

    return { currentPage };
  },
};
</script>
