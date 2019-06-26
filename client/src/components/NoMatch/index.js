import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './noMatch.scss';

class NoMatch extends Component {
	render() {
		return (
			<section className="no-match">
				<div className="container my-5">
					<h1 className="strong">ERROR 404</h1>
					<h1>Not all who wander are lost.</h1>
					<p>You totally are, though.</p>
					<p>
						<Link to="/">
							<button className="btn btn-success">Start a new quest</button>
						</Link>
					</p>
				</div>
			</section>
		);
	}
}

export default NoMatch;
