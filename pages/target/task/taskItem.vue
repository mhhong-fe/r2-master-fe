<template>
    <div
        :class="[
            'task-item',
            `level-${level}`,
            !task.children?.length && 'leaf-node',
        ]"
    >
        <van-swipe-cell v-for="child in taskList">
            <div
                class="sub-task"
                :class="[`level-${child.level}`, child.isLeaf && 'leaf-node']"
            >
                <div class="checkbox" @click="toggleCheck(child)">
                    <div v-if="!isCompleted(child)" class="unchecked"></div>
                    <img v-else src="@/assets/imgs/task/checked.png" alt="" />
                </div>
                <span>{{ child.name }}</span>
                <span class="task-meta">分值：{{ child.score }}</span>
                <span class="progress">进度：{{ child.progress }}</span>
            </div>
            <template #right>
                <div class="right-area">
                    <div class="btn add-btn" @click="handleAdd(child)">
                        <img src="@/assets/imgs/target/plus.png" alt="" />
                    </div>
                    <div class="btn edit-btn" @click="handleEdit(child)">
                        <img src="@/assets/imgs/target/edit.png" alt="" />
                    </div>
                    <div class="btn delete-btn" @click="handleDelete(child)">
                        <img src="@/assets/imgs/target/delete.png" alt="" />
                    </div>
                </div>
            </template>
        </van-swipe-cell>
    </div>
</template>

<script setup lang="ts">
import type { Task } from "./useApi";

const { task, level } = defineProps<{
    task: {
        id: number;
        name: string;
        type: "goal" | "task";
        completed_tasks: number;
        total_tasks: number;
        children?: any[];
        progress: number;
    };
    level: number;
}>();

const emit = defineEmits(["add", "edit", "delete", "toggleCheck"]);

const taskList = computed(() => {
    let res = [];
    if (task.children?.length) {
        res = JSON.parse(JSON.stringify([task, ...task.children]));
    } else {
        res = JSON.parse(JSON.stringify([task]));
    }
    return res;
});

const isCompleted = (task: Task) => {
    return task.progress >= 100;
};

function toggleCheck(task: Task) {
    if (task.children?.length || !task.isLeaf) {
        showToast("请通过子任务同步进度");
        return;
    }
    emit("toggleCheck", task.id);
}

const handleAdd = (task: Task) => {
    console.log("add");
    emit("add", task.id);
};

const handleEdit = (task: Task) => {
    console.log("edit");
    emit("edit", task.id);
};

const handleDelete = (task: Task) => {
    emit("delete", task.id);
};
</script>

<style scoped lang="scss">
.task-item {
    background-color: #fff;
    margin-left: 0;
    margin-top: 12px;
    border-radius: 8px;
    // padding: 12px;

    :deep(.van-swipe-cell) {
        &:last-child {
            .sub-task {
                border-bottom: 0;
            }
        }
    }

    .sub-task {
        font-size: 14px;
        display: flex;
        padding: 14px 0;
        gap: 8px;
        border-bottom: 1px solid #e2e2e2;
        box-sizing: border-box;

        &:last-child {
            border-bottom: 0;
        }

        // 子任务是从第二级开始的
        &.level-1 {
            margin-left: 12px;
        }

        // 子任务是从第二级开始的
        &.level-2 {
            margin-left: 32px;
        }

        &.level-3 {
            margin-left: 52px;
        }

        &.level-4 {
            margin-left: 72px;
        }

        .checkbox {
            height: 20px;
            div {
                width: 20px;
                height: 20px;
                border: 1px solid #e2e2e2;
                box-sizing: border-box;
            }
            img {
                width: 20px;
                height: 20px;
            }
        }
    }

    .right-area {
        display: flex;
        align-items: center;
        gap: 6px;
        height: 100%;
        padding: 0 24px;
        background-color: #eff1fa;

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

            &.add-btn {
                background-color: #407fff;
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

    // 可继续往下加或用 Sass 循环生成
}
</style>
