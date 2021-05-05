export const state = () => ({
  categories: []
})

export const mutations = {
  setCategories (state, categories) {
    state.categories = categories
  }
}

export const actions = {
  async fetchCategories ({ commit }) {
    const categories = await this.$axios.$get('https://frontend-test.idaproject.com/api/product-category')
    commit('setCategories', categories)
  }
}

export const getters = {
  categories: s => s.categories
}
