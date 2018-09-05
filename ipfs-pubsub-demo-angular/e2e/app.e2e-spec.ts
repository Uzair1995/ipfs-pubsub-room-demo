import { IpfsPubsubDemoAngularPage } from './app.po';

describe('ipfs-pubsub-demo-angular App', () => {
  let page: IpfsPubsubDemoAngularPage;

  beforeEach(() => {
    page = new IpfsPubsubDemoAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
