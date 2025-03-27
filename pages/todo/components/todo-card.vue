<template>
    <div class="card">
        <div class="empty" v-if="loading">加载中...</div>
        <div class="empty" v-else-if="todoList.length === 0">
            <img :src="EmptyImg" alt="empty" />
            <!-- <div v-if="props.type === TodoType.DAY">当日无事！</div>
            <div v-else-if="props.type === TodoType.WEEK">本周无事！</div>
            <div v-else-if="props.type === TodoType.MONTH">本月无事！</div>
            <div v-else>本年无事！</div> -->
        </div>
        <template v-else>
            <van-progress
                :percentage="progress"
                :pivot-text="pivotText"
                stroke-width="8px"
            />
            <div v-if="uncompletedList.length" class="todo-list">
                <div
                    v-for="item in uncompletedList"
                    :key="item.title"
                    class="todo-item"
                >
                    <van-checkbox
                        v-model="item.completed"
                        @change="handleChange(item)"
                        :true-value="1"
                        :false-value="0"
                    >
                    </van-checkbox>
                    <div class="todo-title" @click="openDialog(item)">
                        <span>{{ item.title }}</span>
                    </div>
                    <div class="todo-right">
                        <div v-if="item.tag" class="todo-tag">
                            {{ item.tag }}
                        </div>
                        <!-- <div class="edit-btn" @click="openDialog(item)">
                            <van-icon name="ellipsis" />
                        </div> -->
                        <div class="edit-btn" @click="deleteTodo(item.id)">
                            <van-icon name="delete-o" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="completedList.length" class="todo-list">
                <div class="title">已完成</div>
                <div
                    v-for="item in completedList"
                    :key="item.title"
                    class="todo-item"
                >
                    <van-checkbox
                        v-model="item.completed"
                        @change="handleChange(item)"
                        :true-value="1"
                        :false-value="0"
                    >
                        <span class="todo-title">{{ item.title }}</span>
                    </van-checkbox>
                    <div class="todo-right">
                        <div v-if="item.tag" class="todo-tag">
                            {{ item.tag }}
                        </div>
                        <div class="edit-btn" @click="openDialog(item)">
                            <van-icon name="ellipsis" />
                        </div>
                        <div class="edit-btn" @click="deleteTodo(item.id)">
                            <van-icon name="delete-o" />
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <van-popup
            v-model:show="dialogVisible"
            position="bottom"
            round
            :style="{ height: '300px', padding: '12px' }"
        >
            <div>
                <div class="add-title">创建todo</div>
                <van-field
                    v-model="todoItem.title"
                    label-width="30"
                    maxlength="12"
                    left-icon="orders-o"
                    label="标题"
                />
                <van-field
                    v-model="todoItem.description"
                    label-width="30"
                    :autosize="{ minHeight: 48, maxHeight: 72 }"
                    show-word-limit
                    maxlength="100"
                    type="textarea"
                    left-icon="orders-o"
                    label="描述"
                />
                <van-field
                    left-icon="notes-o"
                    label-width="30"
                    v-model="todoItem.tag"
                    label="标签"
                />
                <div class="confirm-btn">
                    <van-button
                        round
                        type="success"
                        block
                        size="small"
                        @click="addOrEdit"
                        >添加</van-button
                    >
                </div>
            </div>
        </van-popup>
        <div class="add-btn" @click="openDialog()">
            <van-icon name="plus"></van-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TodoType } from "../type";
import EmptyImg from "@/assets/imgs/empty.webp";

interface TodoItem {
    id: number;
    completed: boolean;
    title: string;
    tag: string;
}

const props = defineProps<{
    date: string;
    type: TodoType;
}>();

const todoList = ref<TodoItem[]>([]);

const completedList = ref<TodoItem[]>([]);
const uncompletedList = ref<TodoItem[]>([]);

const progress = computed(() =>
    ((completedList.value.length * 100) / todoList.value.length).toFixed(1)
);

const pivotText = computed(() => {
    return `${completedList.value.length} / ${todoList.value.length}`;
});

const dialogVisible = ref(false);

// 正在编辑的表单
const todoItem = ref({
    title: "",
    description: "",
    tag: "",
});

const loading = ref(false);

// const isEdit = ref(false);
const editedTodo = ref();
const defaultTodo = {
    tag: "",
    description: "",
    title: "",
};

const openDialog = (item = defaultTodo) => {
    editedTodo.value = item;
    todoItem.value = item ? { ...item } : { ...defaultTodo };
    dialogVisible.value = true;
};

const addOrEdit = async () => {
    if (!todoItem.value.title) {
        showNotify({ message: "标题不能为空" });
        return;
    }

    const toolApi = editedTodo.value?.id
        ? "/toolApi/todo/edit"
        : "/toolApi/todo/add";
    const reqBody = {
        title: todoItem.value.title,
        tag: todoItem.value.tag,
        description: todoItem.value.description,
        date: props.date,
        type: props.type,
        id: editedTodo.value.id,
    };
    const res = await fetch(toolApi, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // 添加请求头
        },
        body: JSON.stringify(reqBody),
    }).then((res) => res.json());

    init();

    dialogVisible.value = false;
};

const deleteTodo = async (id: number) => {
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
    // 完成了当日第一项todo
    if (item.completed && completedList.value.length === 0) {
        showToast("加油，完成了第一项todo💪💪");
    }
    if (
        item.completed &&
        completedList.value.length === todoList.value.length - 1
    ) {
        showToast("🎉🎉太棒了，完成了今天全部的todo🎉🎉");
    }
    await fetch("/toolApi/todo/check", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // 添加请求头
        },
        body: JSON.stringify({ id: item.id, completed: item.completed }),
    });

    setTimeout(() => {
        completedList.value = todoList.value.filter((item) => item.completed);
        uncompletedList.value = todoList.value.filter(
            (item) => !item.completed
        );
    }, 1000);
};

const init = async () => {
    try {
        loading.value = true;
        // const res = await fetch(
        //     `/toolApi/todo/list?date=${props.date}&type=${props.type}`
        // ).then((res) => res.json());
        const res = await useFetch(
            `https://www.mhhong.com/toolApi/todo/list?date=${props.date}&type=${props.type}`
        );
        todoList.value = res?.data.value.data;

        completedList.value = todoList.value.filter((item) => item.completed);
        uncompletedList.value = todoList.value.filter(
            (item) => !item.completed
        );
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
    gap: 20px;

    margin-top: 10px;

    .empty {
        margin-top: 200px;
        text-align: center;
        img {
            width: 200px;
        }
    }

    .todo-list {
        border: 1px solid #e8e8e8;
        border-radius: 8px;
        background-color: #fff;

        .title {
            // font-size: 12px;
            padding: 12px 12px 0 12px;
            color: #606266;
        }
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
            margin-left: 12px;
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
        bottom: 56px;
        right: 24px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #407fff;
        color: #fff;
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :deep(.van-popup) {
        .add-title {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }

        .van-field {
            padding-left: 0;
        }

        .confirm-btn {
            position: fixed;
            bottom: 12px;
            width: calc(100% - 24px);
        }
    }
}
</style>
