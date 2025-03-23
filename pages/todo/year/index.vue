<template>
    <div class="container">
        <div class="header">
            <div @click="getPrevYear">
                <van-icon name="arrow-left" />
            </div>
            <div>{{ date }}</div>
            <div @click="getNextYear">
                <van-icon name="arrow" />
            </div>
        </div>
        <TodoCard :date="date" :key="date" :type="TodoType.YEAR"></TodoCard>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import TodoCard from "../components/todo-card.vue";
import { TodoType } from "../type";

definePageMeta({
    key: (route) => route.fullPath,
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

// 当前周的周一，指代本周
const date = ref(dayjs().startOf("month").format("YYYY"));

const getPrevYear = () => {
    date.value = dayjs(date.value).subtract(1, "year").format("YYYY");
};

const getNextYear = () => {
    date.value = dayjs(date.value).add(1, "year").format("YYYY");
};

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
    height: calc(100dvh - 40px);

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        font-weight: 600;
    }
}
</style>
