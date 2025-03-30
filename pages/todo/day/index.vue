<template>
    <div class="container">
        <DateSelect @change="refreshDate" />
        <TodoCard :date="date" :key="date" :type="TodoType.DAY"></TodoCard>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import TodoCard from "../components/todo-card.vue";
import DateSelect from "../components/date-select.vue";
import { TodoType } from "../type";
definePageMeta({
    name: "day",
    layout: "default",
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

const date = ref(dayjs().format("YYYY-MM-DD"));

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
}
</style>
