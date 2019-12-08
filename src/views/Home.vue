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
            <el-button type="primary" @click="submitForm('formData')">提交</el-button>
          </el-form-item>
      </el-form>
    </div>
  </Page>
</template>

<script>
// @ is an alias to /src
import Page from '../components/Page'
import { login } from '../api/getData'

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
  components: {
    Page
  },
  methods: {
    submitForm(formData){
      this.$refs[formData].validate(async (valid) => {
          if (valid) {
            let res = await login({
              username: this.formData.username,
              password: this.formData.password
            });
            console.log(res.data);
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
  .form{
    background-color: #f6f6f6;
    margin-top: 10px;
    width: 300px;
  }
}
</style>