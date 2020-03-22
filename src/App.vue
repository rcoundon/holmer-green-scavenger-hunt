<template>
  <div id="app" class="splash">
    <div>
      <br/>
      <p class="title has-text-weight-bold is-size-3 has-text-primary">
        {{heading}}
      </p>
      <div v-html="subheading" class="is-size-5 has-text-weight-bold instructions has-text-primary">
      </div>
      <br/>
    </div>
    <p class="instructions has-text-danger has-text-weight-semibold is-size-4">The current government advice on social distancing is detailed <a href="https://www.gov.uk/government/publications/covid-19-guidance-on-social-distancing-and-for-vulnerable-people/guidance-on-social-distancing-for-everyone-in-the-uk-and-protecting-older-people-and-vulnerable-adults" target="_new"><b class="has-text-white is-italic has-text-success">here</b></a></p>
    <br/>
    <main-page/>
    <p class="has-text-white has-text-weight-semibold is-size-4">The current government advice on social distancing is detailed <a href="https://www.gov.uk/government/publications/covid-19-guidance-on-social-distancing-and-for-vulnerable-people/guidance-on-social-distancing-for-everyone-in-the-uk-and-protecting-older-people-and-vulnerable-adults" target="_new"><b class="has-text-white is-italic has-text-success">here</b></a></p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MainPage from "./components/MainPage";
import config from "../data/config";

export default {
  name: "App",
  components: {
    MainPage
  },
  data() {
    return {
      config
    };
  },
  computed: {
    ...mapGetters(["shownFirstPopup"]),
    heading() {
      return this.config.heading;
    },
    subheading() {
      return this.config.subheading;
    }
  },
  methods: {
    ...mapActions(["storeShownFirstPopup"])
  },
  created() {
    if (this.shownFirstPopup) {
      return;
    }
    this.$buefy.dialog.alert({
      title: "Join the hunt!",
      message: `Mel & Ross hope you enjoy playing our little clue trail around Holmer Green.<br><br>
      <b>Before taking part</b> you must familiarise yourself with and observe the current
        government advice on social distancing.
        <br>
        <br>
        The government advice is detailed <a href="https://www.gov.uk/government/publications/covid-19-guidance-on-social-distancing-and-for-vulnerable-people/guidance-on-social-distancing-for-everyone-in-the-uk-and-protecting-older-people-and-vulnerable-adults" target="_new"><b class="has-text-info">here</b></a>`,
      confirmText: "Let's go!",
      hasIcon: true,
      icon: "treasure-chest"
    });
    this.storeShownFirstPopup(true);
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.splash {
  background-image: url("./assets/Hgcommon.jpg");
}

.title {
  border-radius: 10px;
  background: whitesmoke;
  width: 80vw;
  margin: auto;
}

.instructions {
  padding: 0 2em;
  background: whitesmoke;
  width: 80vw;
  margin: auto;
  border-radius: 10px;
}
</style>
