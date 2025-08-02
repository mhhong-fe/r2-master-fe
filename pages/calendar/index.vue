<template>
    <div class="calendar-container">
        <!-- 头部年份选择器 -->
        <div class="header">
            <div class="year-selector">
                <button class="year-btn" @click="changeYear(-1)">
                    <span class="arrow">‹</span>
                </button>
                <div class="current-year">{{ currentYear }}</div>
                <button class="year-btn" @click="changeYear(1)">
                    <span class="arrow">›</span>
                </button>
            </div>
        </div>

        <!-- 月份日历容器 -->
        <div class="months-container">
            <div
                v-for="monthData in monthsData"
                :key="monthData.month"
                class="month-block"
            >
                <div class="month-header">
                    <h3 class="month-title">{{ monthData.monthName }}</h3>
                    <div class="month-stats">
                        完成任务: {{ monthData.totalTasks }} 个
                    </div>
                </div>

                <div class="month-calendar">
                    <!-- 星期标签 -->
                    <div class="week-labels">
                        <div
                            v-for="day in weekDays"
                            :key="day"
                            class="week-label"
                        >
                            {{ day }}
                        </div>
                    </div>

                    <!-- 日期网格 -->
                    <div class="days-grid">
                        <div
                            v-for="(day, index) in monthData.days"
                            :key="index"
                            class="day-cell"
                            :class="getDayClass(day)"
                            :style="getDayStyle(day)"
                            @click="selectDay(day)"
                        >
                            <span class="day-number" v-if="day.date">{{
                                day.date.getDate()
                            }}</span>
                            <div class="day-tooltip" v-if="day.tooltip">
                                {{ day.tooltip }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 图例 -->
        <div class="legend">
            <div class="legend-text">任务完成情况</div>
            <div class="legend-items">
                <div class="legend-item">
                    <div
                        class="legend-color"
                        style="background-color: #ebedf0"
                    ></div>
                    <span>0</span>
                </div>
                <div class="legend-item">
                    <div
                        class="legend-color"
                        style="background-color: #9be9a8"
                    ></div>
                    <span>1-3</span>
                </div>
                <div class="legend-item">
                    <div
                        class="legend-color"
                        style="background-color: #40c463"
                    ></div>
                    <span>4-6</span>
                </div>
                <div class="legend-item">
                    <div
                        class="legend-color"
                        style="background-color: #30a14e"
                    ></div>
                    <span>7-9</span>
                </div>
                <div class="legend-item">
                    <div
                        class="legend-color"
                        style="background-color: #216e39"
                    ></div>
                    <span>10+</span>
                </div>
            </div>
        </div>

        <!-- 选中日期详情 -->
        <div v-if="selectedDay" class="day-detail">
            <div class="detail-header">
                <h3>{{ formatDate(selectedDay?.date) }}</h3>
                <button class="close-btn" @click="selectedDay = null">×</button>
            </div>
            <div class="detail-content">
                <div class="task-count">
                    完成任务: {{ selectedDay?.count || 0 }} 个
                </div>
                <div
                    class="task-list"
                    v-if="selectedDay?.tasks && selectedDay.tasks.length"
                >
                    <div
                        v-for="task in selectedDay.tasks"
                        :key="task.id"
                        class="task-item"
                    >
                        <div class="task-name">{{ task.name }}</div>
                        <div class="task-time">{{ task.completedAt }}</div>
                    </div>
                </div>
                <div v-else class="no-tasks">暂无任务记录</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "calendar",
    layout: "target",
});

// 类型定义
interface Task {
    id: number;
    name: string;
    completedAt: string;
}

interface TaskData {
    count: number;
    tasks: Task[];
}

interface DayData {
    date?: Date;
    dateStr?: string;
    count?: number;
    tasks?: Task[];
    isEmpty?: boolean;
    tooltip?: string;
}

interface MonthData {
    month: number;
    monthName: string;
    days: DayData[];
    totalTasks: number;
}

// 响应式数据
const currentYear = ref(new Date().getFullYear());
const selectedDay = ref<DayData | null>(null);

// 星期标签
const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
const monthNames = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
];

// 模拟任务数据
const mockTaskData = ref<Record<string, TaskData>>({
    "2025-01-15": {
        count: 5,
        tasks: [
            { id: 1, name: "完成项目文档", completedAt: "14:30" },
            { id: 2, name: "代码审查", completedAt: "16:20" },
            { id: 3, name: "团队会议", completedAt: "10:00" },
            { id: 4, name: "Bug修复", completedAt: "11:45" },
            { id: 5, name: "单元测试", completedAt: "17:30" },
        ],
    },
    "2025-01-20": {
        count: 8,
        tasks: [
            { id: 6, name: "功能开发", completedAt: "09:15" },
            { id: 7, name: "API设计", completedAt: "13:20" },
            { id: 8, name: "数据库优化", completedAt: "15:10" },
        ],
    },
    "2025-02-10": {
        count: 3,
        tasks: [
            { id: 9, name: "前端优化", completedAt: "14:00" },
            { id: 10, name: "性能测试", completedAt: "16:30" },
            { id: 11, name: "部署上线", completedAt: "18:00" },
        ],
    },
    "2025-03-05": {
        count: 12,
        tasks: [
            { id: 12, name: "新功能开发", completedAt: "09:00" },
            { id: 13, name: "代码重构", completedAt: "11:30" },
            { id: 14, name: "测试用例编写", completedAt: "14:15" },
        ],
    },
    "2025-04-12": {
        count: 6,
        tasks: [
            { id: 15, name: "Bug修复", completedAt: "10:20" },
            { id: 16, name: "文档更新", completedAt: "15:45" },
        ],
    },
    "2025-05-20": {
        count: 9,
        tasks: [
            { id: 17, name: "系统升级", completedAt: "08:30" },
            { id: 18, name: "数据迁移", completedAt: "13:00" },
            { id: 19, name: "监控配置", completedAt: "16:20" },
        ],
    },
    "2025-06-08": {
        count: 4,
        tasks: [
            { id: 20, name: "安全审计", completedAt: "11:00" },
            { id: 21, name: "性能优化", completedAt: "14:30" },
        ],
    },
    "2025-07-15": {
        count: 7,
        tasks: [
            { id: 22, name: "新版本发布", completedAt: "09:45" },
            { id: 23, name: "用户培训", completedAt: "13:15" },
            { id: 24, name: "反馈收集", completedAt: "16:00" },
        ],
    },
    "2025-08-22": {
        count: 11,
        tasks: [
            { id: 25, name: "架构重构", completedAt: "08:00" },
            { id: 26, name: "代码审查", completedAt: "10:30" },
            { id: 27, name: "测试执行", completedAt: "14:00" },
        ],
    },
    "2025-09-10": {
        count: 5,
        tasks: [
            { id: 28, name: "功能测试", completedAt: "11:20" },
            { id: 29, name: "文档编写", completedAt: "15:10" },
        ],
    },
    "2025-10-18": {
        count: 8,
        tasks: [
            { id: 30, name: "系统维护", completedAt: "09:30" },
            { id: 31, name: "数据备份", completedAt: "13:45" },
            { id: 32, name: "性能监控", completedAt: "16:30" },
        ],
    },
    "2025-11-25": {
        count: 6,
        tasks: [
            { id: 33, name: "安全更新", completedAt: "10:15" },
            { id: 34, name: "用户支持", completedAt: "14:20" },
        ],
    },
    "2025-12-31": {
        count: 10,
        tasks: [
            { id: 35, name: "年终总结", completedAt: "09:00" },
            { id: 36, name: "计划制定", completedAt: "13:30" },
            { id: 37, name: "团队建设", completedAt: "16:00" },
        ],
    },
});

// 计算月份数据
const monthsData = computed(() => {
    const months: MonthData[] = [];
    const year = currentYear.value;

    for (let month = 0; month < 12; month++) {
        const days: DayData[] = [];
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        let totalTasks = 0;

        // 添加空白天数
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push({ isEmpty: true });
        }

        // 添加该月所有日期
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateStr = formatDateString(date);
            const taskData = mockTaskData.value[dateStr];

            if (taskData) {
                totalTasks += taskData.count;
            }

            days.push({
                date,
                dateStr,
                count: taskData?.count || 0,
                tasks: taskData?.tasks || [],
                isEmpty: false,
                tooltip: taskData
                    ? `${formatDate(date)} - ${taskData.count} 个任务`
                    : formatDate(date),
            });
        }

        months.push({
            month: month + 1,
            monthName: monthNames[month],
            days,
            totalTasks,
        });
    }

    return months;
});

// 方法
const changeYear = (delta: number) => {
    currentYear.value += delta;
};

const getDayClass = (day: DayData) => {
    if (day.isEmpty) return "empty";
    if (day.count === 0) return "level-0";
    if (day.count && day.count <= 3) return "level-1";
    if (day.count && day.count <= 6) return "level-2";
    if (day.count && day.count <= 9) return "level-3";
    return "level-4";
};

const getDayStyle = (day: DayData) => {
    if (day.isEmpty) return {};

    let backgroundColor = "#ebedf0"; // 默认颜色
    if (day.count && day.count > 0) {
        if (day.count <= 3) backgroundColor = "#9be9a8";
        else if (day.count <= 6) backgroundColor = "#40c463";
        else if (day.count <= 9) backgroundColor = "#30a14e";
        else backgroundColor = "#216e39";
    }

    return {
        backgroundColor,
        cursor: day.count && day.count > 0 ? "pointer" : "default",
    };
};

