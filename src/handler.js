'use strict'

const Promise = require('bluebird')
const feedUrls = require('./sources.json')
const parser = require('./parser')
const _ = require('lodash')

module.exports.parse = async (event, context, callback) => {
  let responseBody = []
  try {
    await Promise.map(feedUrls, async (url) => {
      let result = await parser.parse(url)
      responseBody = _.concat(responseBody, result)
    })
    callback(null, build_response(responseBody))
  } catch(error) {
    callback(null, build_response('', '400'))
  }
}

const build_response = (body='', statusCode='200') => {
  return {
      'statusCode': '200',
      'body': JSON.stringify(body),
      'headers': {
          'Content-Type': 'application/json',
      }
  }
}
