"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DistanceMap = /** @class */ (function () {
    function DistanceMap() {
        this._map = {};
    }
    DistanceMap.prototype.store = function (cityName1, cityName2, distance) {
        if (!(cityName1 in this._map)) {
            this._map[cityName1] = [[cityName2, distance]];
        }
        else if (!this._map[cityName1].filter(function (p) { return p[0] === cityName2; })
            .length) {
            this._map[cityName1].push([cityName2, distance]);
        }
        else {
            this._map[cityName1].splice(this._map[cityName1]
                .map(function (p) {
                return p[0] === cityName2;
            })
                .indexOf(true), //find matching names
            1, [cityName2, distance] //update the distance
            );
        }
    };
    DistanceMap.prototype.lookup = function (cityName1, cityName2) {
        if (cityName1 === cityName2) {
            return 0;
        }
        else if (!this._map[cityName1]) {
            //undefined
            return -1;
        }
        var res = this._map[cityName1].filter(function (p) { return p[0] === cityName2; });
        return res.length ? res[0][1] : -1;
    };
    DistanceMap.prototype.deliveryDistance = function (cities) {
        if (!cities.length) {
            //assert cities length non empty
            return 0;
        }
        else {
            var total = 0;
            for (var i = 0; i < cities.length - 1; i++) {
                var j = i + 1;
                total += this.lookup(cities[i], cities[j]);
            }
            // total += this.lookup(cities[cities.length - 1], cities[0]);
            return total;
        }
    };
    DistanceMap.prototype.nearestNeighbour = function (city, destinations) {
        var _this = this;
        console.log(this._map);
        return this._map[city].reduce(function (acc, curr) {
            if (!destinations.includes(curr[0])) {
                return acc;
            }
            else if (_this.lookup(city, acc) === -1) {
                return curr[0];
            }
            return _this.lookup(city, curr[0]) <= _this.lookup(city, acc)
                ? curr[0]
                : acc;
        }, destinations.includes(this._map[city][0][0]) ? this._map[city][0][0] : "");
    };
    return DistanceMap;
}());
exports.default = DistanceMap;
//# sourceMappingURL=DistanceMap.js.map