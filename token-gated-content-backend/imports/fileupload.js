'use strict'

const crypto = require('crypto')

module.exports = class FileUpload {
	constructor(app) {
		this.app = app
		this.registerAPI()
	}

	registerAPI() {
		const { app, safe, checkDefined, errorResponse } = this

		app.post(
			'/fileupload',
			async function (req, res) {
				safe(res, async () => {
					try {
						console.log({ req })

						console.log(req.avatar)
						console.log({ files: req.files })
						if (!req.files) {
							res.send({
								status: false,
								message: 'No file uploaded',
							})
						} else {
							//Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
							let avatar = req.files.avatar

							const hashSum = crypto.createHash('sha256')
							hashSum.update(avatar.data)
							const hex = hashSum.digest('hex')

							//Use the mv() method to place the file in upload directory (i.e. "uploads")
							avatar.mv('./content/' + hex)

							//send response
							res.send({
								status: true,
								message: 'File is uploaded',
								data: {
									name: avatar.name,
									mimetype: avatar.mimetype,
									size: avatar.size,
									hex: hex,
								},
							})
						}
					} catch (err) {
						res.status(500).send(err)
					}
				})
			}.bind(this),
		)

		this.registered = true
	}

	async safe(res, fn) {
		try {
			await fn.apply(this, arguments)
		} catch (err) {
			console.log(err)
			res.status(400).send({ status: 'nok', message: `Invalid API format: ${err}` })
		}
	}

	async checkDefined(json, field) {
		if (json[field] == undefined) throw `'${field}' field is not defined`
	}

	async errorResponse(res, message) {
		res.status(400).send({ status: 'nok', message })
	}
}
