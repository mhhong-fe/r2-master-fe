<template>
    <div class="container">
        <div class="header">
            <div class="header-left" @click="handleBack">
                <img src="@/assets/imgs/task/arrow-left.png" alt="" />
            </div>
            <!-- <div class="header-right">
                <img src="@/assets/imgs/task/edit.png" alt="" />
            </div> -->
        </div>
        <div class="title">
            <div class="line"></div>
            <div class="text">{{ targetDetail.name }}</div>
        </div>
        <div class="tab">
            <div
                class="target tab-item"
                :class="{ active: activeTab === TabType.target }"
                @click="handleTabClick(TabType.target)"
            >
                总览
            </div>
            <div
                class="task tab-item"
                :class="{ active: activeTab === TabType.task }"
                @click="handleTabClick(TabType.task)"
            >
                任务
            </div>
        </div>
        <div class="card-container">
            <TargetCard
                v-if="activeTab === TabType.target"
                :data="targetDetail"
            />
            <TaskCard v-else="activeTab === TabType.task" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Tab } from "vant";
import TargetCard from "./targetCard.vue";
import TaskCard from "./taskCard.vue";
import { useTasks, type Goal } from "./useApi";

definePageMeta({
    name: "task",
    layout: "target",
});

useHead({
    title: "每日todo",
    meta: [
        // 禁止缩放
        {
            name: "viewport",
            content:
                "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
        },
    ],
});

enum TabType {
    target = 1,
    task = 2,
}

const { getGoalById } = useTasks();

const route = useRoute();
const router = useRouter();
const activeTab = ref(TabType.target);

const targetDetail = ref({} as Goal);

const handleBack = () => {
    router.back();
};

const handleTabClick = (tab: TabType) => {
    activeTab.value = tab;
    if (tab === TabType.target) {
        init();
    }
};

const init = async () => {
    const detail = await getGoalById(Number(route.params?.id));
    targetDetail.value = detail;
};

init();
</script>

<style scoped lang="scss">
.container {
    padding: 16px 16px;
}
.header {
    width: 100%;
    display: flex;
    // padding: 16px 12px 0 12px;
    justify-content: space-between;
    img {
        width: 22px;
        height: 22px;
    }
    .header-right img {
        width: 20px;
        height: 20px;
    }
}

.title {
    // padding: 12px 16px;
    margin-top: 12px;
    display: flex;
    align-items: center;
    .line {
        width: 4px;
        height: 20px;
        background-color: #407fff;
        border-radius: 4px;
    }
    .text {
        margin-left: 8px;
        font-weight: 480;
    }
}

.tab {
    // width: calc(100% - 24px);
    // margin: 8px 12px 0;
    margin-top: 16px;
    height: 40px;
    border-radius: 8px;
    background-color: #dde1ec;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3px;
    font-size: 14px;

    .tab-item {
        width: 48%;
        text-align: center;
        height: 100%;
        display: flex;
        border-radius: 8px;
        justify-content: center;
        align-items: center;
        // transition: background-color 0.2s linear;

        &.active {
            background-color: #fff;
            color: #407fff;
        }
    }
}
</style>
