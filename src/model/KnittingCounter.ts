export interface KnittingCounter {
    counterId: number;
    counterName: string;
    counterNumber: number;
    counterTotal: number;
}

export interface KnittingCounterType {
    counter: KnittingCounter;
}

export interface KnittingCountersType {
    counters: KnittingCounter[];
}