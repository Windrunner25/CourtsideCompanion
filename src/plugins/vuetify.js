/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#29333a", 
          secondary: "#000000",
          gold: "#fdb71a",
          gold_light: "#FEDB8C",
          green: "#c0e4c0",
          red: "#FF6666",
        },
      },
    },
  },
});
