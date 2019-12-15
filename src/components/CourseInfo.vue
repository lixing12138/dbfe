<template>
  <div>
      <el-dialog
        title="课程信息修改"
        :visible.sync="courseDialogVisible"
        :close-on-click-modal="false"
        width="30%">
        <el-form :model="info" label-width="80px">
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
          <el-button @click="handleCourseClose">取 消</el-button>
          <el-button type="primary" @click="submitCourseInfo">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { putCourseInfo } from '../api/getData'

export default {
    name: 'CourseInfo',
    props: {
        courseDialogVisible: Boolean,
        info: Object,
    },
    methods: {
        // 处理弹窗
        handleCourseClose(done) {
            this.$emit('close');
        },
        async submitCourseInfo(){
            let res = await putCourseInfo({
                c_id:this.info.c_id,
                c_title: this.info.c_title,
                c_dept_name: this.info.c_dept_name,
                c_credit: this.info.c_credit,
            });
            console.log(res);
            res.result ? this.$message({
                type: 'success',
                message: '修改成功'
            }) : this.$message.error('修改失败');
            this.$emit('close');
        }
    }
}
</script>

<style>

</style>