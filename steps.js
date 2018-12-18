const webdriver = require('selenium-webdriver');
const driverCreator = require('./webDriver');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

let driver;

class testData {
	constructor(login, password) {
		this.login = login;
		this.password = password;
	}

}

async function go() {
	driver = driverCreator.getDriverSingleton();
	await testFreelancer();
}

function closedriver() {
	driver.quit();
}


async function testFreelancer() {
	await browser.get('https://www.freelancer.com/')
	let activeElement = await element(by.xpath('//a[text() = \'Log In\' and @class = \'LoginSection-btn\']'));
	await activeElement.click();
	activeElement = await element(by.css('.pinky-template .large-input'));
	await activeElement.sendKeys('testautomationuser990@gmail.com');
	activeElement = await element(by.id('password'));
	await activeElement.sendKeys('98979897aa');
	activeElement = await element(by.css('.btn-info:hover'));
	await activeElement.click();
	activeElement = await element(by.css('.gaf-container .WidgetUserDetails-username'));
	return activeElement;
}

module.exports = {
	go
}
