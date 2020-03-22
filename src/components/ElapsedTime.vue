<template>
  <div>
    <p class="has-text-weight-semibold is-size-5">
    Time taken: {{ formattedTime }}
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { differenceInSeconds } from "date-fns";

export default {
  name: "elapsedTime",
  data() {
    return {
      timer: undefined
    };
  },
  props: {
    start: {
      type: Boolean
    }
  },
  watch: {
    start: {
      immediate: true,
      handler: function(newVal, oldVal) {
        if (oldVal === true && newVal === false) {
          // pausing
          console.log("pausing");
          const now = new Date();
          this.storePauseTime(now.valueOf());
          clearInterval(this.timer);
        }
        if (oldVal === false && newVal === true) {
          // eslint-disable-next-line no-debugger
          debugger;
          console.log("unpausing");
          if (!this.startTime) {
            this.storeStartTime(new Date().valueOf());
          }
          if (this.pauseTime) {
            const diff = this.pauseTime - this.startTime;
            this.storeElapsedTime((this.elapsedTime - diff) / 1000);
          }
          this.storePauseTime(null);
          const timer = setInterval(() => {
            console.log("firing after unpause");
            this.getElapsedTime();
          }, 1000);
          this.timer = timer;
        } else if (newVal === true) {
          console.log("no existing timer");
          const timer = setInterval(() => {
            console.log("firing");
            this.getElapsedTime();
          }, 1000);
          this.timer = timer;
        }
      }
    }
  },
  computed: {
    ...mapGetters(["elapsedTime", "startTime", "pauseTime"]),
    formattedTime() {
      const dateObj = new Date(this.elapsedTime * 1000);
      const hours = dateObj.getUTCHours();
      const minutes = dateObj.getUTCMinutes();
      const seconds = dateObj.getSeconds();

      const timeString =
        hours.toString().padStart(2, "0") +
        ":" +
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0");
      return timeString;
    }
  },
  created() {
    if (!this.startTime) {
      this.storeStartTime(new Date().valueOf());
      this.storeElapsedTime(0);
    }
  },
  methods: {
    ...mapActions(["storeElapsedTime", "storeStartTime", "storePauseTime"]),
    getElapsedTime() {
      const date = new Date();
      const elapsedTimeSeconds = differenceInSeconds(
        date,
        new Date(this.startTime)
      );
      this.storeElapsedTime(elapsedTimeSeconds);
    }
  }
  // beforeDestroy(){
  //   clearInterval(this.timer);
  // }
};
</script>

<style>
</style>
