require('dotenv').config()

const { openConnection, closeConnection, getClient } = require('../../../services/db/mongo-connection')
const { isConnected } = require('./db-helpers')

const { TEST_MONGO_SERVER } = process.env || "monogdb://127.0.0.1:27017"

describe('GET_CLIENT', () => {
    it('client should be defined', () => {
        const client = getClient()
        expect(client).toBeDefined()
    })

    it('client should return null (no connection)', () => {
        const client = getClient()
        expect(client).toBeNull()
    })
})

describe('OPEN_CONNECTION', () => {

    it('client should not be null when the connection is open', async () => {
        await openConnection(TEST_MONGO_SERVER)
        const client = getClient()
        expect(client).not.toBeNull()
    })

    it('client should be connected to mongoserver when connection is open', async () => {
        await openConnection(TEST_MONGO_SERVER)
        const client = getClient()
        const response = await isConnected(client)
        expect(response).toBeTruthy()
    })

    afterEach(async () => {
        const client = getClient()
        await client.close()
    })

    describe('EXCEPTION', () => {
        it('shoud throw not defined error when server url is undefined', async () => {
            expect.assertions(3)
            try {
                await openConnection(undefined)
            }
            catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('server url is not defined')
            }
        })

        it('shoud throw not defined error when server url is null', async () => {
            expect.assertions(3)
            try {
                await openConnection(null)
            }
            catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('server url is not defined')
            }
        })

        it('shoud throw not defined error when server url is null', async () => {
            expect(() => openConnection(74)).toThrow()
        })
    })
})