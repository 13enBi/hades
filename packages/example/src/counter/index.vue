<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";

const count = ref(0);

onMounted(() => {
    const timer = setInterval(() => {
        count.value++
    }, 1000)

    onUnmounted(() =>
        clearTimeout(timer)
    )
})

</script>;

<template>
    <h-view :style="{ color: 'blue' }">count: {{ count }}</h-view>
</template>;
