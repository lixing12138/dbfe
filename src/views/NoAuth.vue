<template>
    <Page>
        <div class="error Extra large">
            401 Unauthorized
        </div>
    </Page>
</template>

<script>
import Page from '../components/Page'
export default {
    name: 'NoAuth',
    components: {
        Page
    }
}
</script>

<style lang="less" scoped>
    .error{
        margin-top: 200px;
        color: #F56C6C;
        font-size: 100px;
    }
</style>