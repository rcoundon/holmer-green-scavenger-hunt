<template>
  <div class="container is-mobile">
    <p>Note: out of <b class="has-text-primary">52</b> cards, <b class="has-text-success">{{ allocatedCards }}</b> have currently been allocated</p>
    <br/>
    <p class="is-centered has-text-weight-semibold has-text-primary">You have collected {{totalCards}} {{cardWord}} and {{ totalCardsCorrect }} {{successCardWord}} correct</p>
    <br/>
    <b-field grouped position="is-centered">
      <b-field>
        <b-button @click="addCard" type="is-success">Add a card</b-button>
      </b-field>
      <b-field>
        <b-button @click="checkAnswers" type="is-success">Check answers</b-button>
      </b-field>
    </b-field>

    <div v-for="card in cards" :key="card.id">
      <card-tile
        :id="card.id"
        :value="card.value"
        :suit="card.suit"
        :street="card.street"
        :streets="streets"
        @saveCard="createSavedCard"
        @deleteCard="deleteSavedCard"/>
        <hr style="padding: 0; margin-left: auto; margin-right: auto; width: 70vw">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import fastCopy from "fast-copy";
import CardTile from "./CardTile";
import config from "../../data/config";

export default {
  components: {
    CardTile
  },
  data() {
    return {
      config
    };
  },
  computed: {
    ...mapGetters(["cards", "totalCards", "totalCardsCorrect"]),
    cardWord() {
      return this.getCardWord(this.totalCards);
    },
    successCardWord() {
      return this.getAre(this.totalCardsCorrect);
    },
    streets() {
      const streets = this.config.cardTrail.answers.map(answer => {
        return answer.street;
      });
      const uniqueStreets = new Set(streets);
      let uniqueStreetsArray = Array.from(uniqueStreets);
      uniqueStreetsArray = uniqueStreetsArray.sort();
      return uniqueStreetsArray;
    },
    allocatedCards() {
      return this.config.cardTrail.answers.reduce((acc, curr) => {
        if (curr.street !== "UNALLOCATED") {
          return acc + 1;
        }
        return acc;
      }, 0);
    }
  },
  methods: {
    ...mapActions([
      "storeCard",
      "getCardId",
      "storeTotalCardsCorrect",
      "deleteCard"
    ]),
    getCardWord(total) {
      return total === 1 ? "card" : "cards";
    },
    getAre(total) {
      return total === 1 ? "is" : "are";
    },
    async addCard() {
      const id = await this.getCardId();
      this.storeCard({
        id,
        value: "",
        suit: "",
        street: ""
      });
      this.checkAnswers();
    },
    async createSavedCard(card) {
      this.storeCard(card);
      this.checkAnswers();
    },
    deleteSavedCard(cardId) {
      this.deleteCard(cardId);
      this.checkAnswers();
    },
    checkAnswers() {
      let total = 0;
      const answers = fastCopy(this.config.cardTrail.answers);
      this.cards.forEach(card => {
        for (let i = 0; i < answers.length; i++) {
          if (
            answers[i].value === card.value &&
            answers[i].suit === card.suit &&
            answers[i].street === card.street &&
            !answers[i].counted
          ) {
            total++;
            answers[i].counted = true;
          }
        }
      });
      this.storeTotalCardsCorrect(total);
    }
  }
};
</script>

<style>
</style>
