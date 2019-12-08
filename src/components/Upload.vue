<template>
  <div class="upload">
        <el-upload
        class="upload-demo"
        ref="upload"
        :action="action"
        :multiple="false"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
  </div>
</template>

<script>
export default {
    name: 'Upload',
    props: ['action'],
    data(){
        return{
            fileList:[],
        }
    },
    methods: {
        submitUpload(){
            console.log(this.fileList[0]);

        }
    }
}
</script>

<style>
.upload{
    margin: 50px;
}
</style>