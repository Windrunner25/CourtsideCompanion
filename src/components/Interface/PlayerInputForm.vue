<template>
  <div class="new-match-form">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="player1Name">Player 1 Name:</label>
        <input type="text" id="player1Name" v-model="player1Name" required />
        <label for="player2Name">Player 2 Name:</label>
        <input type="text" id="player2Name" v-model="player2Name" required />
      </div>
      <button type="submit" @click="handleClick">Submit</button>
    </form>
  </div>
</template>

<script>


export default {
  data() {
    return {
      player1Name: "",
      player2Name: "",
    };
  },
  methods: {
    // async submitForm() {
    //   console.log("Player 1 Name:", this.player1Name);
    //   console.log("Player 2 Name:", this.player2Name);
    //   await addPlayer(this.player1Name);
    //   await addPlayer(this.player2Name);
    //   this.player1Name = "";
    //   this.player2Name = "";
    // },

    // async handleClick() {
    //   const newData = { playerName: "Grayson Zylstra", value: 456 };
    //   const newDocId = await writeDataToFirestore(
    //     newData,
    //     "players"
    //   );
    //   if (newDocId) {
    //     console.log(`Successfully added data with ID: ${newDocId}`);
    //   }
    // },
  },
};
</script>

<style scoped>
.new-match-form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid black;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
