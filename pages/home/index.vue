<template>
    <div class="card">
        <div class="aWord">
            <div>{{ sentence.text }}</div>
            <div class="source">{{ sentence.source }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { sentenceList } from "./config";
definePageMeta({
    name: "home",
    layout: "target",
});

const showIndex = ref(0);
const sentence = computed(() => sentenceList[showIndex.value]);

setTimeout(() => {
    showIndex.value++;
    setInterval(() => {
        if (showIndex.value < sentenceList.length - 1) {
            showIndex.value++;
        } else {
            showIndex.value = 0;
        }
    }, 12000);
}, 6000);
</script>

<style scoped>
.card {
    background: #fff;
    margin: 200px 16px;
    padding: 16px;
    border-radius: 12px;
    height: 220px;
    box-sizing: border-box;
    padding-top: 60px;
    color: rgba(0, 0, 0, 0.8);

    background: radial-gradient(
            ellipse farthest-side at 76% 77%,
            rgba(245, 228, 212, 0.25) 4%,
            rgba(255, 255, 255, 0) calc(4% + 1px)
        ),
        radial-gradient(
            circle at 86% 15%,
            #fef6ec 4%,
            rgba(255, 255, 255, 0) 4.18%
        ),
        linear-gradient(135deg, #ff0000 0%, #000036 100%),
        radial-gradient(
            ellipse at 28% 0%,
            #ffcfac 0%,
            rgba(98, 149, 144, 0.5) 100%
        ),
        linear-gradient(
            180deg,
            #cd6e8a 0%,
            #f5eab0 69%,
            #d6c8a2 70%,
            #a2758d 100%
        );
    background-blend-mode: normal, normal, screen, overlay, normal;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);

    .aWord {
        font-family: cursive, Inter, Avenir, Helvetica, Arial, sans-serif;
        font-size: 20px;
        animation: fadeInOut 12s linear infinite;

        .source {
            text-align: right;
            margin-top: 12px;
            font-size: 16px;
        }
    }
}

@keyframes fadeInOut {
    0% {
        opacity: 1;
    }

    30% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    70% {
        opacity: 1;
    }

    100% {
        opacity: 1;
    }
}
</style>
