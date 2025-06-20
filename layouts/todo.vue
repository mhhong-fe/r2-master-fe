<template>
    <div class="app-container">
        <div class="content">
            <slot />
        </div>
        <div class="footer-container">
            <div class="footer-menu">
                <NuxtLink
                    v-for="item in list"
                    :to="item.key"
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
import DailyImg from "@/assets/imgs/todo/day.png";
import DailyActiveImg from "@/assets/imgs/todo/day-active.png";
import WeekImg from "@/assets/imgs/todo/week.png";
import WeekImgActive from "@/assets/imgs/todo/week-active.png";
import MonthImg from "@/assets/imgs/todo/month.png";
import MonthAcitiveImg from "@/assets/imgs/todo/month-active.png";
import YearImg from "@/assets/imgs/todo/year.png";
import YearActiveImg from "@/assets/imgs/todo/year-active.png";
import DataImg from "@/assets/imgs/todo/data.png";
import DataActiveImg from "@/assets/imgs/todo/data-active.png";

const route = useRoute();

const list = [
    {
        route: "/todo/day",
        key: "day",
        img: DailyImg,
        activeImg: DailyActiveImg,
        className: "icon day-icon",
    },
    {
        route: "/todo/week",
        key: "week",
        img: WeekImg,
        activeImg: WeekImgActive,
        className: "icon week",
    },
    {
        route: "/todo/month",
        key: "month",
        img: MonthImg,
        activeImg: MonthAcitiveImg,
        className: "icon month",
    },
    {
        route: "/todo/year",
        key: "year",
        img: YearImg,
        activeImg: YearActiveImg,
        className: "icon year",
    },
    {
        route: "/todo/data",
        key: "data",
        img: DataImg,
        activeImg: DataActiveImg,
        className: "icon data",
    },
];
</script>

<style scoped>
.app-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.footer-container {
    position: fixed;
    width: 100%;
    display: flex;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
}

.footer-menu {
    width: 100%;
    max-width: 440px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ebebeb;
    box-shadow: 10px 10px 10px #ebebeb;
    padding: 0 20px 12px 20px;
    height: 52px;
    line-height: 40px;
    background-color: #fff;

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
    }
}
</style>
