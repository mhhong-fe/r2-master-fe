<template>
    <div class="container">
        <div class="tag-list">
            <div
                v-for="item in tagList"
                :key="item"
                class="tag-item"
                :class="{ selected: selectedTag === item }"
                @click="selectedTag = item"
            >
                {{ item }}
            </div>
        </div>
        <div class="summary">
            <div>
                <span>在此标签下，你一共写下</span>
                <span class="bold">{{ showTagList.length }}</span>
                <span>个目标，完成其中</span>
                <span class="bold">{{ completeTagCount }}</span>
                <span>个目标</span>
            </div>
        </div>
        <div class="history-list">
            <div
                v-for="(item, index) in tagMap[selectedTag]"
                :key="item"
                class="history-item-wrapper"
            >
                <div class="history-item">
                    <div
                        class="dot"
                        :class="{ completed: item.completed }"
                    ></div>
                    <div class="history-item-text">
                        {{ `${item.date}， ${item.title}` }}
                    </div>
                </div>
                <div
                    v-if="index !== tagMap[selectedTag].length - 1"
                    class="line"
                ></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "data",
    layout: "default",
});

const loading = ref(false);
const list = ref([]);

const tagMap = ref<Record<string, any>>({});

const tagList = computed(() => Object.keys(tagMap.value));

const selectedTag = ref("");
const showTagList = computed(() => tagMap.value[selectedTag.value] || []);
const completeTagCount = computed(
    () => showTagList.value.filter((item) => item.completed)?.length
);

const init = async () => {
    try {
        loading.value = true;
        const res = await useFetch(
            ` https://www.mhhong.com/toolApi/todo/history?type=1`
        );
        list.value = res?.data.value.data;
        console.log({ list });
        res?.data.value.data.map((item) => {
            const { tag } = item;
            if (!tagMap.value[tag]) {
                tagMap.value[tag] = [];
            }

            tagMap.value[tag].push(item);
        });
        selectedTag.value = res.data.value.data[0].tag;
        console.log({
            res: res?.data.value.data,
            map: tagMap,
            tagList,
            selectedTag,
        });
    } catch (error) {
    } finally {
        loading.value = false;
    }
};

init();
</script>

<style scoped lang="scss">
.container {
    color: #666;
    padding: 12px;

    .tag-list {
        display: flex;
        gap: 12px;
        .tag-item {
            font-size: 13px;
            padding: 4px 12px;
            background-color: #fff;
            border-radius: 5px;
            color: #323233;
            border: 1px solid #e2e2e2;
            color: #407fff;

            &.selected {
                background-color: #407fff;
                color: #fff;
            }
        }
    }

    .summary {
        margin-top: 18px;
        font-size: 13px;

        .bold {
            font-weight: bold;
            color: #407fff;
            margin: 0 4px;
        }
    }

    .history-list {
        font-size: 13px;
        margin-top: 12px;
        height: calc(100dvh - 160px);
        overflow: scroll;
        .history-item {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .dot {
            width: 14px;
            height: 14px;
            border: 1px solid #407fff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            &.completed::after {
                background-color: #407fff;
            }

            &::after {
                content: "";
                width: 8px;
                height: 8px;
                border-radius: 50%;
                // background-color: #f00;
            }
        }
    }

    .line {
        margin-left: 7px;
        height: 28px;
        width: 0;
        margin: 4px 6px;
        border-left: 1px dashed #407fff;
    }
}
</style>
