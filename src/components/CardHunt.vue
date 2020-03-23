<template>
  <div>

    <p class="is-centered has-text-weight-semibold has-text-primary">You have collected {{totalCards}} {{cardWord}}</p>
    <br/>
    <b-field>
      <b-button @click="addCard" type="is-success">Add a card</b-button>
    </b-field>

    <card-tile v-for="card in cards"
      :id="card.id"
      :value="card.value"
      :suit="card.suit"
      :street="card.street"
      :key="card.id"
      @saveCard="createSavedCard"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CardTile from "./CardTile";

export default {
  components: {
    CardTile
  },
  computed: {
    ...mapGetters(["cards", "totalCards"]),
    cardWord() {
      return this.totalCards === 1 ? "card" : "cards";
    }
  },
  methods: {
    ...mapActions(["storeCard", "getCardId"]),
    async addCard() {
      const id = await this.getCardId();
      this.storeCard({
        id,
        value: "",
        suit: "",
        street: ""
      });
    },
    async createSavedCard(card) {
      this.storeCard(card);
    }
  }
};
</script>

<style>
</style>
