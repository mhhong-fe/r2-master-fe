<template>
    <div>
        <div class="base-container">
            <div class="title">基础</div>
            <div class="date-range">
                <img src="@/assets/imgs/task/calendar.png" alt="" />
                <span>{{ dateRange }}</span>
            </div>
            <div class="left-date">
                <img src="@/assets/imgs/task/funnel.png" alt="" />
                <span>剩余 {{ leftDate }} 天</span>
            </div>
            <div class="progress">
                <Progress
                    :progress="taskPercent"
                    color="#407fff"
                    :size="20"
                    :stroke="10"
                />
                <div>
                    任务完成 {{ data.completedTasks }} / {{ data.totalTasks }}
                </div>
            </div>
        </div>
        <!-- TODO: 这一段瞎写的 -->
        <div class="progress-container">
            <div class="title">目标进度</div>
            <div class="sub-title">比预期慢50%</div>
            <div class="progress-wrapper">
                <div
                    class="progress-inner"
                    :style="{ width: `${40}%`, backgroundColor: progressColor }"
                ></div>
                <span class="progress-text">{{ data.progress }}%</span>
            </div>
        </div>
        <div class="desc-container">
            <div class="title">备注</div>
            <div class="content">{{ data.description }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Goal } from "./useApi";
import Progress from "@/components/progress.vue";
import dayjs from "dayjs";
const { data } = defineProps<{
    data: Goal;
}>();

const dateRange = computed(() => {
    const startDate = dayjs(data.startDate).format("YYYY 年 MM 月 DD 日");
    const endDate = dayjs(data.endDate).format("YYYY-MM-DD");
    return `${startDate} - ${endDate}`;
});

const taskPercent = computed(() => {
    if (data.completedTasks === 0) {
        return 0;
    }
    return Math.floor((data.completedTasks / data.totalTasks) * 100);
});

const leftDate = computed(() => {
    return dayjs(data.endDate).diff(dayjs(), "day");
});

const progressColor = computed(() => {
    const isSlow = Math.random() < 0.5;
    return "#ff4d4f";
});
</script>

<style scoped lang="scss">
.base-container {
    color: rgba(0, 0, 0, 0.7);
    font-size: 14px;
    background-color: #fff;
    border-radius: 12px;
    padding: 12px;
    margin-top: 24px;

    .title {
        font-size: 16px;
        color: #000;
    }
    .date-range {
        margin-top: 4px;
        display: flex;
        align-items: center;
        gap: 6px;
        img {
            width: 24px;
            height: 26px;
        }
    }

    .left-date {
        margin-top: 6px;
        display: flex;
        align-items: center;
        gap: 8px;
        img {
            width: 20px;
            height: 20px;
            margin-left: 2px;
        }
    }

    .progress {
        margin-top: 12px;
        display: flex;
        gap: 10px;
    }
}

.progress-container {
    background-color: #fff;
    border-radius: 12px;
    padding: 12px;
    margin-top: 24px;
    .title {
        font-size: 16px;
    }

    .sub-title {
        font-size: 13px;
        opacity: 0.5;
        margin-top: 10px;
    }

    .progress-wrapper {
        width: 200px;
        height: 14px;
        background-color: #e2e2e2;
        border-radius: 10px;
        position: relative;
        margin-top: 8px;
        display: flex;
        align-items: center;

        .progress-inner {
            height: 100%;
            background-color: #407fff;
            border-radius: 8px;
            position: absolute;
            left: 0;
            top: 0;
        }
        .progress-text {
            position: absolute;
            right: -30px;
            font-size: 12px;
            color: rgba(0, 0, 0, 0.5);
        }
    }
}

.desc-container {
    background-color: #fff;
    border-radius: 12px;
    padding: 12px;
    margin-top: 24px;
    .content {
        margin-top: 12px;
        font-size: 14px;
        opacity: 0.7;
    }
}
</style>
