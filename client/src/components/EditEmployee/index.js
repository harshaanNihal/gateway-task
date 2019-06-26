import React, { Component } from 'react';
import Form from '../Form';
import config from '../../config';

class EditEmployee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			id: ''
		};
	}
	componentDidMount() {
		const id = this.props.match.params.id;
		fetch(`${config.BASE_API_URL}/employee/${id}`).then((res) => res.json()).then((data) => {
			if (data.status) {
				this.props.handleMessage(data.message);
				const empData = {
					name: data.employee.name,
					email: data.employee.email,
					phoneNumber: data.employee.phoneNumber,
					date: data.employee.date.split('T')[0]
				};
				this.setState({
					id: this.props.match.params.id,
					data: empData
				});
			} else {
				this.props.handleMessage(data.message);
			}
		});

		this.setState({ id: this.props.match.params.id });
	}

	updateEmployee = (formdata) => {
		fetch(`${config.BASE_API_URL}/employee/${this.state.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formdata)
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status) {
					this.props.handleMessage(data.message);
					this.props.history.push('/employees');
				} else {
					this.props.handleMessage(data.message);
				}
			});
	};

	render() {
		console.log(Boolean(this.state.data));
		return (
			<section className="edit-employee">
				<div className="title">
					<h3>Edit Employee</h3>
					<hr />
				</div>
				{this.state.data ? (
					<Form data={this.state.data} onSubmit={this.updateEmployee} back={'/employees'} />
				) : (
					<h4>invalid User </h4>
				)}
			</section>
		);
	}
}

export default EditEmployee;
