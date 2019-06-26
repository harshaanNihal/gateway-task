const Employee = require('../models/Employee');

//Helper Modules
const invalidateEmployeeData = (data) => {
	return false;
};

module.exports = {
	test: (req, res, next) => {
		res.json({
			message: 'welcome user'
		});
	},

	//reguster User Done
	creatEmployee: (req, res, next) => {
		console.log(req.body);
		const { email, date, name, phoneNumber } = req.body; // add properties

		const errorInData = invalidateEmployeeData(req.body);

		if (errorInData) {
			return res.status(400).json({
				status: false,
				message: dataError
			});
		}
		const newEmployee = new Employee(req.body);

		newEmployee.save((err) => {
			if (!err)
				return res.status(200).json({
					status: true,
					message: 'Employee Created'
				});
			else {
				console.log(err);
				return res.status(500).json({
					status: false,
					message: 'Something Went Wrong'
				});
			}
		});
	},

	readAllEmployees: (req, res, next) => {
		Employee.find({}, (err, employees) => {
			if (!err)
				return res.status(200).json({
					status: true,
					employees
				});
			return res.status(500).json({
				status: false,
				message: 'Something Went Wrong'
			});
		});
	},

	readEmployee: (req, res, next) => {
		const id = req.params.id;

		Employee.findById(id, (err, employee) => {
			if (!err && employee)
				return res.status(200).json({
					status: true,
					employee
				});

			//if no employee in DB
			if (!employee) {
				return res.status(400).json({
					status: false,
					message: 'Invalid Employee Id'
				});
			}
			return res.status(500).json({
				status: false,
				message: 'Something Went Wrong'
			});
		});
	},

	updateEmployee: (req, res, next) => {
		const id = req.params.id;
		const data = req.body;
		const errorInData = invalidateEmployeeData(data);
		if (errorInData) {
			return res.status(400).json({
				status: false,
				message: dataError
			});
		}

		Employee.findByIdAndUpdate(id, data, (err) => {
			if (!err) {
				return res.status(200).json({
					status: true,
					message: 'Employee Updated'
				});
			}

			return res.status(500).json({
				status: false,
				message: 'Something Went Wrong'
			});
		});
	},

	deleteEmployee: (req, res, next) => {
		const id = req.params.id;
		Employee.findByIdAndRemove(id, (err) => {
			if (!err) {
				return res.status(200).json({
					status: true,
					message: 'Employee Deleted'
				});
			}

			return res.status(500).json({
				status: false,
				message: 'Something Went Wrong'
			});
		});
	}
};
