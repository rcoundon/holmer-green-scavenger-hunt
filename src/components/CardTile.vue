<template>
  <div class="playing-card">
    <b-field position="is-centered">
      <b-select placeholder="Select a value" v-model="localValue">
        <option
          v-for="value in values"
          :value="value"
          :key="value">
          {{ value}}
        </option>
      </b-select>
      <b-select placeholder="Select a suit" v-model="localSuit">
        <option
          v-for="suit in suits"
          :value="suit"
          :key="suit">
          {{ suit }}
        </option>
      </b-select>
      <b-field>
        <b-button :disabled="disableSave" type="is-primary" @click="saveCard">Save</b-button>
      </b-field>
    </b-field>
    <b-field position="is-centered">
      <b-select placeholder="Select a street" v-model="localStreet">
        <option
          v-for="street in streets"
          :value="street"
          :key="street">
          {{ street }}
        </option>
      </b-select>
      <b-field>
        <b-field>
          <b-button type="is-danger" @click="deleteCard">Delete</b-button>
        </b-field>
      </b-field>
    </b-field>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false
    },
    suit: {
      type: String,
      required: false
    },
    street: {
      type: String,
      required: false
    },
    id: {
      type: Number,
      required: true
    },
    streets: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      values: [
        "Ace",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "Jack",
        "Queen",
        "King"
      ],
      suits: ["Hearts", "Diamonds", "Spades", "Clubs"],
      localSuit: undefined,
      localValue: undefined,
      localStreet: undefined
    };
  },
  created() {
    this.localValue = this.value;
    this.localSuit = this.suit;
    this.localStreet = this.street;
  },
  computed: {
    disableSave() {
      return !(this.localSuit && this.localValue && this.localStreet);
    },
    isPictureCard() {
      if (!this.localValue) return null;
      const pictureCards = ["Jack", "Queen", "King"];
      return pictureCards.includes(this.localValue);
    }
  },
  methods: {
    saveCard() {
      const card = {
        suit: this.localSuit,
        value: this.localValue,
        street: this.localStreet,
        id: this.id
      };
      this.$emit("saveCard", card);
    },
    deleteCard() {
      this.$emit("deleteCard", this.id);
    }
  }
};
</script>

<style scoped>
.playing-card {
  margin-bottom: 2em;
}
</style>
