import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

class Home extends Component {
	render() {
		return (
			<section className="home">
				<h1>Welcome</h1>
				<Link className="button" to="/employees">
					Show Employees
				</Link>
				<Link className="button" to="/employee/new">
					Add New Employees
				</Link>
			</section>
		);
	}
}

export default Home;
