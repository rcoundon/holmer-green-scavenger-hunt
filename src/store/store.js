import Vue from 'vue';

export const state = {
  answers: {},
  shownFirstPopup: false,
  cards: [],
  cardId: 0
};

export const mutations = {
  STORE_ANSWERS(state, payload) {
    state.answers = payload;
  },
  STORE_SHOWN_FIRST_POPUP(state, payload) {
    state.shownFirstPopup = payload;
  },
  STORE_CARD(state, payload) {
    let found = false;
    for (let i = 0; i < state.cards.length; i++) {
      if (state.cards[i].id === payload.id) {
        const newCard = {
          ...payload,
          saved: true
        };
        Vue.set(state.cards, i, newCard);
        found = true;
        break;
      }
    }
    if (!found) {
      let card = {
        ...payload,
        saved: false
      };
      state.cards.push(card);
    }
  },
  INCREMENT_ID(state) {
    state.cardId++;
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
  storeCard({ commit }, payload) {
    commit('STORE_CARD', payload);
  },
  getCardId({ commit, state }) {
    commit('INCREMENT_ID');
    return state.cardId;
  }
};

export const getters = {
  answers: state => state.answers,
  shownFirstPopup: state => state.shownFirstPopup,
  cards: state => state.cards,
  cardId: state => state.cardId,
  totalCards: state => {
    const savedCards = state.cards.filter(card => {
      return card.saved;
    });
    return savedCards.length;
  }
};
