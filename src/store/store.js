export const state = {
  questions: [],
  answers: []
};

export const mutations = {
  SET_SELECTED_RESOURCE(state, payload) {
    state.selectedResource = payload;
  }
};

export const actions = {
  setSelectedResource({ commit }, payload) {
    commit('SET_SELECTED_RESOURCE', payload);
  }
};

export const getters = {
  selectedResource: state => state.selectedResource
};
