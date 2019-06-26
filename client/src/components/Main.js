import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import ShowEmployee from './ShowEmployee';
import Message from './Message';
import NoMatch from './NoMatch';
import Home from './Home';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ''
		};
	}

	handleMessage = (msg) => {
		this.setState({ message: msg });
	};

	render() {
		return (
			<div className="App-wrapper">
				<BrowserRouter>
					<Fragment>
						<Message message={this.state.message} handleMessage={this.handleMessage} />
						<div className="container">
							<Switch>
								<Route exact path="/" component={Home} />

								<Route
									exact
									path="/employee/new"
									render={(props) => <AddEmployee {...props} handleMessage={this.handleMessage} />}
								/>

								<Route
									exact
									path="/employee/edit/:id"
									render={(props) => <EditEmployee {...props} handleMessage={this.handleMessage} />}
								/>

								<Route
									exact
									path="/employees"
									render={(props) => <ShowEmployee {...props} handleMessage={this.handleMessage} />}
								/>

								<Route component={NoMatch} />
							</Switch>
						</div>
					</Fragment>
				</BrowserRouter>
			</div>
		);
	}
}

export default Main;
