<template>
  <div id="app" class="splash">
    <div class="">
      <p class="title has-text-weight-semibold is-size-3 has-text-primary">Welcome to the Holmer Green COVID-19 scavenger hunt</p>
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
