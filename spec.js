// spec.js
// const loginInput = element(by.css('.pinky-template .large-input'));
const until = protractor.ExpectedConditions

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000000;

describe('End to End AngularApp testing', function () {

  const loginField = element(by.css('input#username'));
  const passwordField = element(by.css('input#password'));
  const logInBtn = element(by.css('button#login_btn'));
  const usrPrfBtn = element(by.xpath('//a[@class=\'WidgetUserDetails-username\']'));
  const profileUsrField = element(by.className('profile-username-wrapper'));
  const addSkillBtn = element(by.id('add-skills-btn'));
  const skillSelectionWindowTitle = element(by.className('skill-selector-modal-title'));
  const skillSelectionSkillItems = element.all(by.css('.skill-select-bubble.is-selected'));
  const skillSelectionSkillFirstItem = element(by.css('.skill-select-bubble.is-selected'));
  const editPrflBtn = element(by.css('button[class=\'btn btn-large btn-info btn-edit-trigger\']'));
  const closeSkillSelectionBtn = element(by.css('.skill-selector-modal-header>button'));
  const profileSkillItems = element.all(by.className('VerificationsList-item ng-scope'))
  const jobsBtn = element(by.css('a[href=\'/jobs/myskills\']'));
  const worksSkillsItems = element.all(by.css('fl-tag-input[autocomplete*=\'ProjectsFilter.filterOptions.jobs\'] div.input-tag'));
  const clearSkillsBtn = element(by.css('li.filter-item-group button[ng-click=\'ProjectsFilter.clearSkills()\']'));
  const sidebarLogOutBtn = element(by.css('a[fltrackinglabel=\'SidebarLogout\']'));
  const startLogInBtn = element(by.css('a[href=\'/login\']'));

  // it('Fill login and password', async function () {
  //   await browser.waitForAngularEnabled(false);
  //   await browser.get('https://www.freelancer.com/login');
  //   await browser.wait(until.presenceOf(loginField), 15000);
  //   await loginField.sendKeys('testautomationuser990@gmail.com');
  //   await passwordField.sendKeys('98979897aa');
  // });

  // it('press Log In button', async function () {
  //   await browser.waitForAngularEnabled(false);
  //   await logInBtn.click();
  //   await browser.wait(until.presenceOf(usrPrfBtn), 15000);
  //   await browser.waitForAngularEnabled(true);
  //   expect(usrPrfBtn.getText()).toEqual('Aliaksandr K.');
  // });

  it('huge test', async function () {
    await browser.get('https://www.freelancer.com/login');
    await browser.wait(until.presenceOf(loginField), 15000);
    await loginField.sendKeys('testautomationuser990@gmail.com');
    await passwordField.sendKeys('98979897aa');
  });

  it('press Log In button', async function () {
    await browser.waitForAngularEnabled(false);
    await logInBtn.click();
    await browser.wait(until.presenceOf(usrPrfBtn), 15000);
    expect(usrPrfBtn.getText()).toEqual('Aliaksandr K.');
    await browser.waitForAngularEnabled(true);
  });

  it('Press "Profile" button', async function () {
    await usrPrfBtn.click();
    text = await profileUsrField.getText();
    getUserStatusText = await text.replace(/(((\n)Online)|((\n)Offline))+/g, '');
    expect(getUserStatusText).toEqual('Aliaksandr K.');
  });

  it('Press "Edit Profile" button', async function () {
    await editPrflBtn.click();
  });

  it('Press "Add skills" button', async function () {
    await browser.actions()
      .mouseMove(addSkillBtn)
      .click()
      .perform();
    await browser.wait(until.visibilityOf(skillSelectionWindowTitle), 15000);
    text = await skillSelectionWindowTitle.getText();
    expect(text).toContain('Select your skills and expertise');
  });

  it('Remove all skills', async function () {
    let skillsForEdit = [];
    await browser.wait(until.visibilityOf(skillSelectionSkillFirstItem), 15000);
    await skillSelectionSkillItems.then((skills) => {
      skills.forEach((skill) => {
        let someText = (skill.getText())
          .then(rawText => rawText.replace(/(\r\n\t|\n|\r\t)/gm, ''))
          .then(properText => properText.trim());
        skillsForEdit.push(someText);
        skill.click();
      });
    });
    expect(skillsForEdit.length).toEqual(4);
  });

  it('Check for skills after exit without save', async function () {
    let editableSkills = [];
    // await browser.wait(until.visibilityOf(closeSkillSelectionBtn), 5000);
    await closeSkillSelectionBtn.click();
    // await browser.wait(until.visibilityOf(profileSkillItems), 15000);
    await profileSkillItems
      .then((skills) => {
        skills.forEach((skill) => {
          let someText = (skill.getText())
            .then(rawText => rawText.replace(/(\r\n\t|\n|\r\t)/gm, ''))
            .then(properText => properText.trim());
          editableSkills.push(someText);
        });
      });
    //check for skills count to be the same, cause we haven't saved changes
    expect(editableSkills.length).toEqual(4);
  });

  it('Check for skills in jobs', async function () {
    let jobsSkills = [];
    await jobsBtn.click();
    // await browser.wait(until.visibilityOf(worksSkillsItems), 15000);
    await worksSkillsItems.then((skills) => {
      skills.forEach((skill) => {
        let someText = (skill.getText()).then(rawText => rawText.replace(/(\r\n\t|\n|\r\t)/gm, '')).then(properText => properText.trim());
        jobsSkills.push(someText);
      });
    });
    expect(jobsSkills.length).toEqual(4);
  });

  it('Check for skills  after clear button', async function () {
    jobsSkills = [];
    await clearSkillsBtn.click();
    await worksSkillsItems
      .then((skills) => {
        skills.forEach((skill) => {
          let someText = (skill.getText()).then(rawText => rawText.replace(/(\r\n\t|\n|\r\t)/gm, '')).then(properText => properText.trim());
          jobsSkills.push(someText);
        });
      });
    expect(jobsSkills.length).toEqual(0);
  });

  it('Click Sidebar Button', async function () {
    activeElement = await element(by.css('app-sidebar>fl-button'));
    await activeElement.click();
  });

  it('Click Logout Button', async function () {
    // await browser.wait(until.visibilityOf(element(by.css('a[fltrackinglabel=\'SidebarLogout\']'))), 15000);
    await sidebarLogOutBtn.click();
    // await browser.wait(until.visibilityOf(startLogInBtn), 15000);
    expect(startLogInBtn.getText()).toEqual('Log In');
  });
});
describe('non-Angular page test', function () {
  const searchBox = element(by.css('input#twotabsearchtextbox'));
  const startSearchBtn = element(by.css('input.nav-input[value=\'Go\']'));
  const itemForSearch = element(by.css('div.s-item-container h2[data-attribute*=\'Lenovo IdeaPad 2019\']'));
  const productNameFull = element(by.css('span#productTitle'));

  it('start search at www.amazon.com', async function () {
    browser.waitForAngularEnabled(false);
    browser.get('https://www.amazon.com');
    // await browser.wait(until.visibilityOf(searchBox), 15000);
    searchBox.sendKeys('Lenovo');
  });

  it('check for title of product at www.amazon.com', async function () {
    // await browser.wait(until.visibilityOf(startSearchBtn), 15000);
    startSearchBtn.click();
  });

  it('check for title of product at www.amazon.com', async function () {
    await browser.wait(until.visibilityOf(element(by.css('div.s-item-container h2[data-attribute*=\'Lenovo IdeaPad 2019\']'))), 15000);
    itemForSearch.click();
  });

  it('check for title of product at www.amazon.com', async function () {
    // await browser.wait(until.visibilityOf(productNameFull), 15000);
    await expect(productNameFull.getText()).toContain('Lenovo IdeaPad 2019');
  });

});