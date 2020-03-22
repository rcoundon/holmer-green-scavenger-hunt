export const state = {
  answers: {},
  shownFirstPopup: false,
  elapsedTime: 0,
  startTime: undefined,
  pauseTime: undefined
};

export const mutations = {
  STORE_ANSWERS(state, payload) {
    state.answers = payload;
  },
  STORE_SHOWN_FIRST_POPUP(state, payload) {
    state.shownFirstPopup = payload;
  },
  STORE_ELAPSED_TIME(state, payload) {
    console.log('setting time to ', payload);
    state.elapsedTime = payload;
  },
  STORE_START_TIME(state, payload) {
    state.startTime = payload;
  },
  STORE_PAUSE_TIME(state, payload) {
    state.pauseTime = payload;
  }
};

export const actions = {
  storeAnswers({ commit }, payload) {
    Object.assign(state.answers, payload);
    commit('STORE_ANSWERS', payload);
  },
  storeShownFirstPopup({ commit }, payload) {
    commit('STORE_SHOWN_FIRST_POPUP', payload);
  },
  storeElapsedTime({ commit }, payload) {
    commit('STORE_ELAPSED_TIME', payload);
  },
  storeStartTime({ commit }, payload) {
    commit('STORE_START_TIME', payload);
  },
  storePauseTime({ commit }, payload) {
    commit('STORE_PAUSE_TIME', payload);
  }
};

export const getters = {
  answers: state => state.answers,
  shownFirstPopup: state => state.shownFirstPopup,
  elapsedTime: state => state.elapsedTime,
  startTime: state => state.startTime,
  pauseTime: state => state.pauseTime
};
