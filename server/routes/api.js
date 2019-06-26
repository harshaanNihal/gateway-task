const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const employeeController = require('../controllers/employee.controllers');

router.get('/employees', employeeController.readAllEmployees);

router.post('/employee/new', employeeController.creatEmployee);

router.get('/employee/:id', employeeController.readEmployee);

router.put('/employee/:id', employeeController.updateEmployee);

router.delete('/employee/:id', employeeController.deleteEmployee);

module.exports = router;
