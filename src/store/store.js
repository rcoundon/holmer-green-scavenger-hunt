export const state = {
  questions: [],
  answers: {}
};

export const mutations = {
  STORE_ANSWERS(state, payload) {
    state.answers = payload;
  }
};

export const actions = {
  storeAnswers({ commit }, payload) {
    console.log(payload);
    Object.assign(state.answers, payload);
    commit('STORE_ANSWERS', payload);
  }
};

export const getters = {
  answers: state => state.answers
};
