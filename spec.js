const steps = require('./steps');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

describe('Protractor Demo App', function() {
	it('should have a title', async function() {
		const CredidentialsElement = await steps.go();
		await expect(CredidentialsElement.getText()).toEqual('Deutschland');
	});
});
