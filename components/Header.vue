<template>
  <header>
    <div :class="$style.container">
      <p>TestList</p>
      <button type="button" :class="$style.cartButton" aria-label="Корзина" @click="toggleCart()">
        <svg-icon name="icon-cart" width="24" height="26.4" />
        <span v-show="counter" :class="$style.counter">{{ counter }}</span>
      </button>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      isCartOpen: state => state.cart.isCartOpen,
      counter: state => state.cart.productsInCart.length
    })
  },

  methods: {
    toggleCart () {
      this.$store.dispatch('cart/toggleCart', !this.isCartOpen)
    }
  }
}
</script>

<style module lang="scss">
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 66px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 0 0 8px 8px;

    @include viewport--md {
      position: relative;
      z-index: 3;
    }
  }

  .container {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1440px;
    padding: 0 5vw 0 6vw;
    align-items: center;
    text-align: center;
  }

  p {
    font-weight: 700;
    font-size: 22px;
    color: $grey;
  }

  button {
    border: none;
    outline: none;
    background: transparent;
    color: $black;
    cursor: pointer;
  }

  .cartButton {
    position: relative;
    width: 24px;
    height: 26.3px;
    margin-right: 25px;
    transition: all 0.3s ease;

    svg {
      transition: all 0.3s ease;
    }

    &:hover,
    &:focus {
      svg {
        color: $grey;
      }
    }

    &:active {
      opacity: 0.75;
    }
  }

  .counter {
    position: absolute;
    top: -3px;
    right: -12px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: $grey-light;
    font-size: 8px;
    font-weight: 700;
    color: $white;
  }
</style>
