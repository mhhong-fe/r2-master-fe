<template>
    <van-popup
        v-model:show="visible"
        position="bottom"
        round
        :style="{ height: '400px', padding: '12px' }"
    >
        <div class="title">{{ isEdit ? "编辑目标" : "增加目标" }}</div>
        <div>
            <van-field
                v-model="formData.name"
                label-width="60"
                label-align="right"
                maxlength="16"
                label="名称"
                autocomplete="false"
            />
            <van-field
                v-model="formData.description"
                label-width="60"
                show-word-limit
                maxlength="100"
                type="textarea"
                label="描述"
                label-align="right"
            />
            <van-field
                readonly
                clickable
                label-width="60"
                name="date"
                label="开始日期"
                v-model="formData.startDate"
                placeholder="选择日期"
                @click="showStartPicker = true"
            />
            <van-popup v-model:show="showStartPicker" position="bottom">
                <van-date-picker
                    v-model="formData.startDateArr"
                    type="date"
                    title="开始日期"
                    :min-date="new Date()"
                    @confirm="onStartConfirm"
                    @cancel="showStartPicker = false"
                />
            </van-popup>
            <van-field
                readonly
                clickable
                label-width="60"
                name="date"
                label="结束日期"
                v-model="formData.endDate"
                placeholder="选择日期"
                @click="showEndPicker = true"
            />
            <van-popup v-model:show="showEndPicker" position="bottom">
                <van-date-picker
                    v-model="formData.endDateArr"
                    type="date"
                    title="开始日期"
                    :min-date="new Date()"
                    @confirm="onEndConfirm"
                    @cancel="showEndPicker = false"
                />
            </van-popup>
            <div class="confirm-btn">
                <van-button round type="primary" block @click="addOrEdit">
                    添加
                </van-button>
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useTasks } from "./useTask";

const visible = defineModel<boolean>();

const props = defineProps<{
    data: any;
}>();

const emits = defineEmits<{
    refresh: [];
}>();

const {
    createTask,
    getTask,
    updateTask,
    deleteTask,
    getTasksByGoal,
    getAllGoals,
} = useTasks();

const formData = ref({
    name: "",
    description: "",
    startDateArr: [],
    startDate: "",
    endDateArr: [],
    endDate: "",
});

const showStartPicker = ref(false);
const showEndPicker = ref(false);

const isEdit = computed(() => props.data.id);

const onStartConfirm = (val) => {
    console.log(val);
    formData.value.startDate = val.selectedValues.join("-");
    showStartPicker.value = false;
};

const onEndConfirm = (val) => {
    console.log(val);
    formData.value.endDate = val.selectedValues.join("-");
    showEndPicker.value = false;
};

const addOrEdit = async () => {
    if (
        !formData.value.name ||
        !formData.value.startDateArr ||
        !formData.value.endDateArr
    ) {
        showToast("缺少必填字段");
    }
    console.log({ props, isEdit });
    const api = isEdit.value ? updateTask : createTask;
    const res = await api({
        ...formData.value,
        startDateArr: undefined,
        endDateArr: undefined,
        type: "goal",
    });
    visible.value = false;
    emits("refresh");
};

watch(visible, (val) => {
    if (val && props.data.id) {
        formData.value = {
            ...props.data,
            startDateArr: props.data.startDate.split("-"),
            endDateArr: props.data.endDate.split("-"),
        };
    }
});
</script>

<style scoped lang="scss">
.title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
}
.confirm-btn {
    margin-top: 24px;
}
</style>
