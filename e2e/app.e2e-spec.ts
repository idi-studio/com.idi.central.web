import { Com.Idi.Central.WebPage } from './app.po';

describe('com.idi.central.web App', () => {
  let page: Com.Idi.Central.WebPage;

  beforeEach(() => {
    page = new Com.Idi.Central.WebPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
