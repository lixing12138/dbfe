<template>
    <Page>
        <div class="error Extra large" @click="back">
            未到选课时间
            <br>
            点击回到首页
        </div>
    </Page>
</template>

<script>
import Page from '../components/Page'
export default {
    name: 'Tip',
    components: {
        Page
    },
    methods: {
        back(){
            this.$router.push({ path: 'home'});
        }
    }
}
</script>

<style lang="less" scoped>
    .error{
        margin-top: 200px;
        color: #F56C6C;
        font-size: 100px;
        cursor: pointer;
    }
</style>