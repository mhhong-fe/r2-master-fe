<template>
    <div class="container">
        <div class="title">目标列表</div>
        <div class="target-list">
            <van-swipe-cell v-for="item in list" :key="item.id">
                <van-cell :border="false">
                    <div class="target-item" @click="jumpToDetail(item)">
                        <div class="title-line">
                            <div class="target-title">
                                {{ item.name }}
                            </div>
                            <div class="left-date">
                                剩余
                                {{ dayjs(item.endDate).diff(dayjs(), "day") }}
                                d
                            </div>
                        </div>
                        <div class="target-num">
                            任务完成 {{ item.completedTasks }} /
                            {{ item.totalTasks }}
                        </div>
                        <div class="progress-wrapper">
                            <div
                                class="progress-inner"
                                :style="{ width: `${item.progress}%` }"
                            ></div>
                            <span class="progress-text"
                                >{{ item.progress }}%</span
                            >
                        </div>
                    </div>
                </van-cell>
                <template #right>
                    <div class="right-area">
                        <div class="btn edit-btn" @click="openEditPop(item)">
                            <img src="@/assets/imgs/target/edit.png" alt="" />
                        </div>
                        <div class="btn delete-btn" @click="handleDelete(item)">
                            <img src="@/assets/imgs/target/delete.png" alt="" />
                        </div>
                    </div>
                </template>
            </van-swipe-cell>
            <van-button @click="openEditPop({})" type="primary" class="add-btn">
                <img src="@/assets/imgs/target/plus.png" alt="" />
            </van-button>
        </div>
    </div>
    <EditPop v-model="editPopVisible" :data="selectedGoal" @refresh="refresh" />
</template>

<script setup lang="ts">
import EditPop from "./editPop.vue";
import { useTasks } from "./useTask";
import { type Goal } from "./useTask";
import dayjs from "dayjs";
definePageMeta({
    name: "target",
    layout: "target",
});

useHead({
    title: "每日todo",
    meta: [
        // 禁止缩放
        {
            name: "viewport",
            content:
                "width=device-width, getTargetListial-scale=1.0, maximum-scale=1.0, user-scalable=0",
        },
    ],
});

const {
    createTask,
    getTask,
    updateTask,
    deleteTask,
    getTasksByGoal,
    getAllGoals,
} = useTasks();

const router = useRouter();

const editPopVisible = ref(false);

const list = ref([] as Goal[]);
const selectedGoal = ref({});

const getTargetList = async () => {
    try {
        const res = await getAllGoals();
        console.log({ res });
        list.value = res;
    } catch (error) {
        console.error(error);
    }
};

const openEditPop = (item: Goal) => {
    selectedGoal.value = item;
    editPopVisible.value = true;
};

const handleDelete = async (item: Goal) => {
    if (item.progress > 0) {
        showToast("已关联任务，不允许删除！");
        return;
    }
    console.log({ item });
    await deleteTask(item.id);
    getTargetList();
};

const jumpToDetail = (item: Goal) => {
    router.push(`/target/task/${item.id}`);
};

const refresh = () => {
    getTargetList();
    selectedGoal.value = {};
};

onMounted(() => {
    getTargetList();
});
</script>

<style scoped lang="scss">
.container {
    height: 100vh;
    padding-bottom: 120px;
    overflow-y: scroll;

    .title {
        margin-left: 24px;
        margin-top: 16px;
        margin-bottom: 12px;
        font-size: 30px;
        font-weight: bold;
    }

    :deep(.van-cell) {
        background-color: transparent;
        padding: 8px 16px;

        .van-cell__value {
            text-align: left;

            .target-item {
                // margin: 0 12px;
                padding: 16px 20px;
                border-radius: 16px;
                background-color: #fff;

                .title-line {
                    display: flex;
                }

                .target-title {
                    color: #000;
                    font-size: 16px;
                    flex: 1;
                }

                .left-date {
                    background-color: #f6f6f6;
                    padding: 2px 8px;
                    border-radius: 14px;
                    font-size: 12px;
                }

                .target-num {
                    font-size: 12px;
                }
                .left-area {
                    flex: 1;
                }
                .progress-wrapper {
                    width: 120px;
                    height: 8px;
                    background-color: #e2e2e2;
                    border-radius: 5px;
                    position: relative;
                    margin-top: 12px;
                    display: flex;
                    align-items: center;
                    .progress-inner {
                        height: 8px;
                        background-color: #407fff;
                        border-radius: 5px;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                    .progress-text {
                        position: absolute;
                        right: -40px;
                        font-size: 12px;
                        color: rgba(0, 0, 0, 0.5);
                    }
                }
            }
        }
    }

    .right-area {
        display: flex;
        align-items: center;
        gap: 6px;
        height: 100%;
        padding-right: 24px;

        .btn {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 20px;
                height: 20px;
            }

            &.edit-btn {
                background-color: #f2aa4b;
            }

            &.delete-btn {
                background-color: #e36041;
            }
        }
        .tag {
            font-size: 12px;
            color: #fff;
            background-color: #407fff;
            padding: 4px 12px;
            border-radius: 12px;
        }
    }
}

.add-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    right: 40px;
    bottom: 100px;

    img {
        width: 30px;
    }
}
</style>
