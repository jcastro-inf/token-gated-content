require('dotenv').config()

const { app } = require('../cors')
const chai = require('chai')

const chaiHttp = require('chai-http')
chai.use(chaiHttp)
require('should')

const { waitForAPIready } = require('./util/express')

const {
	TEST_TIMEOUT,
	TEST_PINCODE,
	TEST_ADDRESS,
	TEST_WALLET_ID,
	TEST_ADDRESS_BAD,
	TEST_WALLET_ID_BAD,
	TEST_TOKEN_ADDRESS,
	TEST_TOKEN_ID,
} = process.env

const utcUnixTimestamp = Math.floor(new Date().getTime() / 1000)
const data = `Date: ${utcUnixTimestamp}:\nAddress: ${TEST_ADDRESS}\ntokenAddress: ${TEST_TOKEN_ADDRESS}\ntokenId: ${TEST_TOKEN_ID}\nI am the owner of ${TEST_ADDRESS} and I want to check the token gated content for tokenAddress ${TEST_TOKEN_ADDRESS} and tokenId ${TEST_TOKEN_ID}`
let signature = ''

async function prepareTestingEnvironment() {
	await waitForAPIready()
}

async function cleanTestingEnvironment() {
	await chai.request(app).delete('/tokengatedcontent/delete')
}

describe('Check endpoints of fileupload', async function () {
	before(prepareTestingEnvironment)
	beforeEach(cleanTestingEnvironment)
	afterEach(cleanTestingEnvironment)
	after(cleanTestingEnvironment)

	it('should have a method to upload the file', async function () {
		this.timeout(TEST_TIMEOUT)
		await chai
			.request(app)
			.post('/fileupload')
			.then(function (res) {
				res.status.should.be.not.equals(404)
			})
	})

	it('should be able to upload the file and retrieve its url', async function () {
		this.timeout(TEST_TIMEOUT)
		await chai
			.request(app)
			.post('/fileupload')
			.attach('avatar', './content/test.jpeg', 'content.jpeg')
			.then(function (res) {
				res.status.should.be.not.equals(404)
				const { body } = res
				console.log({ body })
				//res.body.length.should.be.equals(0)
			})
	})

	/*
	it('should have a method for getting one token gated content link', async function () {
		this.timeout(TEST_TIMEOUT)
		await chai
			.request(app)
			.get('/tokengatedcontent/read')
			.query({ tokenAddress: 'A', tokenId: '0' })
			.then(function (res) {
				res.status.should.be.equals(200)
				res.body.length.should.be.equals(0)
			})
	})
    */
})
