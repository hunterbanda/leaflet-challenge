// Create the tile layer for the map background
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map object
let map = L.map("map", {
  center: [20, 0], // General center of the world
  zoom: 3,
  layers: [streetmap]
});

// Function to determine marker color based on depth
function getColor(depth) {
  return depth > 90 ? "#ff0000" :
         depth > 70 ? "#ff6600" :
         depth > 50 ? "#ffcc00" :
         depth > 30 ? "#ccff33" :
         depth > 10 ? "#66ff66" :
                      "#00ff00"; // Green for shallow depth
}

// Function to determine marker size based on magnitude
function getRadius(magnitude) {
  return magnitude ? magnitude * 4 : 1; // Scale the marker size
}

// Function to style each earthquake marker
function styleInfo(feature) {
  return {
      radius: getRadius(feature.properties.mag),
      fillColor: getColor(feature.geometry.coordinates[2]), // Depth
      color: "#000",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8
  };
}

// Load earthquake data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  let earthquakes = L.geoJson(data, {
      pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng);
      },
      style: styleInfo,
      onEachFeature: function(feature, layer) {
          layer.bindPopup(
              `<h3>Magnitude: ${feature.properties.mag}</h3>
               <h4>Location: ${feature.properties.place}</h4>
               <p>Depth: ${feature.geometry.coordinates[2]} km</p>`
          );
      }
  });

  earthquakes.addTo(map);

  // Create legend
  let legend = L.control({ position: "bottomright" });

  legend.onAdd = function() {
      let div = L.DomUtil.create("div", "info legend"),
          depths = [-10, 10, 30, 50, 70, 90],
          colors = ["#00ff00", "#66ff66", "#ccff33", "#ffcc00", "#ff6600", "#ff0000"];

      div.innerHTML = "<h4>Depth (km)</h4>";
      for (let i = 0; i < depths.length; i++) {
          div.innerHTML +=
              `<i style="background:${colors[i]}; width: 20px; height: 20px; display: inline-block;"></i> 
              ${depths[i]}${depths[i + 1] ? `–${depths[i + 1]} km` : "+ km"}<br>`;
      }
      return div;
  };

  legend.addTo(map);
});

// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map


// Create the map object with center and zoom options.


// Then add the 'basemap' tile layer to the map.

// OPTIONAL: Step 2
// Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
// Add a control to the map that will allow the user to change which layers are visible.


// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {

  }

  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {

  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {

  }

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {

    },
    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {

    }
  // OPTIONAL: Step 2
  // Add the data to the earthquake layer instead of directly to the map.
  }).addTo(map);

  // Create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    // Initialize depth intervals and colors for the legend


    // Loop through our depth intervals to generate a label with a colored square for each interval.


    return div;
  };

  // Finally, add the legend to the map.


  // OPTIONAL: Step 2
  // Make a request to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
    // Save the geoJSON data, along with style information, to the tectonic_plates layer.


    // Then add the tectonic_plates layer to the map.

  });
});
