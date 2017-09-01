[![Build Status](https://travis-ci.org/koopjs/koop-provider-sample.svg?branch=master)](https://travis-ci.org/koopjs/koop-provider-sample) [![Greenkeeper badge](https://badges.greenkeeper.io/koopjs/koop-provider-sample.svg)](https://greenkeeper.io/)


# Koop Walmart Provider

This provider was created to support the Hurricane Harvey relief effort by helping folks identify Walmart stores that have been closed. The data source for this provider is Walmart's [GeoRSS feed](https://walmart.alertlink.com/rss/stores.rss).  

> View it [live](https://h8w2a8ip0c.execute-api.us-east-1.amazonaws.com/latest/walmart/FeatureServer/0/query?where=status=%27Closed%27).

If you want to write your own provider, simply fork this repository or copy the contents. Full documentation is provided [here](https://koopjs.github.io/docs/specs/provider/).

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
