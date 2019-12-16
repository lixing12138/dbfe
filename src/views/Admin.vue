<template>
  <Page>
    <div class="admin" v-loading="loading">
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
                prop="s_id"
                label="学号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="s_name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="s_dept_name"
                label="学院">
              </el-table-column>
              <el-table-column
                prop="s_class"
                label="班级">
              </el-table-column>
              <el-table-column
                prop="s_credit"
                label="绩点">
              </el-table-column>
              <el-table-column
                prop="s_total_credit"
                label="总学分">
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
            <el-tab-pane label="学生信息批量上传">
              <Upload :path="path" ></Upload>
            </el-tab-pane>
            <el-tab-pane label="学生信息逐一上传">
              <StudentInfoAdd :info="info" @upload="initialStudentInfo"></StudentInfoAdd>
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
                    prop="t_id"
                    label="工号"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="t_name"
                    label="姓名"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="t_dept_name"
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
              <Upload :path="path"></Upload>
            </el-tab-pane>
            <el-tab-pane label="教师信息逐一上传">
              <TeacherInfoAdd :info="teacherInfo" @upload="initialTeacherInfo"></TeacherInfoAdd>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>

        <el-tab-pane label="课程管理" name="courses">
          <el-tabs value="courseList" :tab-position="tabPosition">
            <el-tab-pane label="课程列表管理" name="courseList">
              <el-table
                :data="courseData"
                stripe
                style="width: 100%">
                  <el-table-column
                    prop="c_id"
                    label="课程编号"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="c_title"
                    label="课程名称"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    prop="c_dept_name"
                    label="开课院系">
                  </el-table-column>
                  <el-table-column
                    prop="c_credit"
                    label="学分">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                      <el-button @click="handleCourseUpdate(scope.row)" type="text" size="small">编辑</el-button>
                      <el-button @click="handleCourseDelete(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="课程信息批量上传">
              <Upload :path="path"></Upload>
            </el-tab-pane>
            <el-tab-pane label="课程信息逐一上传">
              <CourseInfoAdd :info="courseInfo" @upload="initialCourseInfo"></CourseInfoAdd>
            </el-tab-pane>
          </el-tabs>

        </el-tab-pane>

        <el-tab-pane label="开课管理" name="sections">
          <el-tabs value="sectionList" :tab-position="tabPosition">
            <el-tab-pane label="开课列表管理" name="sectionList">
              <el-table
                :data="sectionData"
                stripe
                style="width: 100%">
                  <el-table-column
                    prop="course_id"
                    label="课程编号"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    label="开课学期"
                    width="180">
                    <template slot-scope="scope">
                      {{scope.row.year}}{{scope.row.semester==='fall' ?'秋季':'春季'}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="时间"
                    width="180">
                    <template slot-scope="scope">
                      <div v-for="time in scope.row.time" :key="time.sec_id">
                        {{time.sec_id}}
                        <p>上课时间：{{time.start_time}}</p>
                        <p>下课时间：{{time.end_time}}</p>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="教室">
                     <template slot-scope="scope">
                      <p>{{scope.row.building}}</p>
                      <p>{{scope.row.room_number}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="t_id"
                    label="任课教师工号">
                  </el-table-column>
                  <el-table-column
                    prop="total_number"
                    label="已选人数">
                  </el-table-column>
                  <el-table-column
                    prop="max_number"
                    label="限制人数">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                      <el-button @click="handleSectionUpdate(scope.row)" type="text" size="small">编辑</el-button>
                      <el-button @click="handleSectionDelete(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="开课信息批量上传">
              <Upload :path="path"></Upload>
            </el-tab-pane>
            <el-tab-pane label="开课信息逐一上传">
              <CourseInfoAdd :info="sectionInfo" @upload="initialSectionInfo"></CourseInfoAdd>
            </el-tab-pane>
          </el-tabs>

        </el-tab-pane>


        <el-tab-pane label="选课时间管理" name="times">
          <el-date-picker
            v-model="section_start_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="设置选课开始时间">
          </el-date-picker>
          <el-date-picker
            v-model="section_end_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="设置选课截至时间">
          </el-date-picker>
          <el-button type="primary" @click="setSectionTime">立即创建</el-button>
        </el-tab-pane>
      </el-tabs>

      <!-- 学生弹窗 -->
      <StudentInfo :studentDialogVisible="studentDialogVisible" :info="info" @close="closeStudentDialog"/>
      <!-- 教师弹窗 -->
      <TeacherInfo :teacherDialogVisible="teacherDialogVisible" :info="teacherInfo" @close="closeTeacherDialog"></TeacherInfo>
      <!-- 课程弹窗 -->
      <CourseInfo :courseDialogVisible="courseDialogVisible" :info="courseInfo" @close="closeCourseDialog"></CourseInfo>
      <!-- 开课弹窗 -->
      <SectionInfo :sectionDialogVisible="sectionDialogVisible" :info="sectionInfo" @close="closeSectionDialog"></SectionInfo>
      
    </div>
  </Page>
</template>

<script>
import Page from '../components/Page'
import StudentInfo from '../components/StudentInfo'
import TeacherInfo from '../components/TeacherInfo'
import CourseInfo from '../components/CourseInfo'
import SectionInfo from '../components/SectionInfo'

import Upload from '../components/Upload'

import StudentInfoAdd from '../components/StudentInfoAdd'
import TeacherInfoAdd from '../components/TeacherInfoAdd'
import CourseInfoAdd from '../components/CourseInfoAdd'


import { getStudentInfo, deleteStudentInfo,uploadStudentInfo,
getTeacherInfo, deleteTeacherInfo,uploadTeacherInfo,
getCourseInfo, deleteCourseInfo,uploadCourseInfo,
getSectionInfo, deleteSectionInfo, uploadSectionInfo,
setTime,
} from '../api/getData'

export default {
  name: 'Admin',
  data(){
    return {
      tabPosition: 'left',
      studentData:[],
      teacherData: [],
      courseData: [],
      sectionData:[],
      studentDialogVisible: false, // 学生弹窗
      teacherDialogVisible: false, // 教师弹窗
      courseDialogVisible: false, // 课程弹窗
      sectionDialogVisible: false, //开课
      // 学生信息
      info: {
        s_id: '',
        s_name: '',
        s_class: '',
        s_dept_name: '',
        s_credit: '',
        s_total_credit: ''
      },
      // 教师信息
      teacherInfo: {
        t_id: '',
        t_name: '',
        t_dept_name: '',
      },
      // 课程信息
      courseInfo: {
        c_id: '',
        c_title:'',
        c_dept_name: '',
        c_credit: ''
      },
      // 开课信息
      sectionInfo: {
        course_id: '',
        semester: '',
        year: '',
        building: '',
        room_number: '',
        total_number:'',
        max_number:'',
        sec_id:'',
        start_time:'',
        end_time:'',
        t_id:'', 
      },
      path: '/server/controllers/admins/students/upload.php',
      loading: true,
      section_start_time: '',// 选课开始时间
      section_end_time: '',// 选课截止时间
      time: {
        end_time: ''
      }
    };
  },
  created(){
    this.getStudentData();
    this.getTeacherData();
    this.getCourseData();
    this.getSectionData();
    this.loading = false;
    // this.fn = 'uploadStudentInfo';
  },
  components: {
    Page,
    StudentInfo,
    TeacherInfo,
    CourseInfo,
    SectionInfo,
    
    Upload,

    StudentInfoAdd,
    TeacherInfoAdd,
    CourseInfoAdd
  },
  methods: {
    async getStudentData(){
      let res = await getStudentInfo({ s_id: ''});
      this.studentData = res.data;
    },
    async getTeacherData(){
      let res = await getTeacherInfo({ t_id: ''});
      this.teacherData = res.data;
    },
    async getCourseData(){
      let res = await getCourseInfo({ c_id: ''});
      this.courseData = res.data;
    },
     async getSectionData(){
      let res = await getSectionInfo({ course_id: ''});
      this.sectionData = res.data;
    },
    // 处理学生信息
    handleStudentUpdate(row){
      this.studentDialogVisible = true;
      this.info.s_name = row.s_name;
      this.info.s_class = row.s_class;
      this.info.s_dept_name = row.s_dept_name;
      this.info.s_id = row.s_id;
      this.info.s_credit = row.s_credit;
      this.info.s_total_credit = row.s_total_credit;
    },
    // // 初始处理学生
    initialStudentInfo(){
      this.info.s_name = '';
      this.info.s_class = '';
      this.info.s_dept_name ='';
      this.info.s_id = '';
      this.info.s_credit = '';
      this.info.s_total_credit = '';
      this.getStudentData();
    },
    // 处理学生删除事件
    handleStudentDelete(row){
      this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await deleteStudentInfo({s_id: row.s_id});
          res.result ? this.$message({
            type: 'success',
            message: '删除成功!'
          }) : this.$message.error('删除失败');
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
      this.initialStudentInfo();
      this.studentDialogVisible = false;
    },

    // 处理教师信息
    handleTeacherUpdate(row){
      this.teacherDialogVisible =true;
      this.teacherInfo.t_id = row.t_id;
      this.teacherInfo.t_name = row.t_name;
      this.teacherInfo.t_dept_name = row.t_dept_name;
    },
    // 初始化教师信息
    initialTeacherInfo(){
      this.teacherInfo.t_id = '';
      this.teacherInfo.t_name = '';
      this.teacherInfo.t_dept_name = '';
      this.getTeacherData();
    },
    // 教师删除事件
    handleTeacherDelete(row){
      this.$confirm('此操作将永久删除该教师信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          let res = await deleteTeacherInfo({ t_id: row.t_id});
          res.result ? this.$message({
            type: 'success',
            message: '删除成功!'
          }) : this.$message.error('删除失败');
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
      this.initialTeacherInfo();
      this.teacherDialogVisible = false;
    },

    // 处理课程信息
    handleCourseUpdate(row){
      this.courseDialogVisible =true;
      this.courseInfo.c_id = row.c_id;
      this.courseInfo.c_title = row.c_title;
      this.courseInfo.c_dept_name = row.c_dept_name;
      this.courseInfo.c_credit = row.c_credit;
    },
    // 初始化课程信息
    initialCourseInfo(){
      this.courseInfo.c_id = '';
      this.courseInfo.c_title = '';
      this.courseInfo.c_dept_name = '';
      this.courseInfo.c_credit = '';
      this.getCourseData();
    },
    // 课程删除事件
    handleCourseDelete(row){
      this.$confirm('此操作将永久删除该课程信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          let res = await deleteCourseInfo({ c_id: row.c_id});
          res.result ? this.$message({
            type: 'success',
            message: res.message
          }) : this.$message.error(res.message);
          this.getCourseData();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 关闭课程弹窗
    closeCourseDialog(){
      this.initialCourseInfo();
      this.courseDialogVisible = false;
    },

   // 处理开课信息
    handleSectionUpdate(row){
      this.sectionDialogVisible =true;
      this.sectionInfo.course_id = row.course_id;
      this.sectionInfo.semester = row.semester;
      this.sectionInfo.year = row.year;
      this.sectionInfo.building = row.building;
      this.sectionInfo.room_number = row.room_number;
      this.sectionInfo.total_number = row.total_number;
      this.sectionInfo.max_number = row.max_number;
      this.sectionInfo.sec_id = row.sec_id;
      
      this.sectionInfo.time = row.time;
    },
    // 初始化开课信息
    initialSectionInfo(){
      this.sectionInfo.course_id = '';
      this.sectionInfo.semester = '';
      this.sectionInfo.year = '';
      this.sectionInfo.building = '';
      this.sectionInfo.room_number = '';
      this.sectionInfo.total_number = '';
      this.sectionInfo.max_number = '';
      this.sectionInfo.sec_id = '';
      // this.sectionInfo.start_time = '';
      // this.sectionInfo.end_time = '';
      // this.sectionInfo.t_id = '';
      this.getSectionData();
    },
    // 开课信息删除事件
    handleSectionDelete(row){
      this.$confirm('此操作将永久删除该开课信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          let res = await deleteSectionInfo({ course_id: row.course_id});
          res.result ? this.$message({
            type: 'success',
            message: res.message
          }) : this.$message.error(res.message);
          this.getSectionData();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 关闭开课信息弹窗
    closeSectionDialog(){
      this.initialSectionInfo();
      this.sectionDialogVisible = false;
    },


    async setSectionTime(){
      let res = await setTime({ time1: this.section_start_time, time2: this.section_end_time });
      res.result ? this.$message({
        type: 'success',
        message: res.message
      }): this.$message({
        type: 'info',
        message: res.message
      });  
    },
    // 处理标签切换，更改path的值
    handleChangeTaps(tab, event){
        // this.path = `${this.$config.server}/admins/${tab.name}/upload`;
        const fn = {
          students: '/server/controllers/admins/students/upload.php',
          teachers: '/server/controllers/admins/teachers/upload.php',
          courses: '/server/controllers/admins/courses/upload.php',
          sections: '/server/controllers/admins/sections/upload.php',
          times: '/server/controllers/admins/students/upload.php',
        };
        this.path = fn[tab.name];
        // console.log(this.path);
    }
  }
}
</script>

<style>

</style>