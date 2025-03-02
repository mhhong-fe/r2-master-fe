<template>
    <div class="card">
        <div class="todo-list">
            <div v-for="item in todoList" :key="item.content" class="todo-item">
                <el-checkbox v-model="item.checked">
                    <span>{{ item.content }}</span>
                </el-checkbox>
                <div class="todo-right">
                    <div class="todo-tag">{{ item.tag }}</div>
                    <div class="edit-btn" @click="openDialog(item)">
                        <el-icon><ElIconOperation /></el-icon>
                    </div>
                </div>
            </div>
        </div>
        <div class="add-btn" @click="openDialog">
            <el-icon><ElIconPlus /></el-icon>
        </div>
        <el-dialog
            v-model="dialogVisible"
            :show-close="false"
            align-center
            title="create todo"
            class="todo-dialog"
        >
            <el-form>
                <el-form-item label="内容">
                    <el-input v-model="todoItem.content" />
                </el-form-item>
                <el-form-item label="标签">
                    <el-input v-model="todoItem.tag" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="addTodo">保存</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ElIconOperation, ElIconPlus } from "#components";

interface TodoItem {
    checked: boolean;
    content: string;
    tag: string;
}

const props = defineProps<{
    date: string;
}>();

const todoList = ref<TodoItem[]>([
    {
        checked: false,
        content: "读书半小时",
        tag: "读书",
    },
    {
        checked: false,
        content: "读书半小时",
        tag: "读书",
    },
]);

const dialogVisible = ref(false);

const todoItem = ref({
    content: "",
    tag: "",
});

const isEdit = ref(false);
const defaultTodo = {
    content: "",
    tag: "",
};

const openDialog = (item = defaultTodo) => {
    isEdit.value = !!item?.content;
    todoItem.value = isEdit.value ? { ...item } : { content: "", tag: "" };
    dialogVisible.value = true;
};

const addTodo = () => {
    if (!todoItem.value.content) {
        ElMessage.error("内容不能为空");
        return;
    }
    todoList.value.push({
        checked: false,
        content: todoItem.value.content,
        tag: todoItem.value.tag,
    });

    dialogVisible.value = false;
};

onMounted(() => {
    // todoList.value = props.todoInfo.items;
});
</script>

<style scoped lang="scss">
.card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    // padding: 12px 0;
    border: 1px solid #e8e8e8;
    // box-shadow: 0px 2px 10px #e8e8e8;
    border-radius: 8px;
    margin-top: 10px;
    background-color: #fff;

    .date {
        text-align: center;
        font-weight: bold;
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
}

:deep(.el-dialog) {
    width: calc(100vw - 80px);

    .el-dialog__header {
        display: flex;
        justify-content: center;
        font-weight: bold;
    }
}

.el-dialog.todo-dialog {
    width: calc(100vw - 80px);
}
</style>
