<template>
    <div class="card">
        <div class="todo-list">
            <div v-for="item in todoList" :key="item.title" class="todo-item">
                <el-checkbox v-model="item.checked">
                    <span>{{ item.title }}</span>
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
                <el-button @click="addTodo">保存</el-button>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { ElIconOperation, ElIconPlus } from "#components";

interface TodoItem {
    checked: boolean;
    title: string;
    tag: string;
}

// const props = defineProps<{
//     date: string;
// }>();

const todoList = ref<TodoItem[]>([]);
// for (let i = 0; i < 100; i++) {
//     todoList.value.push({
//         checked: false,
//         content: `todo-${i}`,
//         tag: `tag-${i}`,
//     });
// }

const dialogVisible = ref(false);

const todoItem = ref({
    title: "",
    tag: "",
});

const isEdit = ref(false);
const defaultTodo = {
    tag: "",
    title: "",
};

const openDialog = (item = defaultTodo) => {
    isEdit.value = !!item?.title;
    todoItem.value = isEdit.value
        ? { ...item }
        : { title: "", tag: "", title: "" };
    dialogVisible.value = true;
};

const addTodo = () => {
    if (!todoItem.value.title) {
        ElMessage.error("内容不能为空");
        return;
    }
    todoList.value.push({
        checked: false,
        title: todoItem.value.title,
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
