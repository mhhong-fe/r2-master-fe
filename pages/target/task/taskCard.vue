<template>
    <div class="task-container">
        <div class="todo-container">
            <div>待办任务</div>
            <div class="todo-list">
                <TaskItem
                    v-for="task in taskTree"
                    :key="task.id"
                    :task="task"
                    :level="0"
                    @update="handleTaskUpdate"
                    @add="(id) => handleAdd(id)"
                    @edit="(id) => handleEdit(id)"
                    @delete="(id) => handleDelete(id)"
                    @toggle-check="(id) => handleToggleCheck(id)"
                />
            </div>
        </div>
        <van-button
            @click="openEditPop({}, Number(route.params.id))"
            type="primary"
            class="add-btn"
        >
            <img src="@/assets/imgs/target/plus.png" alt="" />
        </van-button>
        <EditPop
            v-model="editPopVisible"
            :data="selectedGoal"
            :parent-id="editId"
            @refresh="getTaskList"
        />
    </div>
</template>

<script setup lang="ts">
import EditPop from "./editPop.vue";
import { useTasks, type Task } from "./useApi";
import { type Goal } from "./useApi";
import TaskItem from "./taskItem.vue";
import Id from "./[id].vue";

const editPopVisible = ref(false);

const { getTasksByGoal, updateTask, deleteTask } = useTasks();
const taskList = ref([] as Task[]);
const selectedGoal = ref({});

const route = useRoute();
const editId = ref(0);

const openEditPop = (item: Goal | {}, id: number) => {
    console.log({ item });
    selectedGoal.value = item;
    editPopVisible.value = true;
    editId.value = id;
};

const getTaskList = async () => {
    try {
        const res = await getTasksByGoal(Number(route.params.id));
        console.log({ res });
        taskList.value = res;
    } catch (error) {
        console.error(error);
    }
};

const taskTree = computed(() =>
    buildTree(taskList.value || [], Number(route.params.id))
);

function buildTree(tasks: any[], goalId: number) {
    const map = new Map<number, any>();
    const childrenMap = new Map<number, any[]>();

    /* ---------- 1. 预处理：构建索引 ---------- */
    tasks.forEach((task) => {
        task.children = [];
        map.set(task.id, task);

        if (!childrenMap.has(task.parentId)) {
            childrenMap.set(task.parentId, []);
        }
        childrenMap.get(task.parentId)!.push(task);
    });

    const result: any[] = [];

    /* ---------- 2. 找到一级任务（parentId === goalId） ---------- */
    const firstLevelTasks = childrenMap.get(goalId) || [];

    firstLevelTasks.forEach((task) => {
        task.level = 1;

        const flatChildren: any[] = [];

        /* ---- 2.1 深度优先收集所有子孙任务，并标记 level / isLeaf ---- */
        const collectChildren = (parent: any, currentLevel: number) => {
            const children = childrenMap.get(parent.id) || [];
            children.forEach((child) => {
                child.level = currentLevel;
                /* ✅ 是否叶子：查 childrenMap 中是否还有子列表 */
                child.isLeaf = !(childrenMap.get(child.id)?.length > 0);
                flatChildren.push(child);
                collectChildren(child, currentLevel + 1);
            });
        };

        collectChildren(task, 2); // 子任务从 level 2 开始
        task.children = flatChildren;

        /* ---- 2.2 统计数量 ---- */
        task.totalTasks = flatChildren.length;
        task.completedTasks = flatChildren.filter(
            (t) => t.progress >= 100
        ).length;

        /* ✅ 一级任务也需要 isLeaf 字段 */
        task.isLeaf = flatChildren.length === 0;

        result.push(task);
    });

    console.log({ result });
    return result;
}

const handleAdd = (id: number) => {
    console.log({ id });
    openEditPop({}, id);
};

const handleEdit = (id: number) => {
    const selectedGoal = taskList.value.find((item) => item.id === id) || {};
    openEditPop(selectedGoal, id);
};

function handleTaskUpdate(id: number, done: boolean) {
    console.log("更新任务", id, "是否完成:", done);
    // TODO: 调用 API 同步状态
}

const handleDelete = async (id: number) => {
    await deleteTask(id);
    getTaskList();
};

const handleToggleCheck = async (id: number) => {
    const selectedTask = taskList.value.find((item) => item.id === id);
    if (!selectedTask) {
        showToast("勾选错误");
        return;
    }
    await updateTask({
        id: selectedTask.id,
        score: selectedTask.score,
        progress: selectedTask.progress >= 100 ? 0 : 100,
    });
    getTaskList();
};

getTaskList();
</script>

<style scoped lang="scss">
.todo-container {
    .todo-item {
        background-color: #fff;
        border-radius: 12px;
        padding: 12px;
        margin-top: 24px;
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
