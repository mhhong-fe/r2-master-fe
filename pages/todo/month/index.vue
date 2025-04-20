<template>
    <div class="container">
        <div class="header">
            <div @click="getPrevMonth">
                <van-icon name="arrow-left" />
            </div>
            <div>{{ date }}</div>
            <div @click="getNextMonth">
                <van-icon name="arrow" />
            </div>
        </div>
        <TodoCard :date="date" :key="date" :type="TodoType.MONTH"></TodoCard>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import TodoCard from "../components/todo-card.vue";
import { TodoType } from "../type";

definePageMeta({
    name: "month",
    layout: "todo",
});

useHead({
    title: "每日todo",
    meta: [
        // 禁止缩放
        {
            name: "viewport",
            content:
                "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
        },
    ],
});

// 当前周的周一，指代本周
const date = ref(dayjs().startOf("month").format("YYYY-MM"));

const getPrevMonth = () => {
    date.value = dayjs(date.value).subtract(1, "month").format("YYYY-MM");
};

const getNextMonth = () => {
    date.value = dayjs(date.value).add(1, "month").format("YYYY-MM");
};

const refreshDate = (newDate: string) => {
    date.value = newDate;
};
</script>

<style scoped lang="scss">
.container {
    max-width: 440px;
    margin: 0 auto;
    // background-color: #fafafa;
    padding: 12px;
    // height: calc(100dvh - 52px);

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        font-weight: 600;
    }
}
</style>
