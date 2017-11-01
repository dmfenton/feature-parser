# Feature-Parser
*Parse streams of geojson into individual features*

Example: Split geojson into 5 groups
```javascript
const request = require('request')
const FeatureParser = require('feature-parser')

request.get(/* remote geojson */)
.pipe(FeatureParser.parse())
.batch(500)
.each(batch => /* do something with your batch */)
```

To parse newline delimited json pass `{ndJSON: true}`
