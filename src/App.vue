<template>
  <div id="app" class="splash">
    <div>
      <br/>
      <p class="title has-text-weight-bold is-size-3 has-text-primary">
        Welcome to the Holmer Green coronavirus distraction scavenger hunt
      </p>
      <p class="is-size-4 has-text-weight-bold instructions has-text-primary">
        Below is a list of questions that will take you on a little tour of our lovely village.
        <br/>
        All the answers consist of one or two words, or a number (enter 4 not four)
        <br/>
        To save your answers and check how many you have right, just tap a Check Answers button.  Have fun!
      </p>
    </div>
    <main-page/>
  </div>
</template>

<script>
import MainPage from "./components/MainPage";

export default {
  name: "App",
  components: {
    MainPage
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
