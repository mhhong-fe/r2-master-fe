<template>
    <div class="container">
        <div class="card">
            <div class="dot-elastic"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    name: "loading",
    layout: "demo",
});
</script>

<style scoped lang="scss">
@keyframes dotElastic {
    0% {
        transform: scale(1, 1);
    }

    25% {
        transform: scale(1, 1);
    }
    50% {
        transform: scale(1, 1.5);
        background-color: #7869ff;
    }
    75% {
        transform: scale(1, 1);
    }
    100% {
        transform: scale(1, 1);
    }
}

@keyframes dotElasticBefore {
    0% {
        transform: scale(1, 1);
    }

    25% {
        transform: scale(1, 1.5);
        background-color: #7869ff;
    }
    50% {
        transform: scale(1, 0.67);
    }
    75% {
        transform: scale(1, 1);
    }
    100% {
        transform: scale(1, 1);
    }
}

@keyframes dotElasticAfter {
    0% {
        transform: scale(1, 1);
    }

    25% {
        transform: scale(1, 1);
    }
    50% {
        transform: scale(1, 0.67);
    }
    75% {
        transform: scale(1, 1.5);
        background-color: #7869ff;
    }
    100% {
        transform: scale(1, 1);
    }
}

.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #2a2a2b;
    width: 120px;
    height: 240px;
    border-radius: 16px;

    .dot-elastic {
        position: relative;
        width: 8px;
        height: 8px;
        border-radius: 5px;
        background-color: #b8afff;
        animation: dotElastic 1s infinite linear;
        margin: auto;
        &::before,
        &::after {
            content: "";
            display: inline-block;
            position: absolute;
            top: 0;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #b8afff;
        }
        &::before {
            left: -15px;
            animation: dotElasticBefore 1s infinite linear;
        }
        &::after {
            left: 15px;
            animation: dotElasticAfter 1s infinite linear;
        }
    }
}
</style>
