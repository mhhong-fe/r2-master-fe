<template>
    <div class="container">
        <img :src="NotFoundImg" alt="" />
        <div class="back-btn" @click="goToHome">Go Back to Home</div>
    </div>
</template>

<script setup lang="ts">
import NotFoundImg from "@/assets/imgs/404/not-found.png";

const router = useRouter();
const goToHome = () => {
    router.replace({
        name: "home",
    });
};
</script>

<style scoped>
.container {
    display: flex;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    padding-top: 30%;

    img {
        width: 400px;
        max-width: calc(100% - 60px);
    }

    .back-btn {
        border: 1px solid #407fff;
        padding: 12px 24px;
        border-radius: 12px;
        color: #407fff;
        cursor: pointer;
    }
}
</style>
