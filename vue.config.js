module.exports = {
    devServer: {
        // host: 'localhost',
        host: "0.0.0.0",
        port: 9000, // 端口号
        // https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器  http://172.11.11.22:8888/rest/XX/ 
        // hotOnly: true, // 热更新
        proxy: 'http://192.168.43.213:8080' // 配置跨域处理,只有一个代理
            // proxy: 'http://localhost'
            // proxy: { //配置自动启动浏览器
            //     "/api*": {
            //         target: "10.188.215.166:80",
            //         changeOrigin: true,
            //         // ws: true,//websocket支持
            //         secure: false,
            //         pathRewrite: {
            //             '^/api': ''
            //         }
            //     }
            // }
    }
};