import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';


describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(async () => {
    page = new AppPage();
    await page.navigateTo();
  });

  // it('should display welcome message', () => {
  //   page.navigateTo();
  //   expect(page.getTitleText()).toEqual('apome-angular app is running!');
  // });

  it('Mensajes', async () =>{
    await element(by.css('app-root .e2eTest #inputText')).clear();
    await element(by.css('.e2eTest #inputText')).sendKeys('Mundo');
    await element(by.css('app-root .e2eTest #btnText')).click();
    expect(element(by.css('app-root .e2eTest #msg')).getText()).toEqual('Hola Mundo');
  })

  // it('Mensajes02', async () =>{
  //   await page.clearInput('app-root .e2eTest #inputText');
  //   await page.setElementText('.e2eTest #inputText','Mundo');
  //   await page.clearInput('app-root .e2eTest #btnText');
  //   expect(page.getElementText('app-root .e2eTest #msg')).toEqual('Hola Mundo');
  // })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
