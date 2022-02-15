import { View } from 'hades';
import { defineComponent } from 'vue';

const Summary = defineComponent({
    props: ['isFinished', 'passed', 'failed', 'time'],

    setup: (props: any) => () =>
        (
            <View
                style={{
                    flexDirection: 'column',
                    marginTop: 1
                }}
            >
                <View>
                    <View style={{ width: 14 }}>Test Suites:</View>
                    {props.failed > 0 && (
                        <View style={{ color: 'red' }}>
                            {props.failed} failed&nbsp;
                        </View>
                    )}
                    {props.passed > 0 && (
                        <View style={{ color: 'green' }}>
                            {props.passed} passed&nbsp;
                        </View>
                    )}
                    <View>{props.passed + props.failed} total</View>
                </View>

                <View>
                    <View>Time:</View>

                    {props.time}
                </View>

                {props.isFinished && <View>Ran all test suites.</View>}
            </View>
        )
});

export default Summary;
