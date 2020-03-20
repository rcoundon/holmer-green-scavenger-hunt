<template>
  <div class="tile" style="min-height: 100vh">
    <div class="tile is-vertical is-parent">
      <div class="tile is-child box question-box" v-for="question in questions" :key="question.id">
        <b-field :label="question.text">
          <b-input placeholder="Enter your answer" v-model="form[question.id]">
          </b-input>
        </b-field>
      </div>
      <b-button class="is-primary" @click="checkAnswers()">Submit Answers</b-button>
    </div>
    {{numberCorrect}}
  </div>
</template>

<script>
import questions from "../../data/questions";

export default {
  data() {
    return {
      questions,
      form: {},
      numberCorrect: 0
    };
  },
  methods: {
    checkAnswers() {
      this.numberCorrect = 0;
      this.questions.forEach(question => {
        let thisAnswer = this.form[question.id];
        if (thisAnswer) {
          if (thisAnswer.toLowerCase() == question.answer.toLowerCase()) {
            this.numberCorrect++;
          }
        }
      });
    }
  }
};
</script>

<style>
.question-box {
  opacity: 1;
  text-align: left;
}
</style>
