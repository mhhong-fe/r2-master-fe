// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    devServer: {
        port: 8080, // 自定义开发端口
        host: "0.0.0.0", // 允许外部访问（默认本地 IP）
    },
    modules: ["@element-plus/nuxt"],
    elementPlus: {
        /** Options */
    },
    css: ["@/assets/styles/index.scss"],
    // vite相关配置
    vite: {
        css: {
            preprocessorOptions: {
                scss: {},
            },
        },
    },
});