const selectDay = (day: DayData) => {
    if (day.count && day.count > 0) {
        selectedDay.value = day;
    }
};

const formatDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
};
</script>

<style scoped lang="scss">
.calendar-container {
    padding: 16px;
    background-color: #eef1fb;
    min-height: 100vh;
    position: relative;
}

.header {
    margin-bottom: 20px;

    .year-selector {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;

        .year-btn {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
                background: #f5f5f5;
            }

            .arrow {
                font-size: 18px;
                color: #666;
            }
        }

        .current-year {
            font-size: 20px;
            font-weight: 600;
            color: #333;
            min-width: 80px;
            text-align: center;
        }
    }
}

.months-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 20px;

    .month-block {
        background: #fff;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        .month-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 1px solid #eee;

            .month-title {
                margin: 0;
                font-size: 18px;
                color: #333;
                font-weight: 600;
            }

            .month-stats {
                font-size: 14px;
                color: #666;
                background: #f8f9fa;
                padding: 4px 8px;
                border-radius: 4px;
            }
        }

        .month-calendar {
            .week-labels {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 2px;
                margin-bottom: 8px;

                .week-label {
                    font-size: 12px;
                    color: #666;
                    text-align: center;
                    padding: 4px 0;
                }
            }

            .days-grid {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 2px;

                .day-cell {
                    aspect-ratio: 1;
                    border-radius: 4px;
                    position: relative;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    &.empty {
                        background: transparent;
                    }

                    .day-number {
                        font-size: 12px;
                        color: #333;
                        font-weight: 500;
                    }

                    &:hover {
                        transform: scale(1.1);
                        z-index: 10;

                        .day-tooltip {
                            display: block;
                        }
                    }

                    .day-tooltip {
                        display: none;
                        position: absolute;
                        bottom: 100%;
                        left: 50%;
                        transform: translateX(-50%);
                        background: #333;
                        color: #fff;
                        padding: 6px 8px;
                        border-radius: 4px;
                        font-size: 12px;
                        white-space: nowrap;
                        z-index: 100;
                        margin-bottom: 4px;

                        &::after {
                            content: "";
                            position: absolute;
                            top: 100%;
                            left: 50%;
                            transform: translateX(-50%);
                            border: 4px solid transparent;
                            border-top-color: #333;
                        }
                    }
                }
            }
        }
    }
}

.legend {
    background: #fff;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .legend-text {
        font-size: 14px;
        color: #333;
        margin-bottom: 12px;
        font-weight: 500;
    }

    .legend-items {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;

        .legend-item {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 12px;
            color: #666;

            .legend-color {
                width: 12px;
                height: 12px;
                border-radius: 2px;
            }
        }
    }
}

.day-detail {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    max-width: 90vw;
    width: 320px;

    .detail-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid #eee;

        h3 {
            margin: 0;
            font-size: 18px;
            color: #333;
        }

        .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            color: #999;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
                color: #666;
            }
        }
    }

    .detail-content {
        .task-count {
            font-size: 16px;
            color: #666;
            margin-bottom: 16px;
            padding: 8px 12px;
            background: #f8f9fa;
            border-radius: 6px;
        }

        .task-list {
            max-height: 200px;
            overflow-y: auto;

            .task-item {
                padding: 8px 0;
                border-bottom: 1px solid #f0f0f0;

                &:last-child {
                    border-bottom: none;
                }

                .task-name {
                    font-size: 14px;
                    color: #333;
                    margin-bottom: 4px;
                }

                .task-time {
                    font-size: 12px;
                    color: #999;
                }
            }
        }

        .no-tasks {
            text-align: center;
            color: #999;
            font-size: 14px;
            padding: 20px 0;
        }
    }
}

// 移动端适配
@media (max-width: 768px) {
    .calendar-container {
        padding: 12px;
    }

    .months-container {
        grid-template-columns: 1fr;
        gap: 16px;

        .month-block {
            padding: 12px;

            .month-header {
                .month-title {
                    font-size: 16px;
                }

                .month-stats {
                    font-size: 12px;
                }
            }

            .month-calendar {
                .days-grid {
                    .day-cell {
                        .day-number {
                            font-size: 11px;
                        }
                    }
                }
            }
        }
    }

    .legend {
        padding: 12px;

        .legend-items {
            gap: 8px;

            .legend-item {
                font-size: 11px;

                .legend-color {
                    width: 10px;
                    height: 10px;
                }
            }
        }
    }

    .day-detail {
        width: 280px;
        padding: 16px;
    }
}

// 平板适配 - 显示两个月
@media (min-width: 769px) and (max-width: 1024px) {
    .months-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

// 桌面端适配 - 显示更多月份
@media (min-width: 1025px) {
    .months-container {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
