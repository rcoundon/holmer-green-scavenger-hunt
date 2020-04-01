<template>
  <div >
    <b-field position="is-centered">
    </b-field>
    <p class="has-text-weight-semibold" :style="jokerColour">
    {{colour}} Joker
    </p>
    <b-field position="is-centered">
      <b-select placeholder="Select a street" v-model="localStreet">
        <option
          v-for="street in streets"
          :value="street"
          :key="street">
          {{ street }}
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
  name: "joker",
  props: {
    colour: {
      type: String,
      required: false
    },
    street: {
      type: String,
      required: false
    },
    streets: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      localStreet: undefined
    };
  },
  computed: {
    jokerColour() {
      if (this.colour === "Red") return "color: red;";
      if (this.colour === "Black") return "color: black;";
      return "";
    },
    disableSave() {
      return !this.localStreet;
    }
  },
  methods: {
    saveCard() {
      const card = {
        colour: this.colour,
        street: this.localStreet
      };
      console.log("saveCard", card);
      this.$emit("saveJoker", card);
    },
    deleteCard() {
      this.localStreet = "";
      this.$emit("deleteJoker", this.colour);
    }
  },
  created() {
    this.localStreet = this.street;
  }
};
</script>

<style scoped>
</style>
