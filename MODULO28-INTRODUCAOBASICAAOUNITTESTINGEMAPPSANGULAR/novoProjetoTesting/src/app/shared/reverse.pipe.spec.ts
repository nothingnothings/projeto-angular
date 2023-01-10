import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  let reversePipe = new ReversePipe();

  it('should create', () => {
    expect(reversePipe.transform('hello')).toEqual('olleh');
  });
});
