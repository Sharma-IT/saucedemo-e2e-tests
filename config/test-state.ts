export class TestState {
    private static instance: TestState;
    private startTime: number;

    private constructor() {
        this.startTime = Date.now();
    }

    public static getInstance(): TestState {
        if (!TestState.instance) {
            TestState.instance = new TestState();
        }
        return TestState.instance;
    }

    public getStartTime(): number {
        return this.startTime;
    }

    public reset(): void {
        this.startTime = Date.now();
    }
}
