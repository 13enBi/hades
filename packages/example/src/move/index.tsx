import { useInput, View, Text } from 'hades';
import { defineComponent, ref } from 'vue';

export default defineComponent(() => {
    const x = ref(1);
    const y = ref(1);

    const { off } = useInput((input, key) => {
        if (input === 'q') {
            off();
        }

        if (key.left) {
            x.value = Math.max(0, x.value - 1);
        }

        if (key.right) {
            x.value = Math.min(90, x.value + 1);
        }

        if (key.up) {
            y.value = Math.max(0, y.value - 1);
        }

        if (key.down) {
            y.value = Math.min(7, y.value + 1);
        }
    });

    return () => (
        <View
            style={{
                flexDirection: 'column',
                width: 100
            }}
        >
            <Text>Use arrow keys to move the face. Press “q” to exit.</Text>
            <View
                style={{
                    borderStyle: 'single',
                    height: 12,
                    padding: `${y.value} 0 0 ${x.value}`
                }}
            >
                <View style={{ borderStyle: 'single', height: 3 }}>Box</View>
            </View>
        </View>
    );
});
