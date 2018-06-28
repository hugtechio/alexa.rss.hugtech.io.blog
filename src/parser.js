'use strict'

const Promise = require('bluebird')
const moment = require('moment')
const fetch = require('node-fetch')
const _ = require('lodash')
const parseString = Promise.promisify(require('xml2js').parseString)

module.exports.parse = async (url) => {
  const xmlFeed = await fetch(url).then(res => res.text())
  const parsedFeed = await parseString(xmlFeed)
  return alexaFormat(parsedFeed)
}

const alexaFormat = (parsedFeed) => {
  let result = []
  let days = 0
  _.each(parsedFeed.rss.channel, (channel) => {
    let alexaItem = channel.item.map(item => {
      days++
      return {
        'uid': item.guid[0]['_'],
        'updateDate': moment().subtract(days, 'days').format(),
        'titleText': cleansing(item.title[0]),
        'mainText': cleansing(item.description[0]),
        'redirectionUrl': item.link[0]
      }
    })
    result = _.concat(result, alexaItem)
  })
  return result
}

const cleansing = (text) => {
  return text.replace(/<.*?>|&#[0-9]+;|&|\\xa0/, '')
}
