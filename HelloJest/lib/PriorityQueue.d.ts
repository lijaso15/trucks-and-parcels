declare type priority = (a: any, b: any) => boolean;
export default class PriorityQueue {
    priority: priority;
    private _queue;
    constructor(priority: (a: any, b: any) => boolean);
    remove(): any;
    add(item: any): void;
    isEmpty(): boolean;
    getQueue(): any[];
}
export {};
