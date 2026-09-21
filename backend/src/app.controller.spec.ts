import { AppController } from './app.controller';

describe('AppController', () => {
  it('returns ok status on /health', () => {
    const controller = new AppController();
    expect(controller.health()).toEqual({ status: 'ok', service: 'iico-backend' });
  });
});
