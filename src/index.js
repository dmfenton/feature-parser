'use strict'
const _ = require('highland')
const beginning = /"features"\s{0,}?:\s{0,}?\[/
const ending = /\}\s{0,}\]\s{0,}\}\s{0,}$/
const seperator = /\}\s{0,},\s{0,}\{/

function parse (options) {
  let firstFeature = true
  return _.pipeline(stream => {
    return stream
    .splitBy(seperator)
    .map(string => {
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
  if (first) return `${filtered}}`
  else if (last) return `{${filtered.replace(ending, '}')}`
  else return `{${filtered}}`
}

module.exports = {parse}
