const s = require('selenium-webdriver');

describe('Login of Report Generator', () => {
  let driver;

  beforeAll(async () => {
    driver = await new s.Builder().forBrowser('chrome').build();
    
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('valid pw', async () => {
    pw = 'authpw';

    a = `http://localhost/rpt`
console.log(a);

    await driver.get(`http://localhost/rpt`);
    
    
    await driver.wait(s.until.elementLocated(s.By.id('pw')), 4000);
    //fill out the form
    await driver.findElement(s.By.id('pw')).click();
    await driver.findElement(s.By.id('pw')).sendKeys(pw, s.Key.ENTER);
    await driver.wait(s.until.elementLocated(s.By.css('h1')), 4000);
    let t = await driver.findElement(s.By.css('h1')).getAttribute('innerHTML');           
    expect(t).toBe('Generated Report');
    
  });


test('invalid pw', async () => {
    await driver.get(`http://localhost/rpt`);
    pw = 'authpW';
   
    await driver.wait(s.until.elementLocated(s.By.id('pw')), 4000);
    //fill out the form
    await driver.findElement(s.By.id('pw')).click();
    await driver.findElement(s.By.id('pw')).sendKeys(pw, s.Key.ENTER);

    await driver.wait(s.until.elementLocated(s.By.id('result')), 4000);
    let r = await driver.findElement(s.By.id('result')).getAttribute('innerHTML');
    
expect(r).toBe('Invalid password');
});

});
