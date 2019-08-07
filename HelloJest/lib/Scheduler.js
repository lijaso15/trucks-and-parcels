"use strict";
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PriorityQueue_1 = __importDefault(require("./PriorityQueue"));
var Scheduler = /** @class */ (function () {
    function Scheduler(trucks) {
        this.trucks = trucks;
    }
    Scheduler.prototype.schedule = function () {
        var e_1, _a;
        var extra = [];
        var parcel;
        try {
            for (var _b = __values(this.parcels), _c = _b.next(); !_c.done; _c = _b.next()) {
                parcel = _c.value;
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
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return extra;
    };
    Scheduler.prototype.parcelIntoTrucks = function (parcel, trucks) {
        var e_2, _a;
        var truck;
        try {
            for (var trucks_1 = __values(trucks), trucks_1_1 = trucks_1.next(); !trucks_1_1.done; trucks_1_1 = trucks_1.next()) {
                truck = trucks_1_1.value;
                if (typeof truck.fillTruck(parcel) === "string") {
                    continue;
                }
                else {
                    return;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (trucks_1_1 && !trucks_1_1.done && (_a = trucks_1.return)) _a.call(trucks_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return parcel;
    };
    Scheduler.prototype.route = function (parcels, algorithm, truck, seed) {
        switch (algorithm) {
            case "RANDOM":
                return this.random(parcels, seed);
            case "NAIVE":
                if (!truck) {
                    throw new TypeError("param truck is undefined");
                }
                return this.naive(parcels, truck);
            case "GREEDY":
                if (!truck) {
                    throw new TypeError("param truck is undefined");
                }
                // return this.greedy(parcels, truck);
                return this.greedy(parcels, truck);
            default:
                return parcels;
        }
    };
    Scheduler.prototype.random = function (parcels, seed) {
        return this.shuffle(parcels, seed);
    };
    Scheduler.prototype.shuffle = function (a, seed) {
        var _a;
        var seedrandom = require("seedrandom");
        // Global PRNG: set Math.random.
        seedrandom(seed, { global: true });
        for (var i = a.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = __read([a[j], a[i]], 2), a[i] = _a[0], a[j] = _a[1];
        }
        return a;
    };
    Scheduler.prototype.naive = function (parcels, truck) {
        function perm(xs) {
            var ret = [];
            for (var i = 0; i < xs.length; i = i + 1) {
                var rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));
                if (!rest.length) {
                    ret.push([xs[i]]);
                }
                else {
                    for (var j = 0; j < rest.length; j = j + 1) {
                        ret.push([xs[i]].concat(rest[j]));
                    }
                }
            }
            return ret;
        }
        var permutations = perm(parcels);
        return permutations.reduce(function (acc, curr) {
            return truck.totalDistance(acc) <= truck.totalDistance(curr) ? acc : curr;
        });
    };
    Scheduler.prototype.greedy = function (parcels, truck) {
        var curr = truck.depotLocation;
        var destinations = parcels.map(function (p) { return p.destination; });
        var nearest = truck.dm.nearestNeighbour(curr, destinations);
        var res = [];
        res.push(nearest);
        while (!(destinations.length === 1)) {
            curr = nearest;
            destinations = destinations.filter(function (d) { return !(d === curr); });
            nearest = truck.dm.nearestNeighbour(curr, destinations);
            res.push(nearest);
        }
        var indexPriority = function (a, b) {
            return res.indexOf(a.destination) >= res.indexOf(b.destination);
        };
        var pq = new PriorityQueue_1.default(indexPriority);
        parcels.forEach(function (p) { return pq.add(p); });
        return pq.getQueue();
    };
    return Scheduler;
}());
exports.default = Scheduler;
//# sourceMappingURL=Scheduler.js.map