import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ValidateEmail = (mail) => {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
		return true;
	}
	return false;
};

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			date: '',
			phoneNumber: ''
		};
	}

	componentDidMount() {
		if (this.props.data) {
			this.setState({
				name: this.props.data.name,
				email: this.props.data.email,
				date: this.props.data.date,
				phoneNumber: this.props.data.phoneNumber
			});
		}
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSubmit = (e) => {
		e.preventDefault();

		const data = this.state;
		if (!(data.name && data.phoneNumber && data.email && data.date)) {
			alert('all Fields Required');
			return;
		}
		if (!ValidateEmail(data.email)) {
			alert('invalid email');
			return;
		}
		if (!ValidateEmail(data.email)) {
			alert('invalid email');
			return;
		}

		this.props.onSubmit(data);
	};

	render() {
		return (
			<section>
				<form onSubmit={this.handleSubmit}>
					<div className="">
						<label htmlFor="form-name">Name</label>
						<input
							className=""
							onChange={this.handleChange}
							type="text"
							id="form-name"
							name="name"
							value={this.state.name}
						/>
					</div>
					<div className="">
						<label htmlFor="form-email">Email</label>
						<input
							className=""
							onChange={this.handleChange}
							type="text"
							id="form-email"
							name="email"
							value={this.state.email}
						/>
					</div>
					<div className="">
						<label htmlFor="form-date">date</label>
						<input
							className=""
							onChange={this.handleChange}
							type="date"
							id="form-date"
							name="date"
							value={this.state.date}
						/>
					</div>
					<div className="">
						<label htmlFor="form-phone">Phone Number</label>
						<input
							className=""
							onChange={this.handleChange}
							type="number"
							id="form-phone"
							name="phoneNumber"
							value={this.state.phoneNumber}
						/>
					</div>
					<div>
						<Link className="button" to={this.props.back}>
							Back
						</Link>
						<input className="button-primary" type="submit" value="Submit" />
					</div>
				</form>
			</section>
		);
	}
}

export default Form;
