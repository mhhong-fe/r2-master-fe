<template>
    <div class="container">
        <div class="header">
            <div @click="getPrevWeek">
                <van-icon name="arrow-left" />
            </div>
            <div>{{ `${date} ~ ${endOfWeek}` }}</div>
            <div @click="getNextWeek">
                <van-icon name="arrow" />
            </div>
        </div>
        <TodoCard :date="date" :key="date" :type="TodoType.WEEK"></TodoCard>
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
const date = ref(dayjs().startOf("week").add(1, "day").format("YYYY-MM-DD"));
const endOfWeek = computed(() => {
    return dayjs(date.value).endOf("week").add(1, "day").format("YYYY-MM-DD");
});

const getPrevWeek = () => {
    date.value = dayjs(date.value).subtract(7, "day").format("YYYY-MM-DD");
};

const getNextWeek = () => {
    date.value = dayjs(date.value).add(7, "day").format("YYYY-MM-DD");
};
</script>

<style scoped lang="scss">
.container {
    max-width: 440px;
    margin: 0 auto;
    background-color: #fafafa;
    padding: 12px;
    height: calc(100dvh - 52px);

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        font-weight: 600;
    }
}
</style>
