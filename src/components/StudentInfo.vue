<template>
  <div>
      <el-dialog
        title="学生信息修改"
        :visible.sync="studentDialogVisible"
        :close-on-click-modal="false"
        width="30%">
        <el-form :model="info" label-width="80px">
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
          <el-button @click="handleStudentClose">取 消</el-button>
          <el-button type="primary" @click="submitStudentInfo">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { putStudentInfo } from '../api/getData'

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
            // let formData = new FormData();
            // formData.append('s_id', this.info.s_id);
            // formData.append('s_name', this.info.s_name);
            // formData.append('s_dept_name', this.info.s_dept_name);
            // formData.append('s_class', this.info.s_class);
            let res = await putStudentInfo({
                s_id:this.info.s_id,
                s_name: this.info.s_name,
                s_dept_name: this.info.s_dept_name,
                s_class: this.info.s_class,
                s_credit: this.info.s_credit,
                s_total_credit: this.info.s_total_credit
            });
            console.log(res);
            res.result ? this.$message({
                type: 'success',
                message: '修改成功'
            }) : this.$messag.error('修改失败');
            this.$emit('close');
        }
    }
}
</script>

<style>

</style>