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

<style scoped lang="scss">
.app-container {
    width: 100vw;
    height: 100dvh;
    overflow: hidden;
    background-color: #eef1fb;
    display: flex;
    flex-direction: column;
}

.content {
    flex: 1;
    max-height: calc(100dvh - env(safe-area-inset-bottom) - 52px);
    // overflow: scroll;
}

.footer-container {
    // position: fixed;
    // width: 100%;
    // bottom: 0;
    // left: 0;
    // right: 0;
    height: 52px;
    border-top: 1px solid #ebebeb;
    background-color: #eef1fb;
    padding-bottom: env(safe-area-inset-bottom);
    z-index: 99;
    .footer-menu {
        max-width: 440px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 32px;
        height: 52px;
        line-height: 40px;

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
}
</style>
