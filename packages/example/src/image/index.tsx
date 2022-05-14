import { defineComponent, onMounted, ref } from 'vue';
import got from 'got';
import { Image, View } from 'hades';

export default defineComponent({
    setup: () => {
        const body = ref<any>(null);

        onMounted(async () => {
            body.value = await got('https://sindresorhus.com/unicorn').buffer();
        });

        return () => (
            <Image src={body.value} style={{ width: 80, height: 60 }} />
        );
    }
});

