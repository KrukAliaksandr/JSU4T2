// conf.js
exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['spec1.js'],
	capabilities: {'browserName': 'chrome'},
};