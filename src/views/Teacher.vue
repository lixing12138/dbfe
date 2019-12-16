<template>
  <Page>
    <el-tabs v-model="activeName" style="margin:30px">
      <el-tab-pane label="我的课程" name="first">
        <el-table
            :data="allCourses"
            border
            style="width: 100%;margin:10px">
            <el-table-column
              prop="course_id"
              label="课程编号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="c_name"
              label="课程名称"
              width="150">
            </el-table-column>
            <el-table-column
              prop="c_dept_name"
              label="开课院系"
              width="200">
            </el-table-column>
            <el-table-column
              prop="credit"
              label="学分"
              width="100">
            </el-table-column>
            <el-table-column
              label="上课时间"
              width="150">
              <template slot-scope="scope">
                <div v-for=" time in scope.row.c_time" :key="time.c_sec_time">
                  <p>{{ time.c_sec_time}}</p>
                  <p>{{ time.c_start_time}}至{{ time.c_end_time}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="上课教室"
              width="150">
              <template slot-scope="scope">
                <p>{{ scope.row.c_building}}</p>
                <p>{{ scope.row.c_room_number}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="c_total_number"
              label="选课人数"
              width="150">
            </el-table-column>
            <el-table-column
              prop="c_max_number"
              label="最大人数"
              width="150">
              </el-table-column>
            <el-table-column
              label="花名册">
              <template slot-scope="scope">
                <el-button @click="look(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="成绩">
              <template slot-scope="scope">
                <el-button @click="upload(scope.row)" type="text" size="small">上传</el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-tab-pane>
      <el-tab-pane label="选课申请" name="second">
        <el-table
          :data="coursesApply"
          style="width: 100%">
          <el-table-column
            prop="course_id"
            label="课程编号"
            width="200px">
          </el-table-column>
          <el-table-column
            prop="s_id"
            label="学号"
            width="200px">
          </el-table-column>
          <el-table-column
            prop="reason"
            label="申请理由"
            width="200px">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="200px">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="处理">
            <template slot-scope="scope">
              <el-button @click="pass(scope.row)" type="text" size="small">通过</el-button>
              <el-button @click="fail(scope.row)" type="text" size="small">不通过</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="手动登分" name="third">
        <el-form :model="studentGrade" style="width:50%" label-width="100px">
          <el-form-item label="学号">
            <el-input v-model="studentGrade.s_id"></el-input>
          </el-form-item>
          <el-form-item label="课程编号">
            <el-input v-model="studentGrade.course_id"></el-input>
          </el-form-item>
          <el-form-item label="学年">
            <el-input v-model="studentGrade.year"></el-input>
          </el-form-item>
          <el-form-item label="学期">
            <el-input v-model="studentGrade.semester"></el-input>
          </el-form-item>
          <el-form-item label="成绩">
            <el-input v-model="studentGrade.grade"></el-input>
          </el-form-item>
          <el-button type="primary" @click="grade" class="btn">提交</el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 学生名单 -->
    <el-dialog
      title="学生名单"
      :visible.sync="studentDialogVisible"
      width="80%"
      fullscreen
      center>
      <el-table
        :data="studentList"
        style="width: 100%">
        <el-table-column
          prop="s_id"
          label="学号"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="s_name"
          label="姓名"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="s_dept_name"
          label="院系"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="s_class"
          label="年级">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="studentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="studentDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 上传成绩 -->
    <el-dialog
      title="上传成绩"
      :visible.sync="uploadDialogVisible"
      width="50%">
      <div>
        <Upload :path="path"></Upload>
      </div>
      <div slot="footer">
        <el-button @click="uploadDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </Page>
</template>

<script>
import Page from '../components/Page'
import Upload from '../components/Upload'
import { getAllTeach, getStudentList, 
getApplyFromStudent, handleApply, uploadByhand } from '../api/getData'

export default {
  data(){
    return{
      activeName: 'first',
      allCourses:[],
      studentDialogVisible: false, // 学生名单
      uploadDialogVisible: false, //上传成绩
      studentList: [],//学生名单
      coursesApply: [], //申请课程名单
      path:'',
      studentGrade: {
        s_id:'',
        course_id:'',
        semester: '',
        year:'',
        grade:'',
      }
    }
  },
  created(){
    // 获得教师所教课程
    this.getAllCourses();
    //获得教师的选课申请
    this.getApply();
  },
  components:{
    Page,
    Upload
  },
  methods: {
    async getAllCourses(){
      let res = await getAllTeach();
      this.allCourses = res.data;
    },
    async look(row){
      let res = await getStudentList({ c_id: row.course_id});
      this.studentDialogVisible =true;
      this.studentList = res.data;
    },
    async getApply(){
      let res = await getApplyFromStudent();
      this.coursesApply = res.data;
    },
    async pass(row){
      this.$confirm('是否通过该学生申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await handleApply({ id: row.id, status: '通过'});
          res.result ? this.$message({
            type: 'success',
            message: '处理成功!'
          }) : this.$message.error('处理失败');
          this.getApply();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '处理取消'
          });          
        });
    },
    async fail(row){ 
      this.$confirm('是否拒绝该学生申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await handleApply({ id: row.id, status: '未通过'});
          res.result ? this.$message({
            type: 'success',
            message: '处理成功!'
          }) : this.$message.error('处理失败');
          this.getApply();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '处理取消'
          });          
        });

    },
    upload(row){
      this.path = '/server/controllers/teachers/grade.php'
      this.uploadDialogVisible = true;
    },
    async grade(){
      // this.uploadGrade();  
      let res = await uploadByhand({ 
        s_id: this.studentGrade.s_id,
        course_id: this.studentGrade.course_id,
        semester: this.studentGrade.semester,
        year: this.studentGrade.year,
        grade: this.studentGrade.grade,
        });
      console.log(res);
      res.result ? this.$message({
        type: 'success',
        info: res.message
      }): this.$message.error(res.message);
      this.studentGrade.s_id= '';
      this.studentGrade.course_id ='';
      this.studentGrade.semester ='';
      this.studentGrade.year='';
      this.studentGrade.grade='';
    }
  }
}
</script>

<style>

</style>