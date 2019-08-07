"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PriorityQueue = /** @class */ (function () {
    function PriorityQueue(priority) {
        this.priority = priority;
        this._queue = [];
    }
    PriorityQueue.prototype.remove = function () {
        return this._queue.pop();
    };
    PriorityQueue.prototype.add = function (item) {
        if (this.isEmpty()) {
            this._queue.push(item);
        }
        else {
            for (var i = 0; i < this._queue.length; i++) {
                if (this.priority(item, this._queue[i])) {
                    continue;
                }
                else {
                    this._queue.splice(i, 0, item);
                    return;
                }
            }
            this._queue.push(item);
        }
    };
    PriorityQueue.prototype.isEmpty = function () {
        return this._queue.length ? false : true;
    };
    PriorityQueue.prototype.getQueue = function () {
        return this._queue;
    };
    return PriorityQueue;
}());
exports.default = PriorityQueue;
//# sourceMappingURL=PriorityQueue.js.map