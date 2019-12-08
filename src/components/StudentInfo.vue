<template>
  <div>
      <el-dialog
        title="学生信息修改"
        :visible.sync="studentDialogVisible"
        width="30%">
        <el-form :model="info" label-width="80px">
            <el-form-item label="学生姓名">
                <el-input v-model="info.sname"></el-input>
            </el-form-item>
            <el-form-item label="班级">
                <el-input v-model="info.sclass"></el-input>
            </el-form-item>
            <el-form-item label="院系">
                <el-input v-model="info.sdeptname"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleStudentClose">取 消</el-button>
          <el-button type="primary" @click="submitStudentInfo">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
    name: 'StudentInfo',
    props: {
        studentDialogVisible: Boolean,
        info: Object,
    },
    methods: {
        // 处理弹窗
        handleStudentClose(done) {
            this.$emit('close');
        },
        async submitStudentInfo(){
            let formData = new FormData();
            formData.append('s_id', this.info.sid);
            formData.append('s_name', this.info.sname);
            formData.append('s_dept_name', this.info.sdeptname);
            formData.append('s_class', this.info.sclass);
            let res = await this.axios.put(`${this.$config.server}/admin/student`, formData);
            res.data.result ? this.$message({
                type: 'success',
                message: '修改成功'
            }) : this.$messag.error('删除失败');
            this.$emit('close');
        }
    }
}
</script>

<style>

</style>