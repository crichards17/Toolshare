const {Client} = require("@googlemaps/google-maps-services-js");

const client = new Client({});

const returnDistance = async (origin, tools) => {

  let destinations = [];
  for (let i = 0; i < tools.length; i++) {
    destinations.push(tools[i].user.user_address);
  }
    const r = await client.distancematrix({
      params: {
        origins: [origin],
        destinations: destinations,
        key: "AIzaSyBBTVJl80HHBH6qEf-E22Pze_2V7yzLJFc",
        units: "imperial"
      },
      timeout: 2000, // milliseconds
    });
      const results = r.data.rows[0].elements;
      for (let i = 0; i < results.length; i++) {
        tools[i].distance = results[i].distance.value;
      }
      return tools;
}

module.exports = returnDistance;

// // Test
// const sampleTools = [
//   {
//     user_name: 'test1',
//     user_address: 'Seattle WA'
//   },
//   {
//     user_name: 'test2',
//     user_address: 'Bellevue WA'
//   }
// ]

// async function printTest(sampleTools) {
//   const result = await returnDistance('Issaquah WA', sampleTools);
//   console.log(result);
// }

// printTest(sampleTools);