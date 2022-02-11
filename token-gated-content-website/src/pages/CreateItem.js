import '../App.css'
import React, { useState } from 'react'

import { TOKEN_GATED_CONTENT_BACKEND_URL } from '../config'

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

	return (
		<div>
			<h1>Create item</h1>
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
	)
}

export default CreateItem
