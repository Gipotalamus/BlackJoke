import { BlackjokeUIPage } from './app.po';

describe('blackjoke-ui App', function() {
  let page: BlackjokeUIPage;

  beforeEach(() => {
    page = new BlackjokeUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
