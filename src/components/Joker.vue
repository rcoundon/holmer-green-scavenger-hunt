<template>
  <div>
    <b-field position="is-centered"> </b-field>
    <p class="has-text-weight-semibold" :style="jokerColour">{{ colour }} Joker</p>
    <b-field position="is-centered">
      <b-select v-model="localStreet" placeholder="Select a street">
        <option v-for="theStreet in streets" :key="theStreet" :value="street">
          {{ theStreet }}
        </option>
      </b-select>
      <b-field grouped>
        <b-field>
          <b-button :disabled="disableSave" type="is-primary" @click="saveCard">Save</b-button>
        </b-field>
        <b-field>
          <b-button type="is-danger" @click="deleteCard">Delete</b-button>
        </b-field>
      </b-field>
    </b-field>
  </div>
</template>

<script>
export default {
  name: 'Joker',
  props: {
    colour: {
      type: String,
      required: false,
      default: '',
    },
    street: {
      type: String,
      required: false,
      default: '',
    },
    streets: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localStreet: undefined,
    };
  },
  computed: {
    jokerColour() {
      if (this.colour === 'Red') return 'color: red;';
      if (this.colour === 'Black') return 'color: black;';
      return '';
    },
    disableSave() {
      return !this.localStreet;
    },
  },
  created() {
    this.localStreet = this.street;
  },
  methods: {
    saveCard() {
      const card = {
        colour: this.colour,
        street: this.localStreet,
      };
      console.log('saveCard', card);
      this.$emit('save-joker', card);
    },
    deleteCard() {
      this.localStreet = '';
      this.$emit('delete-joker', this.colour);
    },
  },
};
</script>

<style scoped></style>
