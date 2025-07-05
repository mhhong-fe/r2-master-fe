// composables/useTasks.ts
export function useTasks() {
    const apiBase = "http://localhost:4000/tasks";

    // 创建任务
    const createTask = async (task: any) => {
        const { data, error } = await useFetch(`${apiBase}/create`, {
            method: "POST",
            body: task,
        });

        return { data, error };
    };

    // 查询单个任务
    const getTask = async (id: number) => {
        const { data, error } = await useFetch(`${apiBase}/get/${id}`);
        return { data, error };
    };

    // 更新任务
    const updateTask = async (task: any) => {
        const { data, error } = await useFetch(`${apiBase}/update`, {
            method: "POST",
            body: task,
        });
        return { data, error };
    };

    // 删除任务
    const deleteTask = async (id: number) => {
        const { data, error } = await useFetch(`${apiBase}/delete/${id}`, {
            method: "POST",
        });
        return { data, error };
    };

    // 查询某目标下一级任务
    const getTasksByGoal = async (goalId: number) => {
        const { data, error } = await useFetch(
            `${apiBase}/goal/${goalId}/tasks`
        );
        return { data, error };
    };

    // 获取所有目标
    const getAllGoals = async () => {
        console.log("----- get -----");
        const { data, error } = await useFetch(`${apiBase}/goals`);
        console.log({ data, error });
        return { data, error };
    };

    return {
        getAllGoals,
        createTask,
        getTask,
        updateTask,
        deleteTask,
        getTasksByGoal,
    };
}
