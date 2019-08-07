"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DistanceMap_1 = __importDefault(require("./DistanceMap"));
var CityMap = /** @class */ (function () {
    function CityMap() {
        this.cities = [];
    }
    CityMap.prototype.transformToDistanceMap = function () {
        var _this = this;
        var dm = new DistanceMap_1.default();
        this.cities.map(function (city) {
            _this.cities.map(function (c) {
                if (!city.equals(c))
                    dm.store(city.name, c.name, city.distance(c));
            });
        });
        return dm;
    };
    return CityMap;
}());
exports.default = CityMap;
//# sourceMappingURL=CityMap.js.map