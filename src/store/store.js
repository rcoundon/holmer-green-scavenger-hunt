export const state = {
  answers: {},
  shownFirstPopup: false
};

export const mutations = {
  STORE_ANSWERS(state, payload) {
    state.answers = payload;
  },
  STORE_SHOWN_FIRST_POPUP(state, payload) {
    state.shownFirstPopup = payload;
  }
};

export const actions = {
  storeAnswers({ commit }, payload) {
    Object.assign(state.answers, payload);
    commit('STORE_ANSWERS', payload);
  },
  storeShownFirstPopup({ commit }, payload) {
    commit('STORE_SHOWN_FIRST_POPUP', payload);
  }
};

export const getters = {
  answers: state => state.answers,
  shownFirstPopup: state => state.shownFirstPopup
};
