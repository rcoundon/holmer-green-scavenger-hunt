<template>
  <div id="app" class="splash">
    <div>
      <br/>
      <p class="title has-text-weight-bold is-size-3 has-text-primary">
        {{heading}}
      </p>
      <div v-html="subheading" class="is-size-4 has-text-weight-bold instructions has-text-primary">
      </div>
    </div>
    <main-page/>
  </div>
</template>

<script>
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
    heading() {
      return this.config.heading;
    },
    subheading() {
      return this.config.subheading;
    }
  },
  created() {
    this.$buefy.dialog.alert({
      title: "Join the hunt!",
      message:
        "Mel & Ross hope you enjoy playing our little scavenger hunt around Holmer Green",
      confirmText: "Let's do this!",
      hasIcon: true,
      icon: "treasure-chest"
    });
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
  border-radius: 5px;
  background: whitesmoke;
}

.instructions {
  padding: 0 2em;
  background: white;
}
</style>
