import Vue from 'vue';

export const state = {
  answers: {},
  shownFirstPopup: false,
  cards: [],
  blackJoker: '',
  redJoker: '',
  cardId: 0,
  totalCardsCorrect: 0,
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
          saved: true,
        };
        Vue.set(state.cards, i, newCard);
        found = true;
        break;
      }
    }
    if (!found) {
      let card = {
        ...payload,
        saved: false,
      };
      state.cards.push(card);
    }
  },
  DELETE_CARD(state, cardId) {
    const cardsWithThisOneRemoved = state.cards.filter((card) => {
      return card.id !== cardId;
    });
    state.cards = cardsWithThisOneRemoved;
  },
  INCREMENT_ID(state) {
    state.cardId++;
  },
  STORE_CARDS_CORRECT_TOTAL(state, total) {
    state.totalCardsCorrect = total;
  },
  STORE_RED_JOKER(state, payload) {
    console.log('persisting red', payload);
    state.redJoker = payload;
  },
  STORE_BLACK_JOKER(state, payload) {
    console.log('persisting black', payload);
    state.blackJoker = payload;
  },
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
  deleteCard({ commit }, payload) {
    commit('DELETE_CARD', payload);
  },
  getCardId({ commit, state }) {
    commit('INCREMENT_ID');
    return state.cardId;
  },
  storeTotalCardsCorrect({ commit }, total) {
    commit('STORE_CARDS_CORRECT_TOTAL', total);
  },
  storeRedJoker({ commit }, payload) {
    console.log('store received', payload);
    commit('STORE_RED_JOKER', payload);
  },
  storeBlackJoker({ commit }, payload) {
    console.log('store received', payload);
    commit('STORE_BLACK_JOKER', payload);
  },
};

export const getters = {
  answers: (state) => state.answers,
  shownFirstPopup: (state) => state.shownFirstPopup,
  cards: (state) => state.cards,
  cardId: (state) => state.cardId,
  totalCards: (state) => {
    let total = 0;
    const savedCards = state.cards.filter((card) => {
      return card.saved;
    });
    total = savedCards.length;
    if (state.redJoker) total++;
    if (state.blackJoker) total++;
    return total;
  },
  totalCardsCorrect: (state) => state.totalCardsCorrect,
  redJoker: (state) => state.redJoker,
  blackJoker: (state) => state.blackJoker,
};
