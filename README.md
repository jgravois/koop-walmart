[![Build Status](https://travis-ci.org/koopjs/koop-provider-sample.svg?branch=master)](https://travis-ci.org/koopjs/koop-provider-sample) [![Greenkeeper badge](https://badges.greenkeeper.io/koopjs/koop-provider-sample.svg)](https://greenkeeper.io/)


# Koop Walmart Provider

This is a sample that demonstrates how to build a Koop Provider. Full documentation is provided [here](https://koopjs.github.io/docs/specs/provider/).

The data source in this case is the Walmart Store [Georss](https://en.wikipedia.org/wiki/GeoRSS) feed. You can see this provider in action [here](https://walmart.alertlink.com/rss/stores.rss).

If you want to write your own provider, simply fork this repository or copy the contents.

## Files

| File | | Description |
| --- | --- | --- |
| `index.js` | Mandatory | Configures provider for usage by Koop |
| `model.js` | Mandatory | Translates remote API to GeoJSON |
| `routes.js` | Optional | Specifies additional routes to be handled by this provider |
| `controller.js` | Optional | Handles additional routes specified in `routes.js` |
| `server.js` | Optional | Reference implementation for the provider |
| `test/model-test.js` | Optional | tests the `getData` function on the model |
| `test/fixtures/input.json` | Optional | a sample of the raw input from the 3rd party API |
| `config/default.json` | Optional | used for advanced configuration, usually API keys. |

## Test it out
Run server:
- `npm install`
- `DEPLOY=dev npm start`

Example API Query:
- `curl localhost:8080/sample/FeatureServer/0/query?returnCountOnly=true`

Tests:
- `npm test`

## With Docker

- `docker build -t koop-walmart .`
- `docker run -it -p 8080:8080 koop-walmart`

## Publish to npm
- run `npm init` and update the fields
  - Choose a name like `koop-provider-foo`
- run `npm publish`
