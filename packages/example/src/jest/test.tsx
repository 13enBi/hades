import { View } from 'hades';
import { defineComponent } from 'vue';

const getBackgroundForStatus = (status: string) => {
    switch (status) {
        case 'runs':
            return 'yellow';
        case 'pass':
            return 'green';
        case 'fail':
            return 'red';
        default:
            return;
    }
};

export default defineComponent({
    props: ['status', 'path'],
    setup: props => () =>
        (
            <View>
                <View
                    style={{
                        backgroundColor: getBackgroundForStatus(props.status)
                    }}
                >
                    {` ${props.status.toUpperCase()} `}
                </View>

                <View style={{ marginLeft: 1 }}>{props.path}</View>
            </View>
        )
});
