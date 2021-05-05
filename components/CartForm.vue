<template>
  <form action="post">
    <div>
      <label for="form-name">
        Ваше имя
      </label>
      <input
        id="form-name"
        type="text"
        name="form-name"
        required
        pattern="[А-Яа-яЁё ]+"
        minlength="2"
        placeholder="Ваше имя"
      >
    </div>
    <div>
      <label for="form-phone">
        Ваше имя
      </label>
      <input
        id="form-phone"
        v-mask="'+7 ### ###-##-##'"
        minlength="16"
        type="tel"
        name="form-phone"
        required
        placeholder="Телефон"
      >
    </div>
    <div>
      <label for="form-address">
        Адрес
      </label>
      <input
        id="form-address"
        type="text"
        name="form-address"
        required
        placeholder="Адрес"
      >
    </div>
    <button :class="$style.blackButton" @click.prevent="onSubmit()">
      Отправить
    </button>
    <p v-if="!isValid" :class="$style.validationMsg">
      Заполните все поля
    </p>
  </form>
</template>

<script>
import { mask } from 'vue-the-mask'

export default {
  directives: {
    mask
  },

  data () {
    return {
      isValid: true
    }
  },

  methods: {
    onSubmit () {
      const isPhoneValid = this.$el.querySelector('#form-phone').value.length >= this.$el.querySelector('#form-phone').minLength
      this.isValid = this.$el.checkValidity() && isPhoneValid
      if (this.isValid) {
        this.$el.reset()
        this.$store.dispatch('cart/resetCart')
        this.$store.dispatch('cart/setFormState', true)
      }
    }
  }
}
</script>

<style module lang="scss">
  form {
    text-align: left;
  }

  label {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    clip: rect(0 0 0 0);
  }

  input {
    width: 100%;
    height: 50px;
    padding: 14px;
    margin-top: 16px;
    border: none;
    border-radius: 8px;
    background-color: $grey-extra-light;
    font-size: 16px;
    color: $black;
    cursor: pointer;

    &::placeholder {
      color: $grey-light;
    }
  }

  .blackButton {
    width: 100%;
    height: 50px;
    margin-top: 24px;
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

  .validationMsg {
    color: $red;
    margin-top: 16px;
    font-size: 16px;
    font-weight: 400;
  }
</style>
