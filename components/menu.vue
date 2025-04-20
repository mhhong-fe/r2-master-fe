<template>
    <div class="menu-container">
        <NuxtLink
            class="menu-item"
            v-for="item in menuList"
            :to="item.route"
            :key="item.route"
            :class="{
                selected: selectedMenu === item.route,
                [item.className]: true,
            }"
            @click="handleClick(item.route)"
        >
            <span class="menu-item-inner">
                <img class="menu-icon" :src="item.icon" alt="" />
                <span>{{ item.text }}</span>
            </span>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import LoadingImg from "@/assets/imgs/demo/loading.png";
import ClipImg from "@/assets/imgs/demo/merge.webp";
import HeapMapImg from "@/assets/imgs/demo/heap-map.webp";

const menuList = [
    {
        text: "Loading动画",
        icon: LoadingImg,
        route: "/demo/loading",
        className: "loading",
    },
    {
        text: "图片裁剪与合成",
        icon: ClipImg,
        route: "/demo/clip",
        className: "clip",
    },
    {
        text: "热力图组件",
        icon: HeapMapImg,
        route: "/demo/heap-map",
        className: "heap-map",
    },
];

const selectedMenu = ref("/demo/loading");

const handleClick = (route: string) => {
    selectedMenu.value = route;
};
</script>

<style scoped lang="scss">
.menu-container {
    padding: 16px;
}

.menu-item {
    color: #ffffffb3;
    font-size: 14px;
    font-weight: 500;
    height: 48px;
    display: flex;
    width: 100%;
    justify-content: left;
    align-items: center;
    padding-left: 24px;
    cursor: pointer;
    text-decoration: none;

    &.selected {
        background-color: #1c1c1d;
        border-radius: 24px;
        color: #fff;

        .menu-item-inner .menu-icon {
            opacity: 1;
        }
    }

    &.clip {
        .menu-item-inner {
            gap: 3px;
            .menu-icon {
                width: 20px;
                height: 20px;
            }
        }
    }

    .menu-item-inner {
        display: flex;
        align-items: center;
        gap: 6px;
        .menu-icon {
            width: 16px;
            height: 16px;
            opacity: 0.5;
        }
    }
}
</style>
