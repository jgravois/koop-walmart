const request = require('request')
const iconv  = require('iconv-lite')
const parseString = require('xml2js').parseString

request({ 
    uri: 'https://walmart.alertlink.com/rss/stores.rss',
    gzip: true,
    encoding: null,
    headers: {
        "Accept-Encoding": "gzip, deflate, br"
    }
}, (err, res, body) => {
    if (err) return callback(err)

    const rss = iconv.decode(new Buffer(body), "utf16");

    parseString(rss, function (err, result) {
        console.log(result)
    })
})

/* Example raw API response

4.8MB, ~23 seconds

<rss xmlns:georss="http://www.georss.org/georss" xmlns:gml="http://www.opengis.net/gml" version="2.0"><channel><title>Stores Feed</title><description>List of Stores</description><item><title>Home Office - NON-OPERATING 07890</title><description>Phone:  4792734000 &lt;br /&gt;Status:  Open&lt;br /&gt;</description><number/><address/><city>BENTONVILLE</city><state>AR</state><zip>72712</zip><status>Open</status><phone>4792734000</phone><georss:where><gml:Point><gml:pos>36.3651 -94.2145</gml:pos></gml:Point></georss:where></item><item><title>Home Office - NON-OPERATING 07891</title><description>Phone:  4792734000 &lt;br /&gt;Status:  Open&lt;br /&gt;</description><number/><address/><city>BENTONVILLE</city><state>AR</state><zip>72712</zip><status>Open</status><phone>4792734000</phone><georss:where><gml:Point><gml:pos>36.3651 -94.2145</gml:pos></gml:Point></georss:where></item></channel></rss>

tested parsing a subset from a manually created string and it worked fine
*/