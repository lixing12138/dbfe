<template>
  <Page> 
    <div class="student" v-loading="loading">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="可选课程" name="first">
          <el-table
            :data="coursesSeleted"
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
              width="200">
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
                <el-button @click="applyCourse(scope.row)" type="text" size="small">选课</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="我的课程" name="second">我的课程</el-tab-pane>
        <el-tab-pane label="选课申请" name="third">选课申请</el-tab-pane>
        <el-tab-pane label="成绩查询" name="fourth">成绩查询</el-tab-pane>
      </el-tabs>
    </div>
  </Page>
</template>

<script>
import Page from '../components/Page'
import { getCourses, chooseCourse } from '../api/getData'

export default {
  data() {
    return {
      activeName: 'first',
      coursesSeleted: [],
      loading: true,
    };
  },
  created(){
    this.getCoursesData();
    this.loading = false;
  },
  components: {
    Page,
  },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },

      async getCoursesData(){
        let res = await getCourses({ choose: false});
        let courseIds = res.courses; 
        let tmpData = [];
        for(let id of courseIds){
          let info = await getCourses({ c_id: id});
          tmpData.push({...info.data,c_id:id});
        }
        this.coursesSeleted = tmpData;
      },
      async applyCourse(row){
        let res = await chooseCourse({ c_id: row.c_id, operation: 'chose'});
        console.log(res);
        res.result ? this.$message({
          type: 'success',
          message: res.message
        }):this.$message.error(res.message);
      }
  }
}
</script>

<style>

</style>