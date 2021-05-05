export const state = () => ({
  isCartOpen: false,
  productsInCart: [],
  isFormValid: false
})

export const mutations = {
  setCartState (state, isOpen) {
    state.isCartOpen = isOpen
  },

  addCardToCart (state, card) {
    state.productsInCart.push(card)
  },

  removeCardFromCart (state, index) {
    state.productsInCart = [].concat(state.productsInCart.slice(0, index), state.productsInCart.slice(index + 1))
  },

  resetCart (state) {
    state.productsInCart = []
  },

  setFormState (state, isValid) {
    state.isFormValid = isValid
  }
}

export const actions = {
  toggleCart ({ commit }, status) {
    commit('setCartState', status)
  },

  addCardToCart ({ commit }, card) {
    commit('addCardToCart', card)
  },

  removeCardToCart ({ commit }, card) {
    commit('removeCardFromCart', card)
  },

  resetCart ({ commit }) {
    commit('resetCart')
  },

  setFormState ({ commit }, status) {
    commit('setFormState', status)
  }
}
