import React, { Component } from 'react';
import Form from '../Form';
import config from '../../config';

class AddEmployee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {}
		};
	}

	createEmployee = (formdata) => {
		console.log(formdata, `add formdata `);

		fetch(`${config.BASE_API_URL}/employee/new`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formdata)
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data, `add data `);
				if (data.status) {
					this.props.handleMessage(data.message);
					this.props.history.push('/employees');
				} else {
					this.props.handleMessage(data.message);
				}
			});
	};

	render() {
		return (
			<section className="add-employee">
				<div className="title">
					<h3>Add Employee</h3>
					<hr />
				</div>
				<Form data={null} onSubmit={this.createEmployee} back={'/'} />
			</section>
		);
	}
}

export default AddEmployee;
