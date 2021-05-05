<template>
  <div :class="isCartOpen ? '' : $style.cartClosed">
    <div :class="$style.overlay" @click="closeCart()" />
    <Trap :disabled="!isCartOpen">
      <div :class="$style.cart" @keydown.esc="closeCart()">
        <h2>Корзина</h2>
        <button :class="$style.closeButton" type="button" aria-label="Закрыть корзину" @click="closeCart()">
          <svg-icon name="icon-close" width="14" height="14" />
        </button>
        <div v-show="productsInCart.length">
          <h3>Товары в корзине</h3>
          <div>
            <CartItem
              v-for="card in productsInCart"
              :key="'cart-' + card.id"
              :card="card"
            />
          </div>
        </div>
        <div v-show="productsInCart.length">
          <h3>Оформить заказ</h3>
          <CartForm />
        </div>
        <div v-show="!productsInCart.length && isFormValid" :class="$style.successCart">
          <img src="~/assets/img/ok-hand.png" width="80" height="80" alt="Заявка успешно отправлена">
          <p>Заявка успешно отправлена</p>
          <p>Вскоре наш менеджер свяжется с Вами</p>
        </div>
        <div v-show="!productsInCart.length && !isFormValid" :class="$style.emptyCart">
          <p>Пока что вы ничего не добавили в корзину.</p>
          <button :class="$style.blackButton" type="button" @click="closeCart()">
            Перейти к выбору
          </button>
        </div>
      </div>
    </Trap>
  </div>
</template>

<script>
import CartItem from '@/components/CartItem'
import CartForm from '@/components/CartForm'
import Trap from 'vue-focus-lock'
import { mapState } from 'vuex'

export default {
  components: {
    CartItem, CartForm, Trap
  },

  computed: {
    ...mapState({
      isCartOpen: state => state.cart.isCartOpen,
      productsInCart: state => state.cart.productsInCart,
      isFormValid: state => state.cart.isFormValid
    })
  },

  watch: {
    isCartOpen () {
      if (this.isCartOpen) {
        document.documentElement.style.overflow = 'hidden'
      } else {
        document.documentElement.style.overflow = 'auto'
      }
    }
  },

  methods: {
    closeCart () {
      this.$store.dispatch('cart/toggleCart', false)
      this.$store.dispatch('cart/setFormState', false)
    }
  }
}
</script>

<style module lang="scss">
  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba($white, 0.8);
    z-index: 1;
  }

  .cart {
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 460px;
    height: 100%;
    padding: 50px;
    margin-right: 0;
    overflow: auto;
    background: $white;
    z-index: 4;
    top: 0;
    right: 0;
    box-shadow: -4px 0 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px 0 0 8px;
    transition: margin 0.3s ease;

    @include viewport--sm {
      width: 100%;
      padding: 25px;
    }
  }

  h2 {
    text-align: left;
    font-size: 32px;
    color: #000;
  }

  h3 {
    margin-top: 25px;
    text-align: left;
    font-size: 18px;
    font-weight: 400;
    color: $grey;
  }

  .closeButton {
    position: absolute;
    top: 65px;
    right: 60px;
    width: 14px;
    height: 14px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;

    svg {
      color: #000;
      transition: all 0.3s ease;
    }

    &:hover,
    &:focus {
      svg {
        color: $grey-light;
      }
    }

    &:active {
      opacity: 0.75;
    }

    @include viewport--sm {
      top: 40px;
      right: 25px;
    }
  }

  .blackButton {
    width: 100%;
    height: 50px;
    border: none;
    outline: none;
    border-radius: 8px;
    background-color: $black;
    font-size: 16px;
    text-align: center;
    color: $white;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover,
    &:focus {
      background-color: $grey;
    }

    &:active {
      opacity: 0.75;
    }
  }

  .emptyCart {
    margin-top: 25px;

    p {
      padding-right: 35px;
      font-size: 22px;
      font-weight: 400;
      letter-spacing: -0.3px;
      color: #000;
    }

    .blackButton {
      margin-top: 25px;
    }
  }

  .successCart {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      font-size: 16px;
      color: $grey;
      font-weight: 400;

      &:first-of-type {
        margin-top: 25px;
        font-size: 24px;
        font-weight: 700;
        color: #000;
      }
    }
  }

  .cartClosed {
    .overlay {
      display: none;
    }

    .cart {
      margin-right: -480px;
      transition: margin 0.3s ease;

      @include viewport--sm {
        margin-right: calc(-100% - 20px);
      }
    }
  }
</style>
