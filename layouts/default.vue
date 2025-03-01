<template>
    <div class="app-container">
        <div>Header</div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-container {
    width: 100vw;
    height: 100vh;
    background-color: #fafafa;
    padding: 12px;
}
</style>
