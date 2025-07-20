<template>
    <van-popup
        v-model:show="visible"
        class="task-popup"
        position="bottom"
        round
        :style="{ height: '450px', padding: '12px' }"
    >
        <div class="title">{{ isEdit ? "编辑任务" : "增加任务" }}</div>
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
                v-model="formData.score"
                type="digit"
                :min="0"
                label-width="60"
                label-align="right"
                maxlength="16"
                label="任务分数"
                autocomplete="false"
            />
            <van-field
                v-model="formData.score"
                type="digit"
                :min="0"
                label-width="60"
                label-align="right"
                maxlength="16"
                label="快捷选择"
                autocomplete="false"
            >
                <template #input>
                    <van-radio-group
                        v-model="formData.quickDate"
                        direction="horizontal"
                        @change="handleQuickChange"
                    >
                        <van-radio :name="QuickDate.day">当日</van-radio>
                        <van-radio :name="QuickDate.week">本周</van-radio>
                        <van-radio :name="QuickDate.month">本月</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
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
                    :min-date="new Date()"
                    title="开始日期"
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
            <van-field
                v-model="formData.description"
                label-width="60"
                show-word-limit
                maxlength="100"
                type="textarea"
                label="描述"
                label-align="right"
            />
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
import { useTasks } from "./useApi";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek); // 以周一为一周的开始

enum QuickDate {
    day = 1,
    week = 2,
    month = 3,
}

const visible = defineModel<boolean>();

const props = defineProps<{
    data: any;
    parentId: number;
}>();

const emits = defineEmits<{
    refresh: [];
}>();

const { createTask, updateTask } = useTasks();

const defaultData = {
    name: "",
    description: "",
    startDateArr: [] as string[],
    startDate: "",
    endDateArr: [] as string[],
    endDate: "",
    score: undefined,
    quickDate: 0,
};
const formData = ref({ ...defaultData });

const showStartPicker = ref(false);
const showEndPicker = ref(false);

const isEdit = computed(() => props.data.id);

const onStartConfirm = (val) => {
    formData.value.startDate = val.selectedValues.join("-");
    showStartPicker.value = false;
};

const onEndConfirm = (val) => {
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
    const api = isEdit.value ? updateTask : createTask;
    if (isEdit.value) {
        await updateTask({
            ...formData.value,
            type: "task",
        });
    } else {
        await api({
            ...formData.value,
            type: "task",
            parentId: props.parentId,
        });
    }
    visible.value = false;
    emits("refresh");
};

const handleQuickChange = (type: QuickDate) => {
    const today = dayjs();

    let start: dayjs.Dayjs;
    let end: dayjs.Dayjs;
    start = today.startOf("day");

    switch (type) {
        case QuickDate.day: // 当日
            end = today.endOf("day");
            break;
        case QuickDate.week: // 本周
            // start = today.startOf("day");
            end = today.endOf("isoWeek");
            break;
        case QuickDate.month: // 本月
            // start = today.startOf("day");
            end = today.endOf("month");
            break;
        default:
            return;
    }

    formData.value.startDate = start.format("YYYY-MM-DD");
    formData.value.endDate = end.format("YYYY-MM-DD");
    formData.value.startDateArr = start.format("YYYY-MM-DD").split("-");
    formData.value.endDateArr = end.format("YYYY-MM-DD").split("-");
};

watch(visible, (val) => {
    if (val && props.data.id) {
        formData.value = {
            ...props.data,
            startDateArr: props.data.startDate.split("-"),
            endDateArr: props.data.endDate.split("-"),
        };
    } else {
        formData.value = { ...defaultData };
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
    position: absolute;
    bottom: 20px;
    width: calc(100% - 24px);
}
</style>
