<template>
    <v-row>
      <v-col cols="6">
        <PageFiveSixButtons :button1="'Ground'" :id1="'ground'" :button2="'Cross Court'" :id2="'crosscourt'"/>
        <PageFiveSixButtons :button1="'Slice'" :id1="'slice'" :button2="'Middle'" :id2="'middle'"/>
        <PageFiveSixButtons :button1="'Volley'" :id1="'volley'" :button2="'Line'" :id2="'line'"/>
        <PageFiveSixButtons :button1="'Smash'" :id1="'smash'" :button2="'Long'" :id2="'long'"/>
        <PageFiveSixButtons :button1="'Lob'" :id1="'lob'" :button2="'Net'" :id2="'net'"/>
        <PageFiveSixButtons :button1="'Pass'" :id1="'pass'" :button2="'Wide'" :id2="'wide'"/>
        <PageFiveSixButtons :button1="'Dropshot'" :id1="'dropshot'" :button2="'blank'" :id2="'blank'"/>
        <PageFiveSixButtons :button1="'blank1'" :id1="'blank1'" :button2="'blank2'" :id2="'blank2'"/>
      </v-col>
    </v-row>
  </template>
  
  <script>
  import { useButtonStore } from "@/stores/buttonStores";
import PageFiveSixButtons from "./PageFiveSixButtons.vue";
  
  export default {
    setup() {
      const buttonStore = useButtonStore();
      return { buttonStore };
    },
    data() {
      return {};
    },
  };
  </script>
  
  <style>
  .selected {
    background-color: #fdb71a;
    color: white;
  }
  </style>
  