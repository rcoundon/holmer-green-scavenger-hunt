<template>
  <div class="is-size-2 has-text-weight-semibold count" :class="successClass">
    {{ numberCorrect }} correct out of {{ totalQuestions }}
    <b-icon v-if="!allRight" icon="sad-tear" />
    <b-icon v-else icon="smile-beam" />
  </div>
</template>
<script>
export default {
  props: {
    numberCorrect: {
      type: Number,
      default: -1,
    },
    totalQuestions: {
      type: Number,
      default: -1,
    },
    allRight: {
      type: Boolean,
    },
  },
  computed: {
    successClass() {
      return !this.allRight ? 'count-failure' : 'count-success';
    },
  },
};
</script>

<style scoped>
.count {
  margin: auto;
  background-color: white;
  border-radius: 10px;
  align-content: center;
  justify-items: center;
  width: 26rem;
}
.count-success {
  color: green;
}

.count-failure {
  color: red;
}
</style>
