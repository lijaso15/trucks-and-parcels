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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Scheduler_1 = __importDefault(require("./Scheduler"));
var RandomScheduler = /** @class */ (function (_super) {
    __extends(RandomScheduler, _super);
    function RandomScheduler(parcels, trucks, verbose) {
        if (verbose === void 0) { verbose = false; }
        var _this = _super.call(this, trucks) || this;
        _this.verbose = false;
        _this.parcels = parcels;
        _this.verbose = verbose;
        return _this;
    }
    RandomScheduler.prototype.schedule = function (seed) {
        var e_1, _a;
        var extra = [];
        var parcels = this.shuffle(this.parcels, seed);
        var parcel;
        try {
            for (var parcels_1 = __values(parcels), parcels_1_1 = parcels_1.next(); !parcels_1_1.done; parcels_1_1 = parcels_1.next()) {
                parcel = parcels_1_1.value;
                if (this.parcelIntoTrucks(parcel, this.trucks)) {
                    extra.push(parcel);
                }
                else {
                    continue;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (parcels_1_1 && !parcels_1_1.done && (_a = parcels_1.return)) _a.call(parcels_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return extra;
    };
    return RandomScheduler;
}(Scheduler_1.default));
exports.default = RandomScheduler;
//# sourceMappingURL=RandomScheduler.js.map