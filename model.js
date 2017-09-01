/*
  model.js

  This file is required. It must export a class with at least one public function called `getData`

  Documentation: http://koopjs.github.io/docs/specs/provider/
*/
const request = require('request').defaults({gzip: true, json: false})
const iconv = require('iconv-lite')
const parseString = require('xml2js').parseString

function Model (koop) {}

// This is the only public function you need to implement
Model.prototype.getData = function (req, callback) {
  // Call the remote API without a developer key
  request({
    uri: 'https://walmart.alertlink.com/rss/stores.rss',
    encoding: null
  }, (err, res, body) => {
    if (err) return callback(err)

    // walmart sends back the response as utf16. who knew?!
    const rss = iconv.decode(new Buffer(body), 'utf16')

    parseString(rss, function (err, result) {
      if (err) return callback()

      // translate the response into geojson
      const geojson = translate(result)

      // Cache data for 1 hour at a time by setting the ttl or "Time to Live"
      geojson.ttl = 3600

      // hand off the data to Koop
      callback(null, geojson)
    })
  })
}

function translate (input) {
  // each of the 7000+ stores needs to be turned into GeoJSON
  return {
    type: 'FeatureCollection',
    features: input.rss.channel[0].item.map(formatFeature)
  }
}

function formatFeature (walmart) {
  // gml is kinda nasty
  const pointCoords = walmart['georss:where'][0]['gml:Point'][0]['gml:pos'][0].split(' ')

  const feature = {
    type: 'Feature',
    properties: {
      address: walmart.address[0],
      city: walmart.city[0],
      description: walmart.description[0],
      number: walmart.number[0],
      phone: walmart.phone[0],
      state: walmart.state[0],
      status: walmart.status[0],
      title: walmart.title[0],
      zip: walmart.zip[0]
    },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(pointCoords[1]),
        parseFloat(pointCoords[0])
      ]
    }
  }

  return feature
}

module.exports = Model

/* example raw API response ~ 4.8MB
<rss xmlns:georss="http://www.georss.org/georss" xmlns:gml="http://www.opengis.net/gml" version="2.0"><channel><title>Stores Feed</title><description>List of Stores</description><item><title>Home Office - NON-OPERATING 07890</title><description>Phone:  4792734000 &lt;br /&gt;Status:  Open&lt;br /&gt;</description><number/><address/><city>BENTONVILLE</city><state>AR</state><zip>72712</zip><status>Open</status><phone>4792734000</phone><georss:where><gml:Point><gml:pos>36.3651 -94.2145</gml:pos></gml:Point></georss:where></item><item><title>Home Office - NON-OPERATING 07891</title><description>Phone:  4792734000 &lt;br /&gt;Status:  Open&lt;br /&gt;</description><number/><address/><city>BENTONVILLE</city><state>AR</state><zip>72712</zip><status>Open</status><phone>4792734000</phone><georss:where><gml:Point><gml:pos>36.3651 -94.2145</gml:pos></gml:Point></georss:where></item></channel></rss>
*/
