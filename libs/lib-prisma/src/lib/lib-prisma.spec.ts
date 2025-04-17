import { libPrisma } from './lib-prisma';

describe('libPrisma', () => {
  it('should work', () => {
    expect(libPrisma()).toEqual('lib-prisma');
  });
});
