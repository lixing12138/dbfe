<template>
  <div>
      <el-dialog
        title="开课信息修改"
        :visible.sync="sectionDialogVisible"
        :close-on-click-modal="false"
        width="50%">
        <el-form :model="info" label-width="100px">
            <el-form-item label="开课年份">
                <el-input v-model="info.year"></el-input>
            </el-form-item>
            <el-form-item label="开课季度">
                <el-input v-model="info.semester"></el-input>
            </el-form-item>
            <el-form-item label="位置">
                <el-input v-model="info.building"></el-input>
            </el-form-item>
            <el-form-item label="房间号">
                <el-input v-model="info.room_number"></el-input>
            </el-form-item>
            <el-form-item label="已选人数">
                <el-input v-model="info.total_number"></el-input>
            </el-form-item>
            <el-form-item label="限制人数">
                <el-input v-model="info.max_number"></el-input>
            </el-form-item>
            <el-form-item label="任课教师编号">
                <el-input v-model="info.t_id"></el-input>
            </el-form-item>
            <el-form-item label="上课时间" v-for="time in info.time" :key="time.sec_id">
                <el-select v-model="time.sec_id" placeholder="周几">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span class="demonstration">上课时间：</span>
                <div class="demonstration">值：{{ time.start_time }}</div>
                <el-date-picker
                v-model="time.start_time"
                type="date"
                placeholder="选择日期"
                value-format="HH:mm:ss">
                </el-date-picker>
                
                <span class="demonstration">下课时间：</span>
                <div class="demonstration">值：{{ time.end_time }}</div>
                <el-date-picker
                v-model="time.start_time"
                type="date"
                placeholder="选择日期"
                value-format="HH:mm:ss">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleSectionClose">取 消</el-button>
          <el-button type="primary" @click="submitSectionInfo">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { putStudentInfo } from '../api/getData'

export default {
    name: 'SectionInfo',
    data(){
        return {
            options: [{
                value: '周一',
                label: '周一'
                }, {
                value: '周二',
                label: '周二'
                }, {
                value: '周三',
                label: '周三'
                }, {
                value: '周四',
                label: '周四'
                }, {
                value: '周五',
                label: '周五'
                },{
                    value: '周六',
                label: '周六'
                },{
                    value: '周日',
                label: '周日'
                }
                ],
            time: '',
            sec:''
        }
    },
    props: {
        sectionDialogVisible: Boolean,
        info: Object,
    },
    created(){
        this.time = [this.info.start_time, this.info.end_time];
    },
    methods: {
        // 处理弹窗
        handleSectionClose(done) {
            this.$emit('close');
        },
        async submitSectionInfo(){
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