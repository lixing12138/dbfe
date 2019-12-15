<template>
  <div>
      <el-form :model="info" label-width="80px">
            <el-form-item label="教师工号">
                <el-input v-model="info.t_id"></el-input>
            </el-form-item>
            <el-form-item label="教师姓名">
                <el-input v-model="info.t_name"></el-input>
            </el-form-item>
            <el-form-item label="院系">
                <el-input v-model="info.t_dept_name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitTeacherInfo">确 定</el-button>
        </span>
  </div>
</template>

<script>
import { addTeacherInfo } from '../api/getData'

export default {
    name: 'TeacherInfoAdd',
    props: {
        info: Object,
    },
    methods: {
      
        async submitTeacherInfo(){
            let res = await addTeacherInfo({
                t_id: this.info.t_id,
                t_name: this.info.t_name,
                t_dept_name: this.info.t_dept_name
            });
            res.result ? this.$message({
                type: 'success',
                message: res.message
            }) : this.$message.error(res.message);
            this.$emit('upload');
        }
    }
}
</script>

<style>

</style>