<template>
<div>
    <p id="top-answers" class="is-size-3 has-text-weight-semibold count" :class="successClass">
      {{numberCorrect}} out of {{totalQuestions}}
    </p>
  <div class="tile" style="min-height: 100vh">
    <div class="tile is-vertical is-parent">
      <div class="tile is-child box question-box" v-for="question in questions" :key="question.id">
        <img v-if="question.image" :src="getImageUrl(question)"/>
        <span class="has-text-weight-semibold">{{ question.id}}: {{question.text }}</span>
        <b-field>
          <b-input placeholder="Enter your answer" v-model="form[question.id]"/>
        </b-field>
          <b-button @click="checkAnswers(false)" type="is-success">Check Answers</b-button>
      </div>
      <div class="grouped buttons tile" style="margin: auto;">
        <b-button icon-left="check-circle" class="is-primary" @click="checkAnswers(false)">Check your answers</b-button>
        <b-button icon-left="exclamation-triangle" class="is-danger" @click="clearAnswers()">Clear all answers</b-button>
      </div>
    <p class="is-size-2 has-text-weight-semibold count" :class="successClass">
      {{numberCorrect}} out of {{totalQuestions}}
    </p>
    </div>
  </div>
  <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
            <div class="card" style="text-align: center">
                <div style="display: flex">
                    <!-- <figure class=""> -->
                        <img :src="successImage" alt="Yoda">
                    <!-- </figure> -->
                    <div class="card-content">
                        <div class="content is-size-4">
                            Impressive, your knowledge of Holmer Green is. This community is better for having you in it.
                        </div>
                    </div>
                </div>
            </div>
        </b-modal>
</div>
</template>

<script>
import questions from "../../data/questions";
import { mapGetters } from "vuex";

export default {
  data: () => {
    return {
      questions,
      form: {},
      numberCorrect: 0,
      isCardModalActive: false
    };
  },
  watch: {
    allRight: {
      handler: function(newVal) {
        if (newVal) {
          // this.$buefy.dialog.alert({
          //   title: "Congratulations!",
          //   message:
          //     "Your knowledge of Holmer Green is impressive, you're a credit to society",
          //   confirmText: "Close",
          //   hasIcon: true,
          //   icon: "treasure-chest"
          // });
        }
      }
    }
  },
  computed: {
    ...mapGetters(["answers"]),
    totalQuestions() {
      return questions.length;
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
  padding: 3rem;
  margin-top: 2rem;
  background-color: white;
  border-radius: 2%;
  align-content: center;
  justify-items: center;
}

.count-success {
  color: green;
}

.count-failure {
  color: red;
}
</style>
