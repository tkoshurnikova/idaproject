<template>
  <div :class="$style.container">
    <div :class="$style.top">
      <nuxt-link to="/catalog">
        Открыть каталог
      </nuxt-link>
    </div>
  </div>
</template>

<script>

export default {
  async fetch ({ store, redirect }) {
    if (store.getters['categories/categories'].length === 0) {
      await store.dispatch('categories/fetchCategories')
      redirect(`/catalog/${store.getters['categories/categories'][0].id}`)
    }
  }
}
</script>

<style module lang="scss">
  h1 {
    font-weight: 700;
    font-size: 32px;
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
  }
</style>
