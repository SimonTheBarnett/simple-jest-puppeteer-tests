//this is the import syntax supported by jest
const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

// this is the test done as an anonymous function (right hand side)
// had to do the following terminal input to get jest suggestions to work: npm i @types/jest
// can be good to have multiple tests to eliminate false positives...
// for example if someone just makes the method called return the exact text the test expects.
test('should output the name and age', () => {
    const text1 = generateText('Simon', 38);
    expect(text1).toBe('Simon (38 years old)');
    const text2 = generateText('Luke', 29);
    expect(text2).toBe('Luke (29 years old)');
});

test('should output data-less text', () => {
    const text = generateText('', null);
    expect(text).toBe(' (null years old)');
});

test('should generate a valid text output', () => {
    const text = checkAndGenerate('Simon', 38);
    expect(text).toBe('Simon (38 years old)')
});

// adding async and await below in this way allows for waiting for chrome to start and return result
test('should create an element with text and correct class', async () => {
    const browser = await puppeteer.launch({
        headless: true,
        //slowMo: 80,
        //args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.goto(
        'file:///C:/Users/barne/OneDrive/Documents/webDev/dev/testing-01-starting-setup/index.html'
    )
    await page.click('#name');
    await page.type('#name', 'Simon');
    await page.click('#age');
    await page.type('#age', '38');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent)
    expect(finalText).toBe('Simon (38 years old)');

}, 10000);

