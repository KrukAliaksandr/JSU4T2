// spec.js
// const loginInput = element(by.css('.pinky-template .large-input'));
const secondNumber = element(by.model('second'));
const goButton = element(by.id('gobutton'));
const latestResult = element(by.binding('latest'));
const history = element.all(by.repeater('result in memory'));
const webdriver = require('selenium-webdriver');
const until = protractor.ExpectedConditions

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

describe('AngularApp testing', function () {

  beforeEach(function () {
    browser.get('https://www.freelancer.com/login');
  
  });

  it('huge test', async function () {
    await browser.wait(until.presenceOf(element(by.css('input#username'))), 15000);
    let activeElement = await element(by.css('input#username'));
    await activeElement.sendKeys('testautomationuser990@gmail.com');
    activeElement = await element(by.css('input#password'));
    await activeElement.sendKeys('98979897aa');
    activeElement = await element(by.css('button#login_btn'));
    // activeElement = await element(by.id('login_btn'));
    await browser.waitForAngularEnabled(false);
    await activeElement.click();
    await browser.wait(until.presenceOf(element(by.xpath('//a[@class=\'WidgetUserDetails-username\']'))), 15000);
    await browser.waitForAngularEnabled(true);
    activeElement = await element(by.xpath('//a[@class=\'WidgetUserDetails-username\']'));
    await expect(activeElement.getText()).toEqual('Aliaksandr K.');
    await activeElement.click();
    activeElement = await element(by.className('profile-username-wrapper'));
    let text = await (activeElement.getText());
    text = await text.replace(/(((\n)Online)|((\n)Offline))+/g, '');
    await expect(text).toEqual('Aliaksandr K.');
    activeElement = await element(by.css('button[class=\'btn btn-large btn-info btn-edit-trigger\']'));
    await activeElement.click();
    activeElement = await element(by.id('add-skills-btn'));
    await browser.actions()
      .mouseMove(activeElement)
      .click()
      .perform();
    await browser.wait(until.visibilityOf(element(by.className('skill-selector-modal-title'))), 15000);
    activeElement = await element(by.className('skill-selector-modal-title'));
    // browser.sleep(5000);
    text = await activeElement.getText();
    await expect(text).toContain('Select your skills and expertise');
    let skillsForEdit = [];
    await browser.wait(until.visibilityOf(element(by.css('.skill-select-bubble.is-selected'))), 15000);
    await element.all(by.css('.skill-select-bubble.is-selected')).then((skills) => {
      skills.forEach((skill) => {
        let someText = (skill.getText()).then(rawText => rawText.replace(/(\r\n\t|\n|\r\t)/gm, '')).then(properText => properText.trim());
        skillsForEdit.push(someText);
        skill.click();
      });
    });
    await expect(skillsForEdit.length).toEqual(4);
    await browser.wait(until.visibilityOf(element(by.css('.skill-selector-modal-header>button'))), 5000);
    activeElement = await element(by.css('.skill-selector-modal-header>button'));
    await activeElement.click();
    let editableSkills = [];
    await browser.wait(until.visibilityOf(element(by.className('VerificationsList-item ng-scope'))), 15000);
    await element.all(by.className('VerificationsList-item ng-scope')).then((skills) => {
      skills.forEach((skill) => {
        let someText = (skill.getText()).then(rawText => rawText.replace(/(\r\n\t|\n|\r\t)/gm, '')).then(properText => properText.trim());
        editableSkills.push(someText);
      });
    });
    await expect(editableSkills.length).toEqual(skillsForEdit.length);
    activeElement = await element(by.css('a[href=\'/jobs/myskills\']'));
    await activeElement.click();
    let jobsSkills = [];
    await browser.wait(until.visibilityOf(element(by.css('fl-tag-input[autocomplete*=\'ProjectsFilter.filterOptions.jobs\'] div.input-tag'))), 15000);
    await element.all(by.css('fl-tag-input[autocomplete*=\'ProjectsFilter.filterOptions.jobs\'] div.input-tag')).then((skills) => {
      skills.forEach((skill) => {
        let someText = (skill.getText()).then(rawText => rawText.replace(/(\r\n\t|\n|\r\t)/gm, '')).then(properText => properText.trim());
        jobsSkills.push(someText);
      });
    });
    await expect(jobsSkills.length).toEqual(editableSkills.length);
    activeElement = await element(by.css('li.filter-item-group button[ng-click=\'ProjectsFilter.clearSkills()\']'));
    activeElement.click();
    jobsSkills = [];
    await element.all(by.css('fl-tag-input[autocomplete*=\'ProjectsFilter.filterOptions.jobs\'] div.input-tag')).then((skills) => {
      skills.forEach((skill) => {
        let someText = (skill.getText()).then(rawText => rawText.replace(/(\r\n\t|\n|\r\t)/gm, '')).then(properText => properText.trim());
        jobsSkills.push(someText);
      });
    });
    await expect(jobsSkills.length).toEqual(0);
    activeElement = await element(by.css('app-sidebar>fl-button'));
    activeElement.click();
    await browser.wait(until.visibilityOf(element(by.css('a[fltrackinglabel=\'SidebarLogout\']'))), 15000);
    activeElement = await element(by.css('a[fltrackinglabel=\'SidebarLogout\']'));
    activeElement.click();
    await browser.wait(until.visibilityOf(element(by.css('a[href=\'/login\']'))), 15000);
    activeElement = await element(by.css('a[href=\'/login\']'));
    await expect(activeElement.getText()).toEqual('Log In');
    browser.sleep(5000);
  });
});

describe('non-Angular page test', function () {

  beforeEach(function () {
    browser.waitForAngularEnabled(false);
    browser.get('https://www.amazon.com');
  });

  it('should have a title', async function () {
    await browser.wait(until.visibilityOf(element(by.css('input#twotabsearchtextbox'))), 15000);
    activeElement = await element(by.css('input#twotabsearchtextbox'));
    activeElement.sendKeys('Lenovo');
    await browser.wait(until.visibilityOf(element(by.css('input.nav-input[value=\'Go\']'))), 15000);
    activeElement = await element(by.css('input.nav-input[value=\'Go\']'));
    activeElement.click();
    await browser.wait(until.visibilityOf(element(by.css('div.s-item-container h2[data-attribute*=\'Lenovo IdeaPad 2019\']'))), 15000);
    activeElement = await element(by.css('div.s-item-container h2[data-attribute*=\'Lenovo IdeaPad 2019\']'));
    activeElement.click();
    await browser.wait(until.visibilityOf(element(by.css('span#productTitle'))), 15000);
    activeElement = await element(by.css('span#productTitle'));
    await expect(activeElement.getText()).toContain('Lenovo IdeaPad 2019');
  });
});