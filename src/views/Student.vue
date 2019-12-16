<template>
  <Page> 
    <div class="student" v-loading="loading">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="可选课程" name="first">
          <el-form ref="search" :model="search" inline label-width="80px">
            <el-form-item label="课程名称">
                  <el-input v-model="search.name" placeholder="请输入课程名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchRes">筛选</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="coursesKexuan"
            border
            style="width: 100%">
            <el-table-column
              prop="c_id"
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
              width="120">
            </el-table-column>
            <el-table-column
              prop="c_teacher"
              label="任课教师"
              width="100">
            </el-table-column>
            <el-table-column
              prop="credit"
              label="学分"
              width="40">
            </el-table-column>
            <el-table-column
              label="上课时间"
              width="180">
              <template slot-scope="scope">
                <div v-for=" time in scope.row.c_time" :key="time.c_sec_time">
                  <p>{{ time.c_sec_time}}</p>
                  <p>{{ time.c_start_time}}至{{ time.c_end_time}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="上课教室"
              width="120">
              <template slot-scope="scope">
                <p>{{ scope.row.c_building}}</p>
                <p>{{ scope.row.c_room_number}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="c_exam_format"
              label="考试形式"
              width="100">
            </el-table-column>
            <el-table-column
              label="考试时间"
              width="180">
              <template slot-scope="scope">
                <p>{{ scope.row.c_exam_start_time}}</p>
                <p>至</p>
                <p>{{ scope.row.c_exam_end_time}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="考试教室"
              width="120">
              <template slot-scope="scope">
                <p>{{ scope.row.c_exam_building}}</p>
                <p>{{ scope.row.c_exam_room}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="c_total_number"
              label="选课人数"
              width="40">
            </el-table-column>
            <el-table-column
              prop="c_max_number"
              label="最大人数"
              width="40">
              </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="selected(scope.row)" type="text" size="small">选课</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="我的课程" name="second">
          <el-table
            :data="coursesYixuan"
            border
            style="width: 100%">
            <el-table-column
              prop="c_id"
              label="课程编号"
              width="100">
            </el-table-column>
            <el-table-column
              prop="c_name"
              label="课程名称"
              width="100">
            </el-table-column>
            <el-table-column
              prop="c_dept_name"
              label="开课院系"
              width="120">
            </el-table-column>
            <el-table-column
              prop="c_teacher"
              label="任课教师"
              width="100">
            </el-table-column>
            <el-table-column
              prop="credit"
              label="学分"
              width="40">
            </el-table-column>
            <el-table-column
              label="上课时间"
              width="180">
              <template slot-scope="scope">
                <div v-for=" time in scope.row.c_time" :key="time.c_sec_time">
                  <p>{{ time.c_sec_time}}</p>
                  <p>{{ time.c_start_time}}至{{ time.c_end_time}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="上课教室"
              width="120">
              <template slot-scope="scope">
                <p>{{ scope.row.c_building}}</p>
                <p>{{ scope.row.c_room_number}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="c_exam_format"
              label="考试形式"
              width="120">
            </el-table-column>
            <el-table-column
              label="考试时间"
              width="200">
              <template slot-scope="scope">
                <p>{{ scope.row.c_exam_start_time}}</p>
                <p>至</p>
                <p>{{ scope.row.c_exam_end_time}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="考试教室"
              width="120">
              <template slot-scope="scope">
                <p>{{ scope.row.c_exam_building}}</p>
                <p>{{ scope.row.c_exam_room}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="c_total_number"
              label="选课人数"
              width="40">
            </el-table-column>
            <el-table-column
              prop="c_max_number"
              label="最大人数"
              width="40">
              </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="quit(scope.row)" type="text" size="small">退课</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="申请" name="third">
           <el-tabs tab-position="left" style="height: 200px;" value="first">
            <el-tab-pane label="申请列表" name="first">
              <el-table
                :data="coursesApply"
                style="width: 80%">
                <el-table-column
                  prop="c_id"
                  label="课程编号"
                  width="200px">
                </el-table-column>
                <el-table-column
                  prop="c_title"
                  label="课程名称"
                  width="200px">
                </el-table-column>
                <el-table-column
                  prop="c_credit"
                  label="学分"
                  width="200px">
                </el-table-column>
                <el-table-column
                  prop="c_status"
                  label="状态">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="提交申请" name="second">
              <el-form :model="application" :hide-required-asterisk=true label-width="150px" size="mini" style="width:50%">
                <el-form-item label="课程编号">
                  <el-input v-model="application.c_id"></el-input>
                </el-form-item>
                <el-form-item label="申请原因">
                    <el-input type="textarea" v-model="application.reason"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitApply">提交申请</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          
        </el-tab-pane>
        <el-tab-pane label="成绩查询" name="fourth">
          <el-form :inline="true" :model="searchGrade" label-width="80px">
            <el-form-item label="学年">
              <el-select v-model="searchGrade.year" placeholder="请选择学年">
                <el-option label="2019" value="2019"></el-option>
                <el-option label="2018" value="2018"></el-option>
                <el-option label="2017" value="2017"></el-option>
                <el-option label="2016" value="2016"></el-option>
                <el-option label="查看所有" value="all"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学期">
              <el-select v-model="searchGrade.semester" placeholder="请选择学期">
                <el-option label="春季" value="spring"></el-option>
                <el-option label="秋季" value="fall"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchGrades">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="coursesGrade"
            style="width: 100%;margin-left:20px"
            >
            <el-table-column
              prop="course_id"
              label="课程编号"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="c_title"
              label="课程名称"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="year"
              label="年份"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="semester"
              label="学期"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="c_credit"
              label="学分"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="grade"
              label="成绩">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </Page>
</template>

<script>
import Page from '../components/Page'
import { getCourses, chooseCourse,applyCourse, 
getApplication, getGrades } from '../api/getData'

export default {
  data() {
    return {
      activeName: 'first',
      coursesKexuan: [],
      coursesYixuan: [],
      coursesApply: [],
      coursesGrade: [],
      loading: true,
      // 选课申请
      application:{
        c_id:'',
        reason:''
      },
      // 成绩查询
      searchGrade:{
        year:'',
        semester: ''
      },
      //筛选条件
      search:{
        name:''
      }

    };
  },
  created(){
    this.getCoursesKexuan();
    this.getCoursesYixuan();
    this.getApply();
    this.loading = false;
  },
  components: {
    Page,
  },
  methods: {
      // 获取可选课程
      async getCoursesKexuan(){
        let resKexuan = await getCourses({ choose: false, name: this.search.name});
        let kexuanIds = resKexuan.courses; 
        let tmpKexuan = [];
        for(let id of kexuanIds){
          let info = await getCourses({ c_id: id});
          tmpKexuan.push({...info.data,c_id:id});
        }
        this.coursesKexuan = tmpKexuan;

      },
      // 获取已选课程
      async getCoursesYixuan(){
        let resYIxuan = await getCourses({ choose: true});
        let yixuanIds = resYIxuan.courses; 
        let tmpYixuan = [];
        for(let id of yixuanIds){
          let info = await getCourses({ c_id: id});
          tmpYixuan.push({...info.data,c_id:id});
        }
        this.coursesYixuan = tmpYixuan;
      },
      // 搜索
      async searchRes(){
        this.getCoursesKexuan();
      },
      async getApply(){
        let resApply =  await getApplication();
        this.coursesApply = resApply.data;
      },

      // 选课
      async selected(row){
        let res = await chooseCourse({ c_id: row.c_id, operation: 'chose'});
        console.log(res);
        res.result ? this.$message({
          type: 'success',
          message: res.message
        }):this.$message.error(res.message);
        this.getCoursesYixuan();
        this.getCoursesKexuan();
      },
      // 退课
      async quit(row){
        this.$confirm('退课后就选不上了, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await chooseCourse({ c_id: row.c_id, operation: 'quit'});
          res.result ? this.$message({
            type: 'success',
            message: res.message
          }):this.$message.error(res.message);
          this.getCoursesYixuan();
          this.getCoursesKexuan();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退课'
          });          
        });
      },
      // 提交选课申请
      async submitApply(){
        let res = await applyCourse({ c_id: this.application.c_id, reason: this.application.reason});
        res.result ? this.$message({
          type: 'success',
          message: res.message
        }):this.$message.error(res.message);
        this.getApply();
      },
      // 查询成绩
      async searchGrades(){
        let res =[];
        if( this.searchGrade.year === 'all'){
          res = await getGrades({ all:true });
        }else{
          res = await getGrades({ year: this.searchGrade.year, semester: this.searchGrade.semester});
        }
        if(res.result){
          this.coursesGrade = res.data;
        }else{
          this.$message.error(res.message)
        }
      }
  }
}
</script>

<style>
.student{
  margin: 30px;
}
</style>