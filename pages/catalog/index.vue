<template>
  <div :class="$style.cardsList">
    <Card
      v-for="card in cards"
      :key="card.id"
      :card="card"
    />
  </div>
</template>

<script>
export default {
  computed: {
    cards () {
      return this.$store.getters['cards/cards']
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
