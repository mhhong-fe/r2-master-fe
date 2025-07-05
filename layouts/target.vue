<template>
    <div class="app-container">
        <div class="content">
            <slot />
        </div>
        <div class="footer-container">
            <div class="footer-menu">
                <NuxtLink
                    v-for="item in list"
                    :to="item.route"
                    :key="item.key"
                    :class="item.className"
                >
                    <img
                        v-show="item.key === route.meta.name"
                        :src="item.activeImg"
                        alt=""
                    />
                    <img
                        v-show="item.key !== route.meta.name"
                        :src="item.img"
                        alt=""
                    />
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import TaskImg from "@/assets/imgs/target/task.png";
import TaskActiveImg from "@/assets/imgs/target/task-active.png";
import TargetImg from "@/assets/imgs/target/target.png";
import TargetActiveImg from "@/assets/imgs/target/target-active.png";

const route = useRoute();

const list = [
    {
        route: "/target/list",
        key: "target",
        img: TargetImg,
        activeImg: TargetActiveImg,
        className: "icon target",
        text: "目标",
    },
    {
        route: "/target/task",
        key: "task",
        img: TaskImg,
        activeImg: TaskActiveImg,
        className: "icon day-icon",
        text: "任务",
    },
];
</script>

<style>
body {
    overflow: hidden;
}
</style>

<style scoped>
.app-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #eef1fb;
}

.footer-container {
    position: fixed;
    width: 100%;
    display: flex;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
    border-top: 1px solid #ebebeb;
}

.footer-menu {
    /* width: 100%; */
    max-width: 440px;
    display: flex;
    justify-content: flex-start;
    gap: 80px;
    /* box-shadow: 10px 10px 10px #ebebeb; */
    padding: 0 20px 12px 20px;
    height: 52px;
    line-height: 40px;
    /* background-color: #fff; */

    a {
        img {
            width: 28px;
            height: 28px;
            margin-top: 6px;
        }

        &.month {
            img {
                width: 24px;
                height: 24px;
                margin-top: 8px;
            }
        }

        &.year {
            img {
                width: 24px;
                height: 24px;
                margin-top: 8px;
            }
        }
        &.data {
            img {
                width: 24px;
                height: 22px;
                margin-top: 8px;
            }
        }

        &.target {
            img {
                width: 24px;
                height: 24px;
                margin-top: 8px;
            }
        }
    }
}
</style>
