<template>
  <div>
        <el-form :model="info" label-width="80px">
            <el-form-item label="学生学号">
                <el-input v-model="info.s_id"></el-input>
            </el-form-item>
            <el-form-item label="学生姓名">
                <el-input v-model="info.s_name"></el-input>
            </el-form-item>
            <el-form-item label="班级">
                <el-input v-model="info.s_class"></el-input>
            </el-form-item>
            <el-form-item label="院系">
                <el-input v-model="info.s_dept_name"></el-input>
            </el-form-item>
            <el-form-item label="绩点">
                <el-input v-model="info.s_credit"></el-input>
            </el-form-item>
            <el-form-item label="总学分">
                <el-input v-model="info.s_total_credit"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitStudentInfo">确 定</el-button>
        </span>
  </div>
</template>

<script>
import { addStudentInfo } from '../api/getData'

export default {
    name: 'StudentInfoAdd',
    props: {
        info: Object,
    },
    methods: {
        async submitStudentInfo(){
            let res = await addStudentInfo({
                s_id:this.info.s_id,
                s_name: this.info.s_name,
                s_dept_name: this.info.s_dept_name,
                s_class: this.info.s_class,
                s_credit: this.info.s_credit,
                s_total_credit: this.info.s_total_credit
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