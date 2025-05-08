navigator.geolocation.getCurrentPosition((data) => {
  console.log(data);
  var map = L.map("map").setView(
    [data.coords.latitude, data.coords.longitude],
    13
  );
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  L.marker([data.coords.latitude, data.coords.longitude])
    .addTo(map)
    .bindPopup("A pretty CSS popup.<br> Easily customizable.")
    .openPopup();
});
