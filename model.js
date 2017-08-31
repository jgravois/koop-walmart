/*
  model.js

  This file is required. It must export a class with at least one public function called `getData`

  Documentation: http://koopjs.github.io/docs/specs/provider/
*/
const request = require('request').defaults({gzip: true, json: false})
const config = require('config')
const parseString = require('xml2js').parseString;
// const xml2js = require('xml2js');

function Model (koop) {}

// This is the only public function you need to implement
Model.prototype.getData = function (req, callback) {

  // Call the remote API without a developer key
  request({ uri: 'https://walmart.alertlink.com/rss/stores.rss' }, (err, res, body) => {
    if (err) return callback(err)

    // var cleanedString = body.replace("��", "")
    body = body.slice(1)
    body = body.slice(1)

    // looks like valid XML once the two leading ��s have been trimmed
    // console.log(body)

    parseString(body, { trim: true }, function (err, result) {
      console.log(result);
      console.log(err);

      // to do: translate the response into geojson
      const geojson = { //  = translate(body)
        type: "FeatureCollection",
        features: [{
          type: "Feature",
          properties: {
            name: "Mr. Waltons"
          },
          geometry: {
            type: "Point",
            coordinates: [100.0, 0.0]
          }
        }]
      }

      // Cache data for 1 hour at a time by setting the ttl or "Time to Live"
      geojson.ttl = 3600

      // hand off the data to Koop
      callback(null, geojson)
    })
  })
}

// function translate (input) {
//   return {
//     type: 'FeatureCollection',
//     features: input.resultSet.vehicle.map(formatFeature)
//   }
// }

// function formatFeature (vehicle) {
//   // Most of what we need to do here is extract the longitude and latitude
//   const feature = {
//     type: 'Feature',
//     properties: vehicle,
//     geometry: {
//       type: 'Point',
//       coordinates: [vehicle.longitude, vehicle.latitude]
//     }
//   }
//   // But we also want to translate a few of the date fields so they are easier to use downstream
//   const dateFields = ['expires', 'serviceDate', 'time']
//   dateFields.forEach(field => {
//     feature.properties[field] = new Date(feature.properties[field]).toISOString()
//   })
//   return feature
// }

module.exports = Model

/* Example raw API response

4.8MB, ~23 seconds

<rss xmlns:georss="http://www.georss.org/georss" xmlns:gml="http://www.opengis.net/gml" version="2.0"><channel><title>Stores Feed</title><description>List of Stores</description><item><title>Home Office - NON-OPERATING 07890</title><description>Phone:  4792734000 &lt;br /&gt;Status:  Open&lt;br /&gt;</description><number/><address/><city>BENTONVILLE</city><state>AR</state><zip>72712</zip><status>Open</status><phone>4792734000</phone><georss:where><gml:Point><gml:pos>36.3651 -94.2145</gml:pos></gml:Point></georss:where></item><item><title>Home Office - NON-OPERATING 07891</title><description>Phone:  4792734000 &lt;br /&gt;Status:  Open&lt;br /&gt;</description><number/><address/><city>BENTONVILLE</city><state>AR</state><zip>72712</zip><status>Open</status><phone>4792734000</phone><georss:where><gml:Point><gml:pos>36.3651 -94.2145</gml:pos></gml:Point></georss:where></item></channel></rss>

tested parsing a subset from a manually created string and it worked fine
*/