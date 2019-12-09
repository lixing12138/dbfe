<template>
  <div class="navigator">
      <div class="title">复旦大学选课系统</div>
      <div v-if="showInfo"  class="info">
          <el-dropdown trigger="click" @command="logout()">
            <span class="el-dropdown-link">
                {{user}},你好<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">退出</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
      </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import store from '../store/index'
import { logout } from '../api/getData'
export default {
    name: 'Navigator',
    data(){
        return{
            showInfo: false,
            user:'',

        }
    },
    created(){
        this.getData();
    },
    computed: {
        ...mapState(['userInfo']),
    },
    methods: {
        ...mapActions(['getUserData']),
        async getData(){
            await this.getUserData();
            if(store.state.isLogin){
                this.showInfo = true;
                this.user = store.state.userInfo.username;
            }
        },
        logout(){
            this.getLogoutData();
        },
        async getLogoutData(){
            let res = await logout({ logout:true});
            if(res.result){
                this.$message(res.message);
                await this.getUserData();
                this.$router.go(0);
            }
        }
    }
}
</script>

<style lang="less">
.navigator{
    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;
    margin-bottom: 30px;
    color: #1989fa;
    display: flex;
    align-items: center;
    height: 80px;
    justify-content: space-around;
    .title{
        font-size: 35px;
    }
    .info{
        .el-dropdown-link {
            cursor: pointer;
            color: #409EFF;
        }
        .el-icon-arrow-down {
            font-size: 12px;
        }
    }
}
</style>