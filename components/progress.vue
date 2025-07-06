<template>
    <div class="circle-wrapper" :style="wrapperStyle">
        <svg :width="size" :height="size" viewBox="0 0 100 100">
            <!-- 背景圆环 -->
            <circle
                class="bg"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                :stroke-width="stroke"
            />
            <!-- 彩色进度圆环 -->
            <circle
                class="progress"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                :stroke="color"
                :stroke-width="stroke"
                :stroke-dasharray="dashArray"
                :stroke-dashoffset="dashOffset"
                stroke-linecap="round"
            />
        </svg>
        <!-- <div class="text">{{ progress }}%</div> -->
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    /** 进度值 0–100 */
    progress: { type: Number, default: 0 },
    /** 圆环颜色 */
    color: { type: String, default: "#1989fa" },
    /** 圆环宽度(px) */
    stroke: { type: Number, default: 8 },
    /** 整体尺寸(px) */
    size: { type: Number, default: 120 },
});

// 圆周计算（r=45）
const dashArray = 2 * Math.PI * 45;
const dashOffset = computed(() => {
    const percent = Math.min(Math.max(props.progress, 0), 100);
    return dashArray * (1 - percent / 100);
});

const wrapperStyle = computed(() => ({
    width: `${props.size}px`,
    height: `${props.size}px`,
}));
</script>

<style scoped>
.circle-wrapper {
    position: relative;
    display: inline-block;
}
svg {
    transform: rotate(-90deg);
}
.bg {
    stroke: #e2e2e2;
}
.progress {
    transition: stroke-dashoffset 0.5s ease;
}
.text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    font-size: 16px;
    color: #333;
}
</style>
