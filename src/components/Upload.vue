<template>
  <div class="upload">
        <el-upload
        class="upload-demo"
        ref="upload"
        :action="path"
        :multiple="false"
        :file-list="fileList"
        :auto-upload="false"
        :on-success="handleSuccess"
        >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="upload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传csv文件，且不超过2048kb</div>
        </el-upload>
  </div>
</template>

<script>
import {uploadStudentInfo, uploadTeacherInfo, uploadCourseInfo,} from '../api/getData'

export default {
    name: 'Upload',
    props: {
        path: String,
    },
    data(){
        return{
            fileList:[],
        }
    },

    // created(){
    //     console.log("path"+ this.path)
    // },
    methods: {
        upload(){
            this.$refs.upload.submit();
        },
        handleSuccess(res){
            console.log(res);
            let message = '';
            for(let mes of res.message){
                message += mes+'<br/>';
            }
            this.$message({
                title: '提示',
                dangerouslyUseHTMLString: true,
                message: message,
                duration: 0,
                showClose: true
            });
        }
    }
}
</script>

<style>
.upload{
    margin: 50px;
}
</style>