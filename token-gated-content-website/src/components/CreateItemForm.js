import '../App.css'
import React from 'react'

class CreateItemForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tokenAddress: '',
			tokenId: '',
			balanceRequired: '1',
			contentRoute: '',
			contentName: '',
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChangeTokenAddress(event) {
		this.setState(Object.assign(this.state, { tokenAddress: event.target.value }))
	}

	handleChangeTokenId(event) {
		this.setState(Object.assign(this.state, { tokenId: event.target.value }))
	}

	handleChangeContentName(event) {
		this.setState(Object.assign(this.state, { contentName: event.target.value }))
	}

	handleChange(event) {
		console.log({ state: this.state })
		this.setState(Object.assign(this.state, { tokenAddress: event.target.value }))
	}

	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.value)
		event.preventDefault()
	}

	render() {
		console.log({ state: this.state })
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label>
						Token address:
						<input
							type="text"
							value={this.state.tokenAddress}
							onChange={this.handleChangeTokenAddress.bind(this)}
						/>
					</label>
				</div>
				<div>
					<label>
						Token id:
						<input type="text" value={this.state.tokenId} onChange={this.handleChange.bind(this)} />
					</label>
				</div>
				<div>
					<label>
						Balance required:
						<input
							type="text"
							value={this.state.balanceRequired}
							onChange={this.handleChange.bind(this)}
						/>
					</label>
				</div>
				<input type="submit" value="Submit" />
			</form>
		)
	}
}
export default CreateItemForm
