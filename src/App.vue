<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import store from './store/index'

export default {
  data(){
    return {
      // loading: true
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  created(){
    this.getData();
  },
  methods:{
    ...mapActions(['getUserData', 'setTimeChoose']),
    async getData(){
      await this.getUserData();
      await this.setTimeChoose();
      if(store.state.isLogin){
        this.$router.push({name: store.state.userInfo.type});
      }
      // this.loading = false;
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
