"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Parcel = /** @class */ (function () {
    function Parcel(pid, origin, destination, volume) {
        this.pid = pid;
        this.origin = origin;
        this.destination = destination;
        this.volume = volume;
    }
    Parcel.prototype.getDistance = function (dm) {
        return dm.lookup(this.origin, this.destination);
    };
    Parcel.prototype.leq = function (other) {
        if (!(other instanceof Parcel)) {
            throw new TypeError("incompatible types");
        }
        else if (this.priority === "volume") {
            return this.volume <= other.volume;
        }
        else if (this.priority === "destination") {
            return this.destination.charCodeAt(0) <= other.destination.charCodeAt(0);
        }
    };
    Parcel.prototype.geq = function (other) {
        if (!(other instanceof Parcel)) {
            throw new TypeError("incompatible types");
        }
        else if (this.priority === "volume") {
            return this.volume >= other.volume;
        }
        else if (this.priority === "destination") {
            return this.destination.charCodeAt(0) >= other.destination.charCodeAt(0);
        }
    };
    return Parcel;
}());
exports.default = Parcel;
//# sourceMappingURL=Parcel.js.map