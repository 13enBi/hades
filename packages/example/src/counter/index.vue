<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";

const count = ref(0);

onMounted(() => {
    const timer = setInterval(() => {
        count.value++
    }, 1000)

    onUnmounted(() =>
        clearInterval(timer)
    )
})

</script>;

<template>
    <h-view>
        <h-view
            :style="{ color: count % 2 ? 'blue' : 'red', borderStyle: 'single', borderColor: 'yellow', padding: 4 }">
            count: {{ count }}</h-view>

        <h-view v-for="i in 10">
            {{ i }}
            <h-view v-for="j in 10">
                {{ j }}
            </h-view>
        </h-view>
    </h-view>

</template>;
