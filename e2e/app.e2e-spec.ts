import { HomeAutomationControllerPage } from './app.po';

describe('home-automation-controller App', function() {
  let page: HomeAutomationControllerPage;

  beforeEach(() => {
    page = new HomeAutomationControllerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
