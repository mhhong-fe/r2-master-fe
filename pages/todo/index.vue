<template>
    <div class="container">
        <DateSelect @change="refreshDate" />
        <TodoCard :date="date" :key="date"></TodoCard>
        <!-- <div class="footer-menu">
            <div>日目标</div>
            <div>1122</div>
            <div>2233</div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import TodoCard from "./components/todo-card.vue";
import DateSelect from "./components/date-select.vue";
definePageMeta({
    name: "todo",
    layout: "default",
});

useHead({
    title: "每日todo",
    meta: [
        // webapp，隐藏地址栏
        { name: "apple-mobile-web-app-capable", content: "yes" },
        // 地址栏颜色
        {
            name: "apple-mobile-web-app-status-bar-style",
            content: "black-translucent",
        },
        // 禁止缩放
        {
            name: "viewport",
            content:
                "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
        },
    ],
});

const date = ref(dayjs().format("YYYY-MM-DD"));

const refreshDate = (newDate: string) => {
    date.value = newDate;
};
</script>

<style scoped lang="scss">
.container {
    max-width: 440px;
    margin: 0 auto;
    background-color: #fafafa;
    padding: 12px;
    height: 100dvh;
}

.footer-menu {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    background-color: #e2e2e2;
    height: 56px;
    line-height: 56px;
}
</style>
