<template>
    <div @click="searchDelayed(keyword, 0)">
        <slot></slot>
    </div>
</template>

<style scoped>
    div {
        cursor: pointer;
        user-select: none;
    }
    div:hover {
        opacity: 0.6;
    }
</style>

<script>
  import Search from '../../mixins/search.vue'
  export default {
    props: ['keyword'],
    mixins: [Search]
  }
</script>