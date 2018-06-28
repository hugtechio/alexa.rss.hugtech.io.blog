'use strict'

const handler = require('../src/handler')

describe('WordPress feed parser test', () => {
  it('should return 200, collect feed', async () => {
    const respondJson = await handler.parse({}, {}, (err, result) => {
      expect(result.statusCode).toBe('200')
    })
  })

  // it('should return 400, bad feed', async () => {
  //   jest.mock('../src/sources.json',
  //     () => (["https://invalidurl.com"]),
  //     { virtual: true })
  //
  //   const respondJson = await handler.parse({}, {}, (err, result) => {
  //     expect(result.statusCode).toBe('400')
  //   })
  // })
})
