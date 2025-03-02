<template>
    <div class="container">
        <DateSelect />
        <TodoCard></TodoCard>
    </div>
</template>

<script setup lang="ts">
import TodoCard from "./components/todo-card.vue";
import DateSelect from "./components/date-select.vue";
definePageMeta({
    name: "todo",
    layout: "default",
});

useHead({
    title: "每日todo",
});

const date = ref("");
</script>

<style scoped lang="scss">
.container {
    max-width: 440px;
    height: 100vh;
    margin: 0 auto;
}
</style>
