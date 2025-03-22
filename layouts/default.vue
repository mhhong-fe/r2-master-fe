<template>
    <div class="app-container">
        <div class="content">
            <slot />
        </div>
        <div class="footer-menu">
            <NuxtLink to="/todo/day">日</NuxtLink>
            <NuxtLink to="/todo/week">周</NuxtLink>
            <NuxtLink to="/todo/month">月</NuxtLink>
            <NuxtLink to="/todo/year">年</NuxtLink>
            <NuxtLink to="/todo/data">统计</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const activeTab = ref(1);
</script>

<style scoped>
.app-container {
    width: 100vw;
    /* height: 100vh;
    background-color: #fafafa;
    padding: 12px; */
}

.footer-menu {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ebebeb;
    box-shadow: 10px 10px 10px #ebebeb;
    padding: 0 20px;
    height: 40px;
    line-height: 40px;

    a {
        color: #000;
        &.router-link-active {
            color: #409eff;
        }
    }
}
</style>
