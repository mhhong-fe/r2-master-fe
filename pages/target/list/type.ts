export interface Target {
    id: number;
    name: string;
    description: string | null;
    progress: number;
    score: number;
    startDate: string | null; // 格式: 'YYYY-MM-DD'
    endDate: string | null; // 格式: 'YYYY-MM-DD'
    createdAt: string; // 格式: 'YYYY-MM-DD'
    updatedAt: string; // 格式: 'YYYY-MM-DD'
    totalTasks: number;
    completedTasks: number;
}
