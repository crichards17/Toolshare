const {Client} = require("@googlemaps/google-maps-services-js");

const client = new Client({});

const returnDistance = (origin, tools) => {

  // Extract address for each tool to a separate array
  let destinations = [];
  for (let i = 0; i < tools.length; i++) {
    destinations[i] = tools[i].user.user_address;
  }
  // Test ---------------------------
  console.log(`Destinations:\n${destinations}`);
  // --------------------------

  client
  .distancematrix({
    params: {
      origins: [origin],
      destinations: destinations,
      key: "AIzaSyBBTVJl80HHBH6qEf-E22Pze_2V7yzLJFc",
      units: "imperial"
    },
    timeout: 2000, // milliseconds
  })
  .then((r) => {
    // Test ------------------------------------
    console.log(r.data.rows[0].elements);
    console.log(`Distance in miles: ${r.data.rows[0].elements[0].distance.value * 0.000621371}`);
    // -----------------------------------

    const results = r.data.rows[0].elements;
    
    // Store resulting distance values in their respective Tool
    for (let i = 0; i < results.length; i++) {
      tools[i].distance = results.distance.value * 0.00062;
    }
    console.log(distPairs);
  })
  .catch((e) => {
    console.log(e.response.data.error_message);
  });

  return tools;
}

module.exports = returnDistance;

// Test ----------------------
returnDistance('Issaquah WA', ['Seattle WA', 'Bellevue WA']);
// ---------------------------