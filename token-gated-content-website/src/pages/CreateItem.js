import '../App.css'
import React, { useState } from 'react'

import { TOKEN_GATED_CONTENT_BACKEND_URL } from '../config'

import CreateItemForm from '../components/CreateItemForm'

function CreateItem() {
	const [selectedFile, setSelectedFile] = useState()
	const [isFilePicked, setIsFilePicked] = useState(false)

	const [remoteLocation, setRemoteLocation] = useState('')

	const changeHandler = event => {
		setSelectedFile(event.target.files[0])
		setIsFilePicked(true)
	}

	const handleSubmission = async () => {
		const url = `${TOKEN_GATED_CONTENT_BACKEND_URL}/fileupload`
		const uploadResult = await fetch(url)

		console.log({ uploadResult })
	}

	const { isOpened1, setIsOpened1 } = useState(true)
	const { isOpened2, setIsOpened2 } = useState(true)

	return (
		<div>
			<h1>Create item</h1>

			<label className="label">
				Step 1: upload content
				<input
					className="input"
					type="checkbox"
					checked={isOpened1}
					onChange={({ target: { checked } }) => setIsOpened1(checked)}
				/>
			</label>
			<div>
				<input type="file" name="file" onChange={changeHandler} />
				{isFilePicked ? (
					<div>
						<p>Filename: {selectedFile.name}</p>
						<p>Filetype: {selectedFile.type}</p>
						<p>Size in bytes: {selectedFile.size}</p>
						<p>lastModifiedDate: {selectedFile.lastModifiedDate.toLocaleDateString()}</p>
					</div>
				) : (
					<p>Select a file to show details</p>
				)}
				<div>
					<button onClick={handleSubmission}>Submit</button>
				</div>
			</div>

			<label className="label">
				Step 2: specify token
				<input
					className="input"
					type="checkbox"
					checked={isOpened2}
					onChange={({ target: { checked } }) => setIsOpened2(checked)}
				/>
			</label>
			<div>asdfasdf</div>

			<CreateItemForm />
		</div>
	)
}

export default CreateItem
