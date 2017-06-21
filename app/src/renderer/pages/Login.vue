<template lang="pug">
  div.login-container: div.login-panel
    input(v-model="host" type="text" placeholder="Host")
    input(v-model="login" type="text" placeholder="E-mail")
    input(v-model="password" type="password" placeholder="Password")
    button(@click="auth") Login
</template>

<script>
  import api from '../vuex/api';

  export default {
    components: {},

    data: () => ({
      login: null,
      password: null,
      host: null,
    }),

    computed: {

    },

    methods: {
      auth() {
        window.localStorage.setItem('auth:host', this.host);
        window.localStorage.setItem('auth:login', this.login);
        window.localStorage.setItem('auth:password', this.password);

        api.auth(this.host, this.login, this.password).then(() => {
          this.$router.replace({ name: 'tasks' });
        }).catch((e) => {
          console.log('err => ', e);
        });
      },
    },

    mounted() {
      this.host = window.localStorage.getItem('auth:host');
      this.login = window.localStorage.getItem('auth:login');
      this.password = window.localStorage.getItem('auth:password');
    },
  };
</script>


<style lang="stylus">
  .login-container
    background #EEE
    width 100%
    height 100%
    position absolute
    display flex
    align-items center
    justify-content center
  .login-panel
    background #FFF
    padding 40px
    border-radius 5px
    box-shadow 0 4px 50px -5px #0001

    input
      display block
      margin 0 0 20px 0
      width 200px
      font-size 16px
      padding 5px 10px
      // background #0001
      box-shadow 0 0 0 1px #0001
      border none
      border-radius 3px

</style>
