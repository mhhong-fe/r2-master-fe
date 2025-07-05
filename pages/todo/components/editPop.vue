<template>
    <van-popup
        v-model:show="visible"
        position="bottom"
        round
        :style="{ height: '400px', padding: '12px' }"
    >
        <div>
            <div class="add-title">创建todo</div>
            <van-field
                v-model="formData.title"
                label-width="60"
                label-align="right"
                maxlength="16"
                label="标题"
            />
            <van-field
                v-model="formData.description"
                label-width="60"
                label-align="right"
                :autosize="{ minHeight: 48, maxHeight: 72 }"
                show-word-limit
                maxlength="100"
                type="textarea"
                label="描述"
            />
            <van-field
                label-width="60"
                label-align="right"
                v-model="formData.tag"
                label="标签"
            />
            <van-field
                v-model="formData.targetText"
                is-link
                readonly
                label="关联目标"
                label-width="60"
                label-align="right"
                placeholder="选择目标"
                @click="pickerVisible = true"
            />
            <van-popup
                v-model:show="pickerVisible"
                destroy-on-close
                round
                position="bottom"
            >
                <van-picker
                    v-model="formData.targetIdList"
                    :columns="showTargetList"
                    @cancel="pickerVisible = false"
                    @confirm="onConfirm"
                />
            </van-popup>
            <van-field
                label-width="60"
                label-align="right"
                v-if="formData.targetIdList.length"
                v-model="formData.score"
                label="分数"
            />
            <div class="confirm-btn">
                <van-button round type="success" block @click="addOrEdit"
                    >添加</van-button
                >
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
const visible = defineModel<boolean>();

const props = defineProps<{
    data: any;
    targetList: any[];
    date: any;
}>();

const emits = defineEmits<{
    refresh: [];
}>();

const formData = ref({
    title: "",
    description: "",
    tag: "",
    targetIdList: [],
    targetText: "",
    score: 0,
});

const showTargetList = computed(() => {
    return props.targetList.map((item) => ({
        text: item.title,
        value: item.id,
    }));
});

const pickerVisible = ref(false);
const pickerValue = ref<Numeric[]>([]);
const onConfirm = ({ selectedValues, selectedOptions }) => {
    pickerVisible.value = false;
    pickerValue.value = selectedValues;
    formData.value.targetText = selectedOptions[0].text;
};

const addOrEdit = async () => {
    if (!formData.value.title) {
        showNotify({ message: "标题不能为空" });
        return;
    }

    const toolApi = props.data.id ? "/toolApi/todo/edit" : "/toolApi/todo/add";
    const reqBody = {
        title: formData.value.title,
        tag: formData.value.tag,
        description: formData.value.description,
        date: props.date,
        type: 1,
        id: props.data.id,
        targetId: formData.value.targetIdList[0],
        score: formData.value.score,
    };
    const res = await fetch(toolApi, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // 添加请求头
        },
        body: JSON.stringify(reqBody),
    }).then((res) => res.json());

    emits("refresh");
    visible.value = false;
};

watch(visible, (val) => {
    if (val && props.data.id) {
        formData.value = {
            ...formData.value,
            ...props.data,
        };
    }
});
</script>

<style scoped></style>
