<template lang="pug">
  span.favorite(@click="toggle"): i.fa(:class="active ? 'fa-star' : 'fa-star-o'")
</template>

<script>
  import api from '../vuex/api';

  export default {
    name: 'favorite',
    props: {
      active: null,
      type: String,
      id: [Number, String],
    },

    methods: {
      toggle() {
        if (this.type && this.id) {
          const apiMethod = this.active ? 'removeFavorite' : 'addFavorite';
          api[apiMethod](this.type, this.id).then(() => {
            this.$emit('update', !this.active);
          });
        }
      },
    },
  };
</script>

<style lang="stylus">
  .favorite
    display        inline-block
    color          #F90
    font-size      1.1rem
    vertical-align middle
</style>
