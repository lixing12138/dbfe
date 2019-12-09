<template>
  <Page>
    <div class="admin">
      <h1>管理员界面</h1>
       <el-tabs value="students" type="border-card" @tab-click="handleChangeTaps">
        <el-tab-pane label="学生管理" name="students"> 
          <br>
          <el-tabs value="studentName" :tab-position="tabPosition">
            <el-tab-pane label="学生名单管理" name="studentName">
              <el-table
            :data="studentData"
            stripe
            style="width: 100%">
              <el-table-column
                prop="sid"
                label="学号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="sname"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="sdeptname"
                label="学院">
              </el-table-column>
              <el-table-column
                prop="sclass"
                label="班级">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="handleStudentUpdate(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="handleStudentDelete(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            </el-tab-pane>
            <el-tab-pane label="教师信息批量上传">
              <Upload :action="path" ></Upload>
            </el-tab-pane>
          </el-tabs>

        </el-tab-pane>
        <el-tab-pane label="教师管理" name="teachers">
          <el-tabs value="teacherList" :tab-position="tabPosition">
            <el-tab-pane label="教师名单管理" name="teacherList">
              <el-table
                :data="teacherData"
                stripe
                style="width: 100%">
                  <el-table-column
                    prop="tid"
                    label="工号"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="tname"
                    label="姓名"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="tdeptname"
                    label="院系">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                      <el-button @click="handleTeacherUpdate(scope.row)" type="text" size="small">编辑</el-button>
                      <el-button @click="handleTeacherDelete(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="教师信息批量上传">
              <Upload :action="path" ></Upload>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="课程管理" name="courses">课程管理</el-tab-pane>
        <el-tab-pane label="选课时间管理" name="times">选课</el-tab-pane>
      </el-tabs>
      <!-- 学生弹窗 -->
      <StudentInfo :studentDialogVisible="studentDialogVisible" :info="info" @close="closeStudentDialog"/>
      <!-- 教师弹窗 -->
      <TeacherInfo :teacherDialogVisible="teacherDialogVisible" :info="teacherInfo" @close="closeTeacherDialog"></TeacherInfo>
    </div>
  </Page>
</template>

<script>
import Page from '../components/Page'
import StudentInfo from '../components/StudentInfo'
import TeacherInfo from '../components/TeacherInfo'
import Upload from '../components/Upload'
import { getStudentInfo, deleteStudentInfo,uploadStudentInfo,
getTeacherInfo, deleteTeacherInfo,uploadTeacherInfo,
getCourseInfo, deleteCourseInfo,uploadCourseInfo,
uploadSectionInfo
} from '../api/getData'

export default {
  name: 'Admin',
  data(){
    return {
      tabPosition: 'left',
      studentData:[],
      teacherData: [],
      studentDialogVisible: false, // 学生弹窗
      teacherDialogVisible: false, // 教师弹窗
      // 学生信息
      info: {
        sid: '',
        sname: '',
        sclass: '',
        sdeptname: '' 
      },
      // 教师信息
      teacherInfo: {
        tid: '',
        tname: '',
        tdeptname: '',
      },
      path:''
    };
  },
  created(){
    this.getStudentData();
    this.getTeacherData();
  },
  components: {
    Page,
    StudentInfo,
    TeacherInfo,
    Upload,
  },
  methods: {
    async getStudentData(){
      let res = await getStudentInfo();
      this.studentData = res.data;
    },
    async getTeacherData(){
      let res = await getTeacherInfo();
      this.teacherData = res.data;
    },
    // 处理学生信息
    handleStudentUpdate(row){
      this.studentDialogVisible = true;
      this.info.sname = row.sname;
      this.info.sclass = row.sclass;
      this.info.sdeptname = row.sdeptname;
      this.info.sid = row.sid;

    },
    // 处理学生删除事件
    handleStudentDelete(row){
      this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await deleteStudentInfo({id: row.sid});
          res.data.result ? this.$message({
            type: 'success',
            message: '删除成功!'
          }) : this.$messag.error('删除失败');
          this.getStudentData();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 关闭学生弹窗
    closeStudentDialog(){
      this.getStudentData();
      this.studentDialogVisible = false;
    },
    // 处理教师信息
    handleTeacherUpdate(row){
      this.teacherDialogVisible =true;
      this.teacherInfo.tid = row.tid;
      this.teacherInfo.tname = row.tname;
      this.teacherInfo.tdeptname = row.tdeptname;
    },
    // 教师删除事件
    handleTeacherDelete(row){
      this.$confirm('此操作将永久删除该教师信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          let res = await deleteTeacherInfo({tid: row.tid});
          res.data.result ? this.$message({
            type: 'success',
            message: '删除成功!'
          }) : this.$messag.error('删除失败');
          this.getTeacherData();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 关闭教师弹窗
    closeTeacherDialog(){
      this.getTeacherData();
      this.teacherDialogVisible = false;
    },
    // 处理标签切换，更改path的值
    // handleChangeTaps(tab, event){
    //     this.path = `${this.$config.server}/admins/${tab.name}/upload`;
    //     console.log(this.path);
    // }
  }
}
</script>

<style>

</style>