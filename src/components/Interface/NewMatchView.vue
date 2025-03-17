<template>
  <div class="container">
    <div class="button-wrapper">
      <NewMatchForm />
    </div>
  </div>
</template>

<script>
import NewMatchForm from "./NewMatchForm.vue";

export default {
  name: "NewMatchView",
  components: {
    NewMatchForm,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fdb71a;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #29333a;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
