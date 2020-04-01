<template>
  <div class="container is-mobile">
    <p>Note: out of <b class="has-text-primary">54</b> cards, <b class="has-text-success">{{ allocatedCards }}</b> have currently been allocated</p>
    <br/>
    <p class="is-centered has-text-weight-semibold has-text-primary">You have collected {{totalCards}} {{cardWord}} and {{ totalCardsCorrect }} {{successCardWord}} correct</p>
    <p style="padding-top: 1em" class="has-text-success is-size-4 has-text-weight-bold" v-if="totalCardsCorrect === 54">CONGRATULATIONS!!! You found all the cards.  Thanks for taking part</p>
    <br/>
    <b-field grouped position="is-centered">
      <b-field>
        <b-button @click="addCard" type="is-success">Add a card</b-button>
      </b-field>
      <b-field>
        <b-button @click="checkAnswers" type="is-success">Check answers</b-button>
      </b-field>
    </b-field>
    <b-field style="margin-top: -1em">
      <b-button @click="showStreetCounts" type="is-success">Show numbers for each street</b-button>
    </b-field>
    <div class="separator">
      <joker
          colour="Red"
          :street="redJoker"
          :streets="streets"
          @saveJoker="saveJoker"
          @deleteJoker="deleteJoker"/>

      <joker
          colour="Black"
          :street="blackJoker"
          :streets="streets"
          @saveJoker="saveJoker"
          @deleteJoker="deleteJoker"/>
    </div>
    <div v-show="cards.length > 0" class="separator" style="padding-top:1em">
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import fastCopy from "fast-copy";
import CardTile from "./CardTile";
import Joker from "./Joker";
import StreetCounts from "./StreetCounts";
import config from "../../data/config";

export default {
  components: {
    CardTile,
    Joker
  },
  data() {
    return {
      config,
      columns: [
        {
          label: "Street",
          field: "street"
        },
        {
          label: "Number of cards",
          field: "count"
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      "cards",
      "totalCards",
      "totalCardsCorrect",
      "redJoker",
      "blackJoker"
    ]),
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
      const jokerStreets = this.config.cardTrail.jokers.map(joker => {
        return joker.street;
      });
      const uniqueStreets = new Set(streets);
      uniqueStreets.add(...jokerStreets);
      let uniqueStreetsArray = Array.from(uniqueStreets);
      uniqueStreetsArray = uniqueStreetsArray.sort();
      return uniqueStreetsArray;
    },
    streetCounts() {
      const allStreetCounts = [];
      this.streets.forEach(street => {
        const streetCount = {
          street,
          count: 0
        };
        this.config.cardTrail.answers.forEach(answer => {
          if (answer.street === street) {
            streetCount.count++;
          }
        });
        this.config.cardTrail.jokers.forEach(joker => {
          if (joker.street === street) {
            streetCount.count++;
          }
        });
        allStreetCounts.push(streetCount);
      });

      return allStreetCounts;
    },
    allocatedCards() {
      const totalAllocatedRegularCards = this.config.cardTrail.answers.reduce(
        (acc, curr) => {
          if (curr.street !== "UNALLOCATED") {
            return acc + 1;
          }
          return acc;
        },
        0
      );

      const totalAllocatedJokers = this.config.cardTrail.jokers.reduce(
        (acc, curr) => {
          if (curr.street !== "UNALLOCATED") {
            return acc + 1;
          }
          return acc;
        },
        0
      );
      return totalAllocatedJokers + totalAllocatedRegularCards;
    }
  },
  methods: {
    ...mapActions([
      "storeCard",
      "getCardId",
      "storeTotalCardsCorrect",
      "deleteCard",
      "storeRedJoker",
      "storeBlackJoker"
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
    saveJoker(joker) {
      if (joker.colour === "Red") {
        this.storeRedJoker(joker.street);
      }
      if (joker.colour === "Black") {
        this.storeBlackJoker(joker.street);
      }
      this.checkAnswers();
    },
    deleteJoker(colour) {
      if (colour === "Red") {
        this.storeRedJoker("");
      }
      if (colour === "Black") {
        this.storeBlackJoker("");
      }
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
      this.config.cardTrail.jokers.forEach(joker => {
        console.log(joker, this.redJoker);
        if (joker.colour === "Red") {
          if (joker.street === this.redJoker) {
            total++;
            return;
          }
        }
        if (joker.colour === "Red") {
          if (joker.street === this.blackJoker) {
            total++;
            return;
          }
        }
      });
      console.log("storing total", total);
      this.storeTotalCardsCorrect(total);
    },
    showStreetCounts() {
      this.$buefy.modal.open({
        parent: this,
        component: StreetCounts,
        trapFocus: true,
        props: {
          columns: this.columns,
          streetCounts: this.streetCounts
        }
      });
    }
  }
};
</script>

<style scoped>
.separator {
  border-style: solid;
  border-width: 2px;
  border-color: rgb(160, 160, 160);
  border-radius: 10px;
  margin-left: 1em;
  margin-right: 1em;
  margin-bottom: 1em;
}
</style>
