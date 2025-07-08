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

const apiBase = "https://mhhong.com/toolApi/tasks";

export const useTasks = () => {
    // 获取所有目标
    const getAllGoals = async (): Promise<Goal[]> => {
        return await $fetch(`${apiBase}/goals`);
    };

    // 获取某目标下的一级任务
    const getTasksByGoal = async (goalId: number) => {
        return await $fetch(`${apiBase}/goal/${goalId}/tasks`);
    };

    // 创建任务或目标
    const createTask = async (payload: any) => {
        return await $fetch(`${apiBase}/create`, {
            method: "POST",
            body: payload,
        });
    };

    // 获取某个任务
    const getTask = async (id: number) => {
        return await $fetch(`${apiBase}/${id}`);
    };

    // 更新任务
    const updateTask = async (payload: any) => {
        return await $fetch(`${apiBase}/update`, {
            method: "POST",
            body: payload,
        });
    };

    // 删除任务
    const deleteTask = async (id: number) => {
        console.log({ id });
        return await $fetch(`${apiBase}/delete`, {
            method: "POST",
            body: { id },
        });
    };

    return {
        getAllGoals,
        getTasksByGoal,
        createTask,
        getTask,
        updateTask,
        deleteTask,
    };
};
