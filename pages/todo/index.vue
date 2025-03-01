<template>
    <div>
        <div class="card">
            <div class="date">2025-03-01</div>
            <div class="todo-item">
                <el-checkbox></el-checkbox>
                <span>读书半小时</span>
                <span class="todo-tag">读书</span>
            </div>
            <div class="todo-item">
                <el-checkbox></el-checkbox>
                <span>Leetcode</span>
                <span>编程</span>
            </div>
        </div>
        <div>添加</div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "todo",
    layout: "default",
});

useHead({
    title: "每日todo",
});

const todoList = ref([
    {
        date: "2025-03-01",
        items: [
            {
                checked: false,
                content: "读书半小时",
                tag: "读书",
            },
            {
                content: "Leetcode",
                tag: "编程",
            },
        ],
    },
    {
        date: "2025-02-28",
        items: [
            {
                checked: false,
                content: "读书半小时",
                tag: "读书",
            },
            {
                checked: false,
                content: "Leetcode",
                tag: "编程",
            },
        ],
    },
]);
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px 0;
    border: 1px solid #e8e8e8;
    box-shadow: 0px 2px 10px #e8e8e8;
    border-radius: 12px;
    margin-top: 10px;
    height: cal;

    .date {
        text-align: center;
        font-weight: bold;
    }

    .todo-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        position: relative;
        border-bottom: 1px solid #e8e8e8;
        padding: 0 12px;
        span {
            opacity: 0.8;
        }

        &:last-child {
            border-bottom: none;
        }
    }

    .todo-tag {
        font-size: 12px;
        padding: 2px 5px;
        background-color: #407fff;
        border-radius: 5px;
        color: #fff;
        position: absolute;
        right: 24px;
    }
}
</style>
