<template>
  <div :class="$style.card">
    <span :class="$style.rating">
      <svg-icon name="icon-star" width="14" height="14" />
      <svg-icon name="icon-star-full" width="14" height="14" :style="`clip: rect(${14 - (card.rating / 5 * 14)}px auto auto auto);`" />
      {{ card.rating }}
    </span>
    <button
      type="button"
      :class="isInCart ? [$style.cart, $style.active] : $style.cart"
      :aria-label="isInCart ? 'Удалить из корзины' : 'Добавить в корзину'"
      @click="toggleCard()"
    >
      <svg-icon name="icon-cart" width="12" height="13" />
    </button>
    <img
      :class="$style.photo"
      :src="'https://frontend-test.idaproject.com' + card.photo"
      height="656"
      width="656"
      :alt="card.name"
    >
    <p :class="$style.name">
      {{ card.name | capitalize }}
    </p>
    <p :class="$style.price">
      {{ card.price | formatPrice }} ₽
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  filters: {
    capitalize (value) {
      if (!value) {
        return ''
      }
      value = value.toString().toLowerCase()
      return value.split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ')
    },

    formatPrice (value) {
      if (!value) {
        return ''
      }
      return value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
    }
  },

  props: {
    card: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapState({
      productsInCart: state => state.cart.productsInCart
    }),

    isInCart () {
      const cardIndex = this.productsInCart.indexOf(this.card)
      return (cardIndex >= 0)
    }
  },

  methods: {
    toggleCard () {
      const cardIndex = this.productsInCart.indexOf(this.card)
      if (cardIndex < 0) {
        this.$store.dispatch('cart/addCardToCart', this.card)
      } else {
        this.$store.dispatch('cart/removeCardToCart', cardIndex)
      }
    }
  }
}
</script>

<style module lang="scss">
  .card {
    position: relative;
    width: calc(25% - 16px);
    padding: 16px;
    margin-top: 16px;
    margin-right: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;

    @include viewport--xl {
      width: calc(33% - 16px);
    }

    @include viewport--lg {
      width: calc(50% - 16px);
    }

    @include viewport--sm {
      width: 100%;
      margin-right: 0;
    }
  }

  .rating {
    position: absolute;
    top: 22px;
    left: 21px;
    display: flex;
    padding-left: 18px;
    align-items: center;
    font-size: 10px;
    color: $yellow;

    svg {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }

  .cart {
    position: absolute;
    top: 17px;
    right: 23px;
    width: 12px;
    height: 13px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;

    svg {
      color: $grey-light;
      transition: all 0.3s ease;
    }

    &:hover,
    &:focus {
      svg {
        color: $black;
      }
    }

    &:active {
      opacity: 0.75;
    }
  }

  .cart.active {
    svg {
      color: $black;
    }

    &:hover,
    &:focus {
      svg {
        color: $grey-light;
      }
    }
  }

  .photo {
    width: 84%;
    height: auto;
  }

  .name {
    text-align: left;
    font-size: 14px;
    font-weight: 400;
    color: $grey;
  }

  .price {
    margin-top: 5px;
    text-align: left;
    font-size: 14px;
    font-weight: 700;
    color: $black;
  }
</style>
