// composables/useTasks.ts

export interface Goal {
    id: number;
    name: string;
    description?: string;
    progress: number;
    score: number;
    startDate?: string;
    endDate?: string;
    createdAt: string;
    updatedAt: string;
    totalTasks: number;
    completedTasks: number;
}

export interface Task {
    id: number;
    parentId: number | null;
    rootId: number | null;
    name: string;
    description?: string;
    type: "task";
    progress: number;
    score: number;
    startDate?: string;
    endDate?: string;
    createdAt: string;
    updatedAt: string;
    children?: Task[]; // 嵌套子任务
}

const apiBase = "https://mhhong.com/toolApi/tasks";

export const useTasks = () => {
    // ✅ 获取目标详情（仅限 type = 'goal'）
    const getGoalById = async (id: number): Promise<Goal> => {
        return await $fetch(`${apiBase}/goalDetail`, {
            method: "POST",
            body: { id },
        });
    };

    // ✅ 获取某目标下的一级任务
    const getTasksByGoal = async (goalId: number): Promise<Task[]> => {
        return await $fetch(`${apiBase}/goal/${goalId}/tasks`);
    };

    // ✅ 获取单个任务（也可以是子任务）
    const getTask = async (id: number): Promise<Task> => {
        return await $fetch(`${apiBase}/${id}`);
    };

    // ✅ 获取某个任务的子任务
    const getSubTasks = async (parentId: number): Promise<Task[]> => {
        return await $fetch(`${apiBase}/task/${parentId}/children`);
    };

    // ✅ 创建任务 / 目标（后端通过 type 字段判断）
    const createTask = async (payload: Partial<Task | Goal>) => {
        return await $fetch(`${apiBase}/create`, {
            method: "POST",
            body: payload,
        });
    };

    // ✅ 更新任务
    const updateTask = async (payload: Partial<Task | Goal>) => {
        return await $fetch(`${apiBase}/update`, {
            method: "POST",
            body: payload,
        });
    };

    // ✅ 删除任务（后端如需删除其子任务，需自行递归或设置级联删除逻辑）
    const deleteTask = async (id: number) => {
        return await $fetch(`${apiBase}/delete`, {
            method: "POST",
            body: { id },
        });
    };

    return {
        getGoalById,
        getTasksByGoal,
        getTask,
        getSubTasks,
        createTask,
        updateTask,
        deleteTask,
    };
};
