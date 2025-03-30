<template>
    <div>
        <div class="header">
            <div @click="getPrevWeek">
                <van-icon name="arrow-left" />
            </div>
            <span>{{ selectedDate }}</span>
            <div @click="getNextWeek">
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="week-list">
            <div v-for="item in daysInWeek" :key="item.key" class="week">
                <span>{{ item.label }}</span>
            </div>
        </div>
        <div class="date-list">
            <div
                v-for="item in daysInWeek"
                class="date"
                :class="{ selected: selectedDate === item.value }"
                @click="handleDateChange(item.value)"
            >
                <span>{{ item.value.slice(-2) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const emit = defineEmits(["change"]);

const daysInWeek = ref([
    { key: 1, label: "一", value: "" },
    { key: 2, label: "二", value: "" },
    { key: 3, label: "三", value: "" },
    { key: 4, label: "四", value: "" },
    { key: 5, label: "五", value: "" },
    { key: 6, label: "六", value: "" },
    { key: 7, label: "日", value: "" },
]);

const selectedDate = ref(dayjs().format("YYYY-MM-DD"));

// 获取某一天所在周的日期
const getWeekDatesByDate = (date: string) => {
    const today = dayjs(date);
    // 周日转成7
    const todayKey = today.day() || 7;
    // 获取本周的其他日期
    daysInWeek.value.forEach((item, index) => {
        const distance = todayKey - item.key;
        item.value = today.subtract(distance, "day").format("YYYY-MM-DD");
    });
};

// 获取上一周的日期，上周一被选中
const getPrevWeek = () => {
    const index = daysInWeek.value.findIndex(
        (item) => item.value === selectedDate.value
    );

    const prevWeek = dayjs(selectedDate.value)
        .subtract(7 + index, "day")
        .format("YYYY-MM-DD");
    handleDateChange(prevWeek);
    getWeekDatesByDate(prevWeek);
};

// 获取下一周的日期，下周一被选中
const getNextWeek = () => {
    const index = daysInWeek.value.findIndex(
        (item) => item.value === selectedDate.value
    );

    const nextWeek = dayjs(selectedDate.value)
        .add(7 - index, "day")
        .format("YYYY-MM-DD");
    handleDateChange(nextWeek);
    getWeekDatesByDate(nextWeek);
};

const handleDateChange = (date: string) => {
    selectedDate.value = date;
    emit("change", date);
};

onMounted(() => {
    getWeekDatesByDate(selectedDate.value);
});
</script>

<style scoped>
.header {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.week-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 12px 0;
    font-size: 12px;
    color: #000;
    opacity: 0.5;

    .week {
        width: 24px;
        text-align: center;
    }
}

.date-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
    align-items: center;

    .date {
        width: 24px;
        height: 24px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000;
        border-radius: 50%;
        cursor: pointer;

        &.selected {
            background-color: #407fff;
            color: #fff;
        }
    }
}
</style>
