<template>
  <div class="playing-card">
    <b-field position="is-centered">
      <b-select v-model="localValue" placeholder="Select a value">
        <option v-for="optValue in values" :key="optValue" :value="value">
          {{ optValue }}
        </option>
      </b-select>
      <b-select v-model="localSuit" placeholder="Select a suit">
        <option v-for="theSuit in suits" :key="theSuit" :value="suit">
          {{ theSuit }}
        </option>
      </b-select>
      <b-field>
        <b-button :disabled="disableSave" type="is-primary" @click="saveCard">Save</b-button>
      </b-field>
    </b-field>
    <b-field position="is-centered">
      <b-select v-model="localStreet" placeholder="Select a street">
        <option v-for="theStreet in streets" :key="theStreet" :value="street">
          {{ theStreet }}
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
      required: false,
      default: '',
    },
    suit: {
      type: String,
      required: false,
      default: '',
    },
    street: {
      type: String,
      required: false,
      default: '',
    },
    id: {
      type: Number,
      required: true,
    },
    streets: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      values: ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'],
      suits: ['Hearts', 'Diamonds', 'Spades', 'Clubs'],
      localSuit: undefined,
      localValue: undefined,
      localStreet: undefined,
    };
  },
  computed: {
    disableSave() {
      return !(this.localSuit && this.localValue && this.localStreet);
    },
    isPictureCard() {
      if (!this.localValue) return null;
      const pictureCards = ['Jack', 'Queen', 'King'];
      return pictureCards.includes(this.localValue);
    },
  },
  created() {
    this.localValue = this.value;
    this.localSuit = this.suit;
    this.localStreet = this.street;
  },
  methods: {
    saveCard() {
      const card = {
        suit: this.localSuit,
        value: this.localValue,
        street: this.localStreet,
        id: this.id,
      };
      this.$emit('save-card', card);
    },
    deleteCard() {
      this.$emit('delete-card', this.id);
    },
  },
};
</script>

<style scoped>
.playing-card {
  margin-bottom: 2em;
}
</style>
