<template>
  <div v-infinite-scroll="loadMore" :class="$style.cardsList">
    <Card
      v-for="card in cards"
      :key="card.id"
      :card="card"
    />
  </div>
</template>

<script>
export default {
  async validate ({ params, store }) {
    if (store.state.categories.categories.length === 0) {
      await store.dispatch('categories/fetchCategories')
    }

    const ids = store.state.categories.categories.map(cat => cat.id)
    return ids.includes(parseInt(params.category))
  },

  props: {
    sort: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      limit: 12,
      cardsShown: 12
    }
  },

  computed: {
    cards () {
      const filteredCards = this.$store.getters['cards/cards'].filter((card) => {
        return parseInt(card.category) === parseInt(this.$route.params.category)
      })

      let sortedCards = []
      switch (this.sort) {
        case '':
          sortedCards = filteredCards
          break

        case 'rating':
          sortedCards = filteredCards.slice().sort((a, b) => {
            return b.rating - a.rating
          })
          break

        case 'price':
          sortedCards = filteredCards.slice().sort((a, b) => {
            return a.price - b.price
          })
          break
      }

      return sortedCards.slice(0, this.cardsShown)
    }
  },

  methods: {
    loadMore () {
      this.cardsShown = this.cardsShown + this.limit
    }
  }
}
</script>

<style module lang="scss">
  .cardsList {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    flex-grow: 1;
    margin-top: -16px;
    margin-right: -16px;

    @include viewport--sm {
      margin-right: 0;
    }
  }
</style>
