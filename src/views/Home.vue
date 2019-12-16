<template>
  <Page>
    <div class="login">
      <el-form ref="formData" :model="formData" label-width="80px" class="form">
          <el-form-item 
          prop="username"
          label="账号"
          :rules="[
           { required: true, message: '请输入账号', trigger: 'blur' },
           ]">
            <el-input v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item 
          prop="password"
          label="密码"
          :rules="[
           { required: true, message: '请输入密码', trigger: 'blur' },
           ]">
            <el-input type="password" v-model="formData.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('formData')" class="btn">提交</el-button>
          </el-form-item>
      </el-form>
    </div>
  </Page>
</template>

<script>
// @ is an alias to /src
import Page from '../components/Page'
import { login, isTime } from '../api/getData'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Home',
  data(){
    return {
      formData: {
        username:'',
        password: ''
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  components: {
    Page
  },
  methods: {
    ...mapActions(['getUserData', 'setTimeChoose']),
    submitForm(formData){
      this.$refs[formData].validate(async (valid) => {
          if (valid) {
            let res = await login({
              nickname: this.formData.username,
              password: this.formData.password
            });
            if(res.result){
              await this.getUserData();
              await this.setTimeChoose();
              if(res.type === 'admin'){
                this.$router.push({ path: "admin" });
              }
              if (res.type === 'student'){
                if(this.$store.state.isTime){
                  this.$router.push({ path: 'student' });
                }else{
                  this.$router.push({ path: 'Tip' });
                }
              }
              if (res.type === 'teacher'){
                this.$router.push({ path: 'teacher' });
              }
              if(res.type === 'root'){
                this.$router.push({ path: 'admin'});
              }
            }else{
              this.$message(res.message);
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  }
}
</script>
<style scoped lang="less">
.login{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  .form{
    background-color: #f6f6f6;
    padding: 60px;
    width: 500px;
    .btn{
      float: right;
    }
  }
}
</style>