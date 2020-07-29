import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  clearInput(selector :string): Promise<void> {
    return element(by.css(selector)).clear() as Promise<void>;
  }

  setElementText(selector :string,texto:string): Promise<void> {
    return element(by.css(selector)).sendKeys(texto) as Promise<void>;
  }

  onclickButton(selector :string) : Promise<void>{
    return element(by.css(selector)).click() as Promise<void>;
  }

  getElementText(selector:string): Promise<string> {
    return element(by.css(selector)).getText() as Promise<string>;
  }

}
