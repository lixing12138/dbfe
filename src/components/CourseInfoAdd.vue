<template>
  <div>
        <el-form :model="info" label-width="80px">
            <el-form-item label="课程序号">
                <el-input v-model="info.c_id"></el-input>
            </el-form-item>
            <el-form-item label="课程名称">
                <el-input v-model="info.c_title"></el-input>
            </el-form-item>
            <el-form-item label="开课院系">
                <el-input v-model="info.c_dept_name"></el-input>
            </el-form-item>
            <el-form-item label="学分">
                <el-input v-model="info.c_credit"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitCourseInfo">确 定</el-button>
        </span>
  </div>
</template>

<script>
import { addCourseInfo } from '../api/getData'

export default {
    name: 'CourseInfoAdd',
    props: {
        info: Object,
    },
    methods: {
        async submitCourseInfo(){
            let res = await addCourseInfo({
                c_id:this.info.c_id,
                c_title: this.info.c_title,
                c_dept_name: this.info.c_dept_name,
                c_credit: this.info.c_credit,
            });
            res.result ? this.$message({
                type: 'success',
                message: '添加成功'
            }) : this.$message.error(res.message);
            this.$emit('upload');
        }
    }
}
</script>

<style>

</style>