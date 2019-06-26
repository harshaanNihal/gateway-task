const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const port = 8000;

mongoose.connect('mongodb://localhost/gateway-mern', { useNewUrlParser: true }, function(err, connection) {
	if (err) throw err;
	else console.log('connected to mongodb');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV === 'development') {
	var webpack = require('webpack');
	var webpackConfig = require('./webpack.config');
	var compiler = webpack(webpackConfig);

	app.use(
		require('webpack-dev-middleware')(compiler, {
			noInfo: true,
			publicPath: webpackConfig.output.publicPath
		})
	);

	app.use(require('webpack-hot-middleware')(compiler));
}

app.use(cors());

app.use('/api/v1', require('./server/routes/api'));
app.use(require('./server/routes/index'));

app.listen(port, () => {
	console.log(`server is running on http://localhost:${port}`);
});
