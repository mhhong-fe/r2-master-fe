<template>
    <div>任务管理</div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "task",
    layout: "target",
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
</script>

<style scoped></style>
