<template>
  <Page> 
    <div class="student">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="可选课程" name="first">可选课程
          <el-table
            :data="kexuanData"
            border
            style="width: 100%">
            <el-table-column
              fixed
              prop="c_id"
              label="课程编号"
              width="150">
            </el-table-column>
            <el-table-column
              prop="c_name"
              label="课程名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="c_credit"
              label="学分"
              width="120">
            </el-table-column>
            <el-table-column
              prop="city"
              label="市区"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="300">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="邮编"
              width="120">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small">编辑</el-button>
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
import { login } from '../api/getData'

export default {
  data() {
    return {
      activeName: 'first',
      kexuanData: [],
    };
  },
  created(){
    this.getKexuanCourse();
  },
  components: {
    Page,
  },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      async getKexuanCourse(){
        let result = await this.axios.get();
        let courses = result.courses;
        for(let course of courses){
          let res = await this.axios.get(``);
          this.kexuanData.push({...res.data,c_id: course});
        }
      }
  }
}
</script>

<style>

</style>