<template>
  <div :class="$style.container">
    <div :class="$style.top">
      <h1>Каталог</h1>
      <div :class="$style.dropdown" id="dropdown">
        Сортировать по:
        <button
          :class="$style.dropdownButton"
          type="button"
          aria-label="Открыть список"
          @click="toggleList()"
        >
          <span>{{ sort.find((element) => element.value === currentSort).name }}</span>
          <svg-icon name="icon-dropdown" width="5" height="3" />
        </button>
        <div v-show="isDropdownOpen" :class="$style.dropdownList">
          <button
            v-for="element in sort"
            :key="element.value"
            type="button"
            @click="setSort(element.value)"
          >
            По {{ element.name }}
          </button>
        </div>
      </div>
    </div>
    <div :class="$style.content">
      <Nav
        :categories="categories"
      />
      <Cart />
      <NuxtChild
        :sort="currentSort"
      />
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Cart from '@/components/Cart'

export default {
  components: {
    Nav, Cart
  },

  data () {
    return {
      currentSort: '',
      sort: [
        {
          name: 'умолчанию',
          value: ''
        },
        {
          name: 'цене',
          value: 'price'
        },
        {
          name: 'популярности',
          value: 'rating'
        }
      ],
      isDropdownOpen: false
    }
  },

  async fetch ({ store }) {
    if (store.getters['categories/categories'].length === 0) {
      await store.dispatch('categories/fetchCategories')
    }

    if (store.getters['cards/cards'].length === 0) {
      await store.dispatch('cards/fetchCards')
    }
  },

  computed: {
    categories () {
      return this.$store.getters['categories/categories']
    },

    cards () {
      return this.$store.getters['cards/cards']
    }
  },

  methods: {
    setSort (value) {
      this.currentSort = value
      this.closeList()
    },

    toggleList () {
      this.isDropdownOpen = !this.isDropdownOpen
      this.clickListener()
    },

    closeList () {
      this.isDropdownOpen = false
    },

    clickListener () {
      const onDocClick = (evt) => {
        if (!evt.target.closest('#dropdown')) {
          this.closeList()
        }
      }

      if (this.isDropdownOpen) {
        this.$el.closest('body').addEventListener('click', onDocClick)
      }
    }
  }
}
</script>

<style module lang="scss">
  h1 {
    font-weight: 700;
    font-size: 32px;

    @include viewport--sm {
      font-size: 24px;
      margin-right: 15px;
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1440px;
    padding: 0 5vw 0 6vw;
    align-items: center;
    text-align: center;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 30px;

    select {
      border: none;
      outline: none;
      color: $grey;
      font-size: 16px;
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 25px;

    @include viewport--md {
      flex-direction: column;
      margin-top: 10px;
    }
  }

  .dropdownButton {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
    color: $grey;
    display: inline-flex;
    align-items: center;
    transition: all 0.3s ease;

    svg {
      margin-left: 4px;
    }

    &:hover,
    &:focus {
      opacity: 0.75;
    }

    &:active {
      opacity: 0.5;
    }

    @include viewport--sm {
      font-size: 12px;
      display: block;
      margin-left: auto;
    }
  }

  .dropdownList {
    position: absolute;
    right: 5vw;
    width: 160px;
    padding-top: 8px;
    padding-bottom: 8px;
    background-color: $white;
    z-index: 5;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;

    button {
      display: block;
      width: 100%;
      height: 26px;
      cursor: pointer;
      color: $grey-light;
      border: none;
      background-color: transparent;
      outline: none;
      font-size: 14px;
      text-align: left;
      transition: all 0.3s ease;

      &:hover,
      &:focus {
        background-color: $grey-extra-light;
        color: $black;
      }

      @include viewport--sm {
        font-size: 12px;
      }
    }
  }

  .dropdown {
    @include viewport--sm {
      font-size: 12px;
      text-align: right;
    }
  }
</style>
