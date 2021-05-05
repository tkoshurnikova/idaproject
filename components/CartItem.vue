<template>
  <div :class="$style.card">
    <img
      :class="$style.photo"
      :src="'https://frontend-test.idaproject.com' + card.photo"
      height="95"
      width="95"
      :alt="card.name"
    >
    <div :class="$style.infoWrapper">
      <p :class="$style.name">
        {{ card.name | capitalize }}
      </p>
      <p :class="$style.price">
        {{ card.price | formatPrice }} ₽
      </p>
      <span :class="$style.rating">
        <svg-icon name="icon-star" width="14" height="14" />
        <svg-icon name="icon-star-full" width="14" height="14" :style="`clip: rect(${14 - (card.rating / 5 * 14)}px auto auto auto);`" />
        {{ card.rating }}
      </span>
    </div>
    <button type="button" :class="$style.delete" @click="removeCard()">
      <svg-icon name="icon-trash" width="20" height="22" />
    </button>
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
    })
  },

  methods: {
    removeCard () {
      const cardIndex = this.productsInCart.indexOf(this.card)
      this.$store.dispatch('cart/removeCardToCart', cardIndex)
    }
  }
}
</script>

<style module lang="scss">
  .card {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 364px;
    padding: 15px;
    padding-right: 30px;
    margin-top: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;

    @include viewport--sm {
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .infoWrapper {
    align-self: stretch;
    display: flex;
    flex-direction: column;
  }

  .rating {
    position: relative;
    display: flex;
    padding-left: 18px;
    margin-top: auto;
    align-items: center;
    font-size: 10px;
    color: $yellow;

    svg {
      position: absolute;
      bottom: 0;
      left: 0;
    }

    @include viewport--sm {
      margin-top: 10px;
    }
  }

  .delete {
    width: 20px;
    height: 22px;
    margin-left: auto;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;

    svg {
      color: $grey-light;
      transition: all 0.3s ease;
    }

    &:hover svg,
    &:focus svg {
      color: $black;
    }
  }

  .photo {
    width: 95px;
    height: auto;
    margin-right: 20px;

    @include viewport--sm {
      margin-right: 0;
    }
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
