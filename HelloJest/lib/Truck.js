"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Truck = /** @class */ (function () {
    function Truck(tid, depotLocation, capacity, dm) {
        this.tid = tid;
        this.depotLocation = depotLocation;
        this.capacity = capacity;
        this.parcels = [];
        this.volume = 0;
        this.dm = dm;
        this.route = [];
    }
    Truck.prototype.fillTruck = function (p) {
        // if there is not enough space in this truck then return
        // the destination of the parcel
        if (p.volume + this.volume <= this.capacity) {
            this.parcels.push(p);
            this.volume += p.volume;
        }
        else {
            return p.destination;
        }
    };
    Truck.prototype.totalDistance = function (parcels) {
        return (this.dm.deliveryDistance(parcels.map(function (p) { return p.destination; })) +
            this.dm.lookup(this.depotLocation, parcels[0].destination) +
            this.dm.lookup(parcels[parcels.length - 1].destination, this.depotLocation));
    };
    Truck.prototype.leq = function (other) {
        if (!(other instanceof Truck)) {
            throw new TypeError("incompatible types");
        }
        else {
            return this.volume <= other.volume;
        }
    };
    Truck.prototype.geq = function (other) {
        if (!(other instanceof Truck)) {
            throw new TypeError("incompatible types");
        }
        else {
            return this.volume >= other.volume;
        }
    };
    return Truck;
}());
exports.default = Truck;
//# sourceMappingURL=Truck.js.map