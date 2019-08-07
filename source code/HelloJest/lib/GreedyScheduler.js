"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Scheduler_1 = __importDefault(require("./Scheduler"));
var PriorityQueue_1 = __importDefault(require("./PriorityQueue"));
var GreedyScheduler = /** @class */ (function (_super) {
    __extends(GreedyScheduler, _super);
    function GreedyScheduler(parcels, trucks, parcelPriority, parcelOrder, truckOrder, verbose) {
        if (verbose === void 0) { verbose = false; }
        var _this = _super.call(this, trucks) || this;
        _this.truckOrder = truckOrder;
        _this.verbose = verbose;
        var pq = new PriorityQueue_1.default(_this.getPriority(parcelOrder));
        parcels.map(function (p) {
            p.priority = parcelPriority;
            pq.add(p);
        });
        _this.parcels = pq;
        return _this;
    }
    GreedyScheduler.prototype.schedule = function () {
        var tpq = new PriorityQueue_1.default(this.getPriority(this.truckOrder));
        this.trucks.map(function (t) { return tpq.add(t); });
        var truck = tpq.remove();
        while (!this.parcels.isEmpty()) {
            var parcel = this.parcels.remove();
            if (truck.fillTruck(parcel)) {
                this.parcels.add(parcel);
                if (!tpq.isEmpty()) {
                    truck = tpq.remove();
                }
                else {
                    break;
                }
            }
            else {
                continue;
            }
        }
        return this.parcels.getQueue();
    };
    GreedyScheduler.prototype.getPriority = function (priority) {
        var nonincreasing = function (a, b) {
            return a.leq(b);
        };
        var nondecreasing = function (a, b) {
            return a.geq(b);
        };
        if (!(priority === "non-increasing")) {
            return nonincreasing;
            // } else if (priority === "non-decreasing") {
        }
        else {
            return nondecreasing;
        }
    };
    return GreedyScheduler;
}(Scheduler_1.default));
exports.default = GreedyScheduler;
//# sourceMappingURL=GreedyScheduler.js.map