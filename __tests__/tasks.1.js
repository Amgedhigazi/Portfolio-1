const puppeteer = require("puppeteer");
const path = require('path');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try { this.puppeteer.close(); } catch (e) { }
    done();
});

describe("HTML structure & Bootstrap CDN", () => {
    it("Index file should contain appropriate meta tags", async () => {
        try {
            const metaTags = await page.$$('meta');
            expect(metaTags.length).toBeGreaterThan(1);
        } catch (err) {
            throw err;
        }
    });
    it("Index file Should contain a title tag that is not empty", async () => {
        try {
            const title = await page.$eval('title', el => el.innerHTML);
            expect(title).toBeTruthy()
        } catch (err) {
            throw err;
        }
    });
    it("Bootstrap CDN Should be present", async () => {
        try {
            const bootstrapCDN = await page.$eval('head', el => el.innerHTML);
            expect(bootstrapCDN).toContain('bootstrap');
        } catch (err) {
            throw err;
        }
    });
});
describe('Page Layout', () => {
    it('Page should use flex layout', async() => {
        try {
            const flex = await page.$$eval('*', el => Array.from(el).map(e => getComputedStyle(e).getPropertyValue('display')));
            expect(flex).toContain('flex');
            } catch (err) {
            throw err;
            }
    })
    it("Bootstrap Nav Component should be present on the page", async () => {
        try {
            const navComponent = await page.$eval('body', el => el.innerHTML);
            expect(navComponent).toContain('nav');
        } catch (err) {
            throw err;
        }
    });
    it("Page Should Contain 3 Columns", async () => {
        try {
            const columns = await page.$$('[class^="col"]');
            expect(columns.length).toBeGreaterThan(2);
        } catch (err) {
            throw err;
        }
    });
    it("Page Should contain 4 Cards", async () => {
        try {
            const cards = await page.$$('.card');
            expect(cards.length).toBeGreaterThan(3);
        } catch (err) {
            throw err;
        }
    });
    it("Page Should contain a Footer section", async () => {
        try {
            const footer = await page.$eval('footer', el => el.innerHTML);
            expect(footer).not.toBe('');
            expect(footer).toBeTruthy();
        } catch (err) {
            throw err;
        }
    });
});