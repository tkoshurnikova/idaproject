<template>
  <nav>
    <ul>
      <li v-for="category of categories" :key="category.id">
        <nuxt-link :active-class="$style.active" :class="$style.navLink" :to="`/catalog/${category.id}`" @click.prevent="onCategoryClick(category.id)">
          {{ category.name }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
}
</script>

<style module lang="scss">
  nav {
    width: 161px;
    flex-basis: 161px;
    flex-shrink: 0;

    @include viewport--md {
      width: 100%;
      height: 100%;
      padding: 30px;
      margin-bottom: 16px;
      background: $white;
      z-index: 2;
      top: 0;
      left: 0;
      box-shadow: 0 4px 16px rgb(0 0 0 / 5%);
      border-radius: 8px;
    }
  }

  ul {
    list-style: none;
    padding-left: 0;
  }

  li {
    margin-bottom: 15px;
    text-align: left;
    font-size: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    @include viewport--md {
      text-align: center;
    }
  }

  .navLink {
    color: $grey-light;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover,
    &:focus {
      color: $grey;
    }
  }

  .active {
    color: $black;
    text-decoration: underline;
    -webkit-text-decoration-skip-ink: none;
    text-decoration-skip-ink: none;
  }
</style>
