import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';

class ShowEmployee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allEmployees: []
		};
	}

	handleEdit = (id) => {
		this.props.history.push(`/employee/edit/${id}`);
	};

	convertDateToStr = (date) => {
		var date = new Date(date);
		var dd = date.getDate();
		var mm = date.getMonth() + 1; //January is 0!

		var yyyy = date.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}
		var strDate = dd + '/' + mm + '/' + yyyy;
		return strDate;
	};

	handleDel = (id) => {
		fetch(`${config.BASE_API_URL}/employee/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.status) {
					this.props.handleMessage(data.message);
					this.fetchEmployees();
				} else {
					this.props.handleMessage(data.message);
				}
			});
	};

	componentDidMount() {
		this.fetchEmployees();
	}

	fetchEmployees = () => {
		fetch(`${config.BASE_API_URL}/employees`).then((res) => res.json()).then((data) => {
			console.log(data, `show data `);
			if (data.status) {
				this.setState({ allEmployees: data.employees });
			} else {
				this.props.handleMessage(data.message);
			}
		});
	};

	render() {
		const { allEmployees } = this.state;
		return (
			<section className="show-employees">
				<Link className="button" to="/">
					GO TO HOME
				</Link>
				<table class="u-full-width">
					<thead>
						<tr>
							<th>S.No</th>
							<th>Name</th>
							<th>Email</th>
							<th>Date</th>
							<th>Phone Number</th>
							<th>options</th>
						</tr>
					</thead>
					<tbody>
						{allEmployees &&
							allEmployees.map((emp, index) => {
								const date = this.convertDateToStr(emp.date);
								console.log(date);
								return (
									<tr key={emp._id}>
										<td>{index + 1}</td>
										<td>{emp.name}</td>
										<td>{emp.email}</td>
										<td>{date}</td>
										<td>{emp.phoneNumber}</td>
										<td>
											<button onClick={() => this.handleEdit(emp._id)}>Edit</button>
											<button onClick={() => this.handleDel(emp._id)}>Delete</button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</section>
		);
	}
}

export default ShowEmployee;
