/**
 * copy from ink/examples/jest
 */

import { defineComponent, onMounted, reactive } from 'vue';
import { View } from 'hades';
import Summary from './summary';
import Test from './test';
import PQueue from 'p-queue';

const delay = (timeout: number) => new Promise(r => setTimeout(r, timeout));

const paths = [
    'tests/login.js',
    'tests/signup.js',
    'tests/forgot-password.js',
    'tests/reset-password.js',
    'tests/view-profile.js',
    'tests/edit-profile.js',
    'tests/delete-profile.js',
    'tests/posts.js',
    'tests/post.js',
    'tests/comments.js'
];

export default defineComponent({
    setup: () => {
        const state = reactive({
            startTime: Date.now(),
            completedTests: [] as any[],
            runningTests: [] as any[]
        });

        const runTest = async (path: string) => {
            state.runningTests = [
                ...state.runningTests,
                {
                    status: 'runs',
                    path
                }
            ];

            await delay(1000 * Math.random());

            state.runningTests = state.runningTests.filter(
                test => test.path !== path
            );
            state.completedTests = [
                ...state.completedTests,
                {
                    status: Math.random() < 0.5 ? 'pass' : 'fail',
                    path
                }
            ];
        };

        onMounted(() => {
            const queue = new PQueue({ concurrency: 4 });

            paths.forEach(path => {
                queue.add(() => runTest(path));
            });
        });

        return () => (
            <View
                style={{
                    flexDirection: 'column'
                }}
            >
                {state.completedTests.map(test => (
                    <Test
                        key={test.path}
                        status={test.status}
                        path={test.path}
                    />
                ))}

                {state.runningTests.length > 0 && (
                    <View
                        style={{
                            flexDirection: 'column',
                            marginTop: 1
                        }}
                    >
                        {state.runningTests.map(test => (
                            <Test
                                key={test.path}
                                status={test.status}
                                path={test.path}
                            />
                        ))}
                    </View>
                )}

                <Summary
                    isFinished={state.runningTests.length === 0}
                    passed={
                        state.completedTests.filter(
                            test => test.status === 'pass'
                        ).length
                    }
                    failed={
                        state.completedTests.filter(
                            test => test.status === 'fail'
                        ).length
                    }
                    time={Date.now() - state.startTime}
                />
            </View>
        );
    }
});
