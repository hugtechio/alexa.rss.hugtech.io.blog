'use strict'

const parser = require('../src/parser')
const URL = 'https://hugtech.io/feed/'

describe('WordPress feed parser test', () => {
  it('should return Alexa formatted json', async () => {
    const respondJson = await parser.parse(URL)
    expect(respondJson.length).toBe(10)
    expect(respondJson[0].hasOwnProperty('uid')).toBe(true)
    expect(respondJson[0].hasOwnProperty('updateDate')).toBe(true)
    expect(respondJson[0].hasOwnProperty('titleText')).toBe(true)
    expect(respondJson[0].hasOwnProperty('mainText')).toBe(true)
    expect(respondJson[0].hasOwnProperty('redirectionUrl')).toBe(true)
  })
})
