<template>
    <div class="card">
        <div class="empty" v-if="loading">加载中...</div>
        <div class="empty" v-else-if="todoList.length === 0">今日无事</div>
        <div v-else class="todo-list">
            <div v-for="item in todoList" :key="item.title" class="todo-item">
                <el-checkbox
                    v-model="item.completed"
                    @change="handleChange(item)"
                    :true-value="1"
                    :false-value="0"
                >
                    <span class="todo-title">{{ item.title }}</span>
                </el-checkbox>
                <div class="todo-right">
                    <div v-if="item.tag" class="todo-tag">
                        {{ item.tag }}
                    </div>
                    <div class="edit-btn" @click="openDialog(item)">
                        <el-icon><Operation /></el-icon>
                    </div>
                    <div class="edit-btn" @click="deleteTodo(item.id)">
                        <el-icon><Delete /></el-icon>
                    </div>
                </div>
            </div>
        </div>
        <div class="add-btn" @click="openDialog">
            <el-icon><Plus /></el-icon>
        </div>
        <el-drawer
            v-model="dialogVisible"
            :show-close="false"
            align-center
            size="300"
            direction="btt"
            title="create todo"
            class="todo-dialog"
        >
            <el-form>
                <el-form-item label="标题">
                    <el-input v-model="todoItem.title" />
                </el-form-item>
                <el-form-item label="标签">
                    <el-input v-model="todoItem.tag" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" @click="addOrEdit">保存</el-button>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { Operation, Plus, Delete } from "@element-plus/icons-vue";

interface TodoItem {
    id: number;
    completed: boolean;
    title: string;
    tag: string;
}

const props = defineProps<{
    date: string;
}>();

const todoList = ref<TodoItem[]>([]);
// for (let i = 0; i < 100; i++) {
//     todoList.value.push({
//         completed: false,
//         content: `todo-${i}`,
//         tag: `tag-${i}`,
//     });
// }

const dialogVisible = ref(false);

// 正在编辑的表单
const todoItem = ref({
    title: "",
    tag: "",
});

const loading = ref(false);

// const isEdit = ref(false);
const editedTodo = ref();
const defaultTodo = {
    tag: "",
    title: "",
};

const openDialog = (item = defaultTodo) => {
    editedTodo.value = item;
    todoItem.value = item ? { ...item } : { ...defaultTodo };
    dialogVisible.value = true;
};

const addOrEdit = async () => {
    if (!todoItem.value.title) {
        ElMessage.error("标题不能为空");
        return;
    }

    const toolApi = editedTodo.value?.id
        ? "/toolApi/todo/edit"
        : "/toolApi/todo/add";
    const reqBody = {
        title: todoItem.value.title,
        tag: todoItem.value.tag,
        date: props.date,
        type: 1,
        id: editedTodo.value.id,
    };
    const res = await fetch(toolApi, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // 添加请求头
        },
        body: JSON.stringify(reqBody),
    }).then((res) => res.json());

    // if (!editedTodo.value) {
    //     todoList.value.push({
    //         completed: false,
    //         ...todoItem.value,
    //         id: res.id,
    //     });
    // } else {
    //     editedTodo.value = { ...todoItem.value, completed: false };
    // }
    init();

    dialogVisible.value = false;
};

const deleteTodo = async (id: number) => {
    console.log({ id });
    await fetch("/toolApi/todo/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // 添加请求头
        },
        body: JSON.stringify({ id }),
    });
    init();
};

const handleChange = async (item: TodoItem) => {
    await fetch("/toolApi/todo/check", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // 添加请求头
        },
        body: JSON.stringify({ id: item.id, completed: item.completed }),
    });
    // init();
};

const init = async () => {
    try {
        loading.value = true;
        const res = await fetch(
            `/toolApi/todo/list?date=${props.date}&type=1`
        ).then((res) => res.json());
        todoList.value = res.data;
    } catch (error) {
    } finally {
        loading.value = false;
    }
};

init();
</script>

<style scoped lang="scss">
.card {
    display: flex;
    flex-direction: column;
    gap: 10px;

    margin-top: 10px;

    // .date {
    //     text-align: center;
    //     font-weight: bold;
    // }
    .empty {
        margin-top: 200px;
        text-align: center;
    }

    .todo-list {
        border: 1px solid #e8e8e8;
        border-radius: 8px;
        background-color: #fff;
    }

    .todo-item {
        display: flex;
        align-items: center;
        // gap: 10px;
        height: 48px;
        font-size: 14px;
        position: relative;
        border-bottom: 1px solid #e8e8e8;
        padding: 0 12px;

        .todo-title {
            color: #606266;
        }

        &:last-child {
            border-bottom: none;
        }

        .todo-right {
            display: flex;
            gap: 10px;
            position: absolute;
            right: 12px;
        }

        .todo-tag {
            font-size: 12px;
            padding: 2px 5px;
            background-color: #53b672;
            border-radius: 5px;
            color: #fff;
        }
    }

    .add-btn {
        position: fixed;
        bottom: 36px;
        right: 24px;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: #407fff;
        color: #fff;
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :deep(.el-drawer) {
        height: 300px;
        .el-drawer__title {
            display: flex;
            justify-content: center;
            font-weight: bold;
            font-size: 18px;
        }
    }
}

.el-dialog.todo-dialog {
    width: calc(100vw - 80px);
}
</style>
