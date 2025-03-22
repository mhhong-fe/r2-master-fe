// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    app: {
        baseURL: "/tool/",
    },
    devServer: {
        port: 8080, // 自定义开发端口
        host: "0.0.0.0", // 允许外部访问（默认本地 IP）
    },
    modules: ["@vant/nuxt"],
    vant: {
        /** Options */
    },
    css: ["@/assets/styles/index.scss"],
    // 配置 devServer 和 proxy
    nitro: {
        devProxy: {
            "/toolApi": {
                // 匹配的前缀
                target: "http://localhost:4000", // 后端服务器地址
                changeOrigin: true, // 允许跨域
                secure: false, // 如果是 https，需要设置为 false
            },
        },
    },
    // vite相关配置
    vite: {
        css: {
            preprocessorOptions: {
                scss: {},
            },
        },
    },
});
