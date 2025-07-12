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
import TargetImg from "@/assets/imgs/layout/target.png";
import TargetActiveImg from "@/assets/imgs/layout/target-active.png";
import HomeImg from "@/assets/imgs/layout/home.png";
import HomeActiveImg from "@/assets/imgs/layout/home-active.png";
import CalendarImg from "@/assets/imgs/layout/date.png";
import CalendarActiveImg from "@/assets/imgs/layout/date-active.png";
import HistoryImg from "@/assets/imgs/layout/history.png";
import HistoryActiveImg from "@/assets/imgs/layout/history-active.png";

const route = useRoute();
const list = [
    {
        route: "/home",
        key: "home",
        img: HomeImg,
        activeImg: HomeActiveImg,
        className: "icon home",
        text: "主页",
    },
    {
        route: "/target/list",
        key: "target",
        img: TargetImg,
        activeImg: TargetActiveImg,
        className: "icon target",
        text: "目标",
    },
    {
        route: "/calendar",
        key: "calendar",
        img: CalendarImg,
        activeImg: CalendarActiveImg,
        className: "icon calendar",
        text: "日程",
    },
    {
        route: "/history",
        key: "history",
        img: HistoryImg,
        activeImg: HistoryActiveImg,
        className: "icon history",
        text: "历史",
    },
];
</script>

<!-- <style>
body {
    overflow: hidden;
}
</style> -->

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

        &.target {
            img {
                width: 26px;
                height: 26px;
                margin-top: 8px;
            }
        }
        &.calendar {
            img {
                width: 22px;
                height: 24px;
                margin-top: 8px;
            }
        }
    }
}
</style>
