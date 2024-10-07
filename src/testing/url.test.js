
const s = require('selenium-webdriver');

describe('Shorten URL', () => {
  let driver;

  beforeAll(async () => {
    driver = await new s.Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('valid url', async () => {
    await driver.get(`http://localhost/`);

  
            const uv = "https://dev.mysql.com/doc/relnotes/connector-nodejs/en/";

           await driver.wait(s.until.elementLocated(s.By.id('targetUrl')), 4000);
           //fill out the form
           await driver.findElement(s.By.id('targetUrl')).click();
           await driver.findElement(s.By.id('targetUrl')).sendKeys(uv, s.Key.ENTER);
           await driver.wait(s.until.elementLocated(s.By.id('us')), 1000);
           let us = await driver.findElement(s.By.id('us')).getAttribute('innerHTML');
           //verify gen short url is right
           expect(us).toContain('/c/');

           await driver.findElement(s.By.id('copy-icon')).click();
           await driver.findElement(s.By.id('targetUrl')).click();
           await driver.findElement(s.By.id('targetUrl')).clear();
           await driver.findElement(s.By.id('targetUrl')).sendKeys(s.Key.CONTROL, 'v');
           up = await driver.findElement(s.By.id('targetUrl')).getAttribute('value');
           //verify copied short url is right
           expect(us).toBe(up);
           
        
//click short url
           await driver.findElement(s.By.id('us')).click();
             // Get all window handles (tabs)
        let windowHandles = await driver.getAllWindowHandles();

        // Switch to the new tab (the last one in the list)
        await driver.switchTo().window(windowHandles[windowHandles.length - 1]);

        await driver.wait(s.until.urlIs(uv), 10000); // Replace with the expected URL

           let ub = await driver.getCurrentUrl();
           expect(ub).toBe(uv);
           

  }, 60000);


  test('invalid url: non-ascii characters', async () => {
    await driver.get(`http://localhost/`);

            const uv = "http://草花.cn";

           await driver.wait(s.until.elementLocated(s.By.id('targetUrl')), 4000);
           //fill out the form
           await driver.findElement(s.By.id('targetUrl')).click();
           await driver.findElement(s.By.id('targetUrl')).sendKeys(uv, s.Key.ENTER);

           let us = await driver.findElement(s.By.id('result')).getAttribute('innerHTML');           
           expect(['', '<p>Error: Invalid URL</p>']).toContain(us);

    

  });

  test('invalid url: protocol', async () => {
    await driver.get(`http://localhost/`);

  
            const uv = "feab.gsjn";

           await driver.wait(s.until.elementLocated(s.By.id('targetUrl')), 4000);
           //fill out the form
           await driver.findElement(s.By.id('targetUrl')).click();
           await driver.findElement(s.By.id('targetUrl')).sendKeys(uv, s.Key.ENTER);

           let us = await driver.findElement(s.By.id('result')).getAttribute('innerHTML');           
           expect(['', '<p>Error: Invalid URL</p>']).toContain(us);

    

  });


  
  test('invalid url: special or reserved characters', async () => {
    await driver.get(`http://localhost/`);

  
            const uv = "https:/f3<r532423>fhewgfw\gbwhgw.com";

           await driver.wait(s.until.elementLocated(s.By.id('targetUrl')), 4000);
           //fill out the form
           await driver.findElement(s.By.id('targetUrl')).click();
           await driver.findElement(s.By.id('targetUrl')).sendKeys(uv, s.Key.ENTER);

           let us = await driver.findElement(s.By.id('result')).getAttribute('innerHTML');           
           expect(['', '<p>Error: Invalid URL</p>']).toContain(us);

    

  });




});