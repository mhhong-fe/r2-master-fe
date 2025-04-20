<template>
    <div class="container">
        <div class="menu">
            <Menu />
        </div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import Menu from "@/components/menu.vue";
</script>

<style scoped lang="scss">
.container {
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: #101011;

    .menu {
        width: 240px;
        border-right: 1px solid hsla(0, 0%, 100%, 0.05);
    }

    .content {
        flex: 1;
    }
}
</style>
