export const state = () => ({
  cards: [],
  categoryCards: []
})

export const mutations = {
  setCards (state, cards) {
    state.cards = cards
  },
  setCategoryCards (state, cards) {
    state.categoryCards = cards
  }
}

export const actions = {
  async fetchCards ({ commit }) {
    const cards = await this.$axios.$get('https://frontend-test.idaproject.com/api/product')
    commit('setCards', cards)
  },
  async fetchCategoryCards ({ commit }, id) {
    const cards = await this.$axios.$get(`https://frontend-test.idaproject.com/api/product?category=${id}`)
    commit('setCategoryCards', cards)
  }
}

export const getters = {
  cards: s => s.cards
}
