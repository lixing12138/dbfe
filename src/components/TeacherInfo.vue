<template>
  <div>
      <el-dialog
        title="教师信息修改"
        :visible.sync="teacherDialogVisible"
        :close-on-click-modal="false"
        width="30%">
        <el-form :model="info" label-width="80px">
            <el-form-item label="教师姓名">
                <el-input v-model="info.t_name"></el-input>
            </el-form-item>
            <el-form-item label="院系">
                <el-input v-model="info.t_dept_name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleTeacherClose">取 消</el-button>
          <el-button type="primary" @click="submitTeacherInfo">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { putTeacherInfo } from '../api/getData'

export default {
    name: 'TeacherInfo',
    props: {
        teacherDialogVisible: Boolean,
        info: Object,
    },
    methods: {
        // 处理弹窗
        handleTeacherClose(done) {
            this.$emit('close');
        },
        async submitTeacherInfo(){
            let res = await putTeacherInfo({
                t_id: this.info.t_id,
                t_name: this.info.t_name,
                t_dept_name: this.info.t_dept_name
            });
            res.result ? this.$message({
                type: 'success',
                message: res.message
            }) : this.$message.error('修改失败');
            this.$emit('close');
        }
    }
}
</script>

<style>

</style>