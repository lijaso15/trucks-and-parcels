"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var City = /** @class */ (function () {
    function City(x, y, name) {
        if (name === void 0) { name = ""; }
        this.x = x;
        this.y = y;
        this.name = name;
    }
    City.prototype.distance = function (other) {
        return (Math.round(Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)) * 100) / 100);
    };
    City.prototype.equals = function (other) {
        if (!(other instanceof City)) {
            return false;
        }
        return other.x === this.x && other.y === this.y && other.name === this.name;
    };
    return City;
}());
exports.default = City;
//# sourceMappingURL=City.js.map