'use strict'
const _ = require('highland')
const GeoJSON = require('geo-xform').GeoJSON
const test = require('tape')
const FeatureParser = require('../')
const fs = require('fs')

test('with odd spacing', t => collectAndTest('oddSpacing', 100, t))

test('with null geometries', t => collectAndTest('nullGeom', 1084, t))

test('vanilla geojson', t => collectAndTest('fc', 100, t))

test('single polygon', t => collectAndTest('singlePoly', 1, t))

function collectAndTest (fixture, count, t) {
  t.plan(2)
  let json = ''
  _(fs.createReadStream(`${__dirname}/fixtures/${fixture}.geojson`))
  .pipe(FeatureParser.parse())
  .pipe(GeoJSON.createStream())
  .each(chunk => {
    json += chunk.toString()
  })
  .done(() => {
    try {
      const geojson = JSON.parse(json)
      t.pass('Valid JSON')
      t.equal(geojson.features.length, count, 'All features parsed')
    } catch (e) {
      fs.writeFileSync('./invalid.json', json)
      t.fail('Invalid JSON')
    }
  })
}
