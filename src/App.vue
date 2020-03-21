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
    <main-page/>
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
      message:
        "Mel & Ross hope you enjoy playing our little clue trail around Holmer Green",
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
