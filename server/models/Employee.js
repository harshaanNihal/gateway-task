const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
	{
		name: { type: String, require: true },
		email: { type: String, unique: true },
		date: { type: Date },
		phoneNumber: { type: Number }
	},
	{ timestamps: true }
);

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;
