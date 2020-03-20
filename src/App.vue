<template>
  <div id="app" class="splash">
    <div>
      <p class="title has-text-weight-semibold is-size-3 has-text-primary">
        Welcome to the Holmer Green coronavirus distraction scavenger hunt
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
</style>
