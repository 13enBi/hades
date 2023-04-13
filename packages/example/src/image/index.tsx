import got from 'got';
import { Image } from 'hades';
import { defineComponent, onMounted, ref } from 'vue';

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
