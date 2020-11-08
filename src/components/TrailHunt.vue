<template>
  <div>
    <count id="top-answers" :all-right="allRight" :total-questions="totalQuestions" :number-correct="numberCorrect"></count>
    <div class="tile" style="min-height: 100vh">
      <div class="tile is-vertical is-parent">
        <div v-for="question in questions" :key="question.id" class="tile is-child box question-box">
          <div style="text-align: center">
            <img v-if="question.image" :src="getImageUrl(question)" class="clue-image" style="margin: auto; max-height: 15rem" />
          </div>
          <p class="has-text-weight-semibold">{{ question.id }}: {{ question.text }}</p>
          <b-field>
            <b-input v-model="form[question.id]" placeholder="Enter your answer" />
          </b-field>
          <b-button icon-left="check-circle" type="is-success" @click="checkAnswers(false)">Check answers</b-button>
        </div>
        <div class="grouped buttons tile" style="margin: auto">
          <b-button icon-left="exclamation-triangle" class="is-danger" @click="clearAnswers()">Clear all answers</b-button>
        </div>
        <count :all-right="allRight" :total-questions="totalQuestions" :number-correct="numberCorrect"></count>
      </div>
    </div>
    <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
      <div class="card">
        <div style="display: flex">
          <!-- <figure class=""> -->
          <img :src="successImage" alt="Yoda" style="width: 70em" />
          <!-- </figure> -->
          <div class="card-content">
            <div class="content is-size-4">
              {{ successMessage }}
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import config from '../../data/config';
import { mapGetters } from 'vuex';
import Count from './Count';

export default {
  components: {
    Count,
  },
  data: () => {
    return {
      config,
      form: {},
      numberCorrect: 0,
      isCardModalActive: false,
    };
  },
  computed: {
    ...mapGetters(['answers']),
    questions() {
      return this.config.clueHunt.clues;
    },
    totalQuestions() {
      return this.questions.length;
    },
    successMessage() {
      return this.config.clueHunt.success;
    },
    allRight() {
      return this.numberCorrect === this.totalQuestions;
    },
    successImage() {
      return require('../assets/yoda.png');
    },
  },
  created() {
    this.retrieveAnswersFromStore();
    this.checkAnswers(true);
  },
  methods: {
    clearAnswers() {
      this.$buefy.dialog.confirm({
        title: 'Delete Answers!',
        message: `This will delete all your answers, are you sure?`,
        cancelText: 'Cancel',
        confirmText: 'Delete',
        type: 'is-danger',
        onConfirm: () => {
          this.$store.dispatch('storeAnswers', {});
          this.form = {};
        },
      });
    },
    getImageUrl(question) {
      const photo = require(`../assets/${question.image}`);
      return photo;
    },
    checkAnswers(initialLoad = false) {
      this.$store.dispatch('storeAnswers', this.form);
      this.numberCorrect = 0;
      this.questions.forEach((question) => {
        let thisAnswer = this.form[question.id];
        if (thisAnswer) {
          if (thisAnswer.trim().toLowerCase() == question.answer.toLowerCase()) {
            this.numberCorrect++;
          }
        }
      });
      if (!initialLoad) {
        this.$scrollTo('#top-answers', 1000);
      }
      if (this.allRight) {
        this.isCardModalActive = true;
      }
    },
    retrieveAnswersFromStore() {
      Object.assign(this.form, this.answers);
      this.$forceUpdate();
    },
  },
};
</script>

<style>
.question-box {
  opacity: 1;
  text-align: left;
}

.clue-image {
  -webkit-box-shadow: 9px 10px 18px -4px rgba(194, 190, 194, 1);
  -moz-box-shadow: 9px 10px 18px -4px rgba(194, 190, 194, 1);
  box-shadow: 9px 10px 18px -4px rgba(194, 190, 194, 1);
}
</style>
