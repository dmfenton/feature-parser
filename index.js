'use strict'
const _ = require('highland')
const beginning = /"features"\s*:\s*\[/
const ending = /\}\s*\]\s*\}\s*$/
const commaSeperator = /\}\s*,\s*\{/

function parse (options = {}) {
  let firstFeature = true
  const seperator = options.ndJSON ? '\n' : commaSeperator
  return _.pipeline(stream => {
    return stream
    .splitBy(seperator)
    .map(string => {
      if (options.ndJSON) return string
      try {
        const feature = filter(string, firstFeature)
        firstFeature = false
        return feature
      } catch (e) {
      }
    })
  })
}

function filter (string, first) {
  if (string === _.nil) return _.nil
  let filtered = first ? string.split(beginning)[1] : string
  const last = filtered.match(ending)
  if (first && last) return filtered.replace(ending, '}')
  else if (first) return `${filtered}}`
  else if (last) return `{${filtered.replace(ending, '}')}`
  else return `{${filtered}}`
}

module.exports = {parse}
