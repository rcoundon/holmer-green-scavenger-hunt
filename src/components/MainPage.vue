<template>
<div>
  <div class="is-size-2 has-text-weight-semibold count" :class="successClass">
    {{numberCorrect}} out of {{totalQuestions}}
  </div>
  <div class="tile" style="min-height: 100vh">
    <div class="tile is-vertical is-parent">
      <div class="tile is-child box question-box" v-for="question in questions" :key="question.id">
        <img v-if="question.image" :src="getImageUrl(question)" style="max-height: 15rem"/>
        <p class="has-text-weight-semibold">{{ question.id}}: {{question.text }}</p>
        <b-field>
          <b-input placeholder="Enter your answer" v-model="form[question.id]"/>
        </b-field>
          <b-button icon-left="check-circle" @click="checkAnswers(false)" type="is-success">Check answers</b-button>
      </div>
      <div class="grouped buttons tile" style="margin: auto;">
        <b-button icon-left="exclamation-triangle" class="is-danger" @click="clearAnswers()">Clear all answers</b-button>
      </div>
      <div class="is-size-2 has-text-weight-semibold count" :class="successClass">
        {{numberCorrect}} out of {{totalQuestions}}
      </div>
    </div>
  </div>
  <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
    <div class="card">
      <div style="display: flex">
        <!-- <figure class=""> -->
        <img :src="successImage" alt="Yoda" style="width:70em">
        <!-- </figure> -->
        <div class="card-content">
          <div class="content is-size-4">
            {{successMessage}}
          </div>
        </div>
      </div>
    </div>
  </b-modal>
</div>
</template>

<script>
import config from "../../data/config";
import { mapGetters } from "vuex";

export default {
  data: () => {
    return {
      config,
      form: {},
      numberCorrect: 0,
      isCardModalActive: false
    };
  },
  computed: {
    ...mapGetters(["answers"]),
    questions() {
      return this.config.clues;
    },
    totalQuestions() {
      return this.questions.length;
    },
    successMessage() {
      return this.config.success;
    },
    successClass() {
      return !this.allRight ? "count-failure" : "count-success";
    },
    allRight() {
      return this.numberCorrect === this.totalQuestions;
    },
    successImage() {
      return require("../assets/yoda.png");
    }
  },
  methods: {
    clearAnswers() {
      this.$buefy.dialog.confirm({
        title: "Delete Answers!",
        message: `This will delete all your answers, are you sure?`,
        cancelText: "Cancel",
        confirmText: "Delete",
        type: "is-danger",
        onConfirm: () => {
          this.$store.dispatch("storeAnswers", {});
          this.form = {};
        }
      });
    },
    getImageUrl(question) {
      const photo = require(`../assets/${question.image}`);
      return photo;
    },
    checkAnswers(initialLoad = false) {
      this.$store.dispatch("storeAnswers", this.form);
      this.numberCorrect = 0;
      this.questions.forEach(question => {
        let thisAnswer = this.form[question.id];
        if (thisAnswer) {
          if (
            thisAnswer.trim().toLowerCase() == question.answer.toLowerCase()
          ) {
            this.numberCorrect++;
          }
        }
      });
      if (!initialLoad) {
        this.$scrollTo("#top-answers", 1000);
      }
      if (this.allRight) {
        this.isCardModalActive = true;
      }
    },
    retrieveAnswersFromStore() {
      Object.assign(this.form, this.answers);
      this.$forceUpdate();
    }
  },
  created() {
    this.retrieveAnswersFromStore();
    this.checkAnswers(true);
  }
};
</script>

<style>
.question-box {
  opacity: 1;
  text-align: left;
}

.count {
  margin: auto;
  background-color: white;
  border-radius: 10px;
  align-content: center;
  justify-items: center;
  width: 20rem;
}

.count-success {
  color: green;
}

.count-failure {
  color: red;
}
</style>
