<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
  html {
    font-family: "PT Sans", "Arial", sans-serif;
    font-size: 16px;
    line-height: 1.3;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }

  .container {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 1440px;
    padding: 0 5vw 0 6vw;
    display: flex;
    align-items: center;
    text-align: center;
  }
</style>
