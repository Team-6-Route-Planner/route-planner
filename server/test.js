require("es6-promise").polyfill();
var request = require("request");
const API_KEY =
  process.env.GOOGLE_MAPS_API_KEY || "";

var places = [
  "Sawangan, Depok",
  "Tambun selatan, Bekasi",
  "Cibinong, Bogor",
  "Ciwidey, Bandung",
  "Tanggerang, Banten",
];
var promises = [];
var koordinat = [];

var _fetch = function (data) {
  return new Promise(function (resolve, reject) {
    request.get(data, function (err, response) {
      if (err) {
        reject(err);
      } else {
        if (response.statusCode !== 200) {
          return reject(
            new Error("Unexpected response code: " + response.statusCode)
          );
        }
        resolve(response);
      }
    });
  });
};

function url(name, data) {
  switch (name) {
    case "directions":
      if (Array.isArray(data)) {
        data = { waypoints: data };
      }
      if (!data.mode) {
        data.mode = "walking";
      }
      return (
        "https://maps.googleapis.com/maps/api/directions/json?key=" +
        API_KEY +
        "&origin=" +
        encodeURIComponent(data.waypoints[0]) +
        "&destination=" +
        encodeURIComponent(data.waypoints[data.waypoints.length - 1]) +
        "&waypoints=optimize:true|" +
        data.waypoints.map(encodeURIComponent).join("|") +
        "&optimizeWaypoints=true&mode=" +
        data.mode
      );
    case "geocode":
      if (typeof data === "string") {
        data = { address: data };
      }
      return (
        "https://maps.google.com/maps/api/geocode/json?key=" +
        API_KEY +
        "&address=" +
        encodeURIComponent(data.address)
      );
  }
}
places.forEach(function (place) {
  promises.push(
    _fetch({
      url: url("geocode", place),
      json: true,
    }).then(function (response) {
      return response.body;
    })
  );
});
Promise.all(promises)
  .then(function (addresses) {
    var coords = addresses.map(function (address) {
      koordinat.push({
        ...address.results[0].geometry.location,
        address: address.results[0].formatted_address,
      });
      return [
        address.results[0].geometry.location.lat,
        address.results[0].geometry.location.lng,
      ].join(",");
    });
    return _fetch({
      url: url("directions", coords),
      json: true,
    }).then(function (response) {
      return response.body;
    });
  })
  .then(function (data) {
    var waypointOrder = data.routes[0].waypoint_order;
    var placesOrdered = waypointOrder.map(function (orderIdx) {
      return koordinat[orderIdx];
    });
    return placesOrdered;
  })
  .then((data) => {
    console.log(data);
  })
  .catch(console.error);
