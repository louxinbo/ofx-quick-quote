import { numberWithCommas } from '../helperFunctions';

describe('helper functions', () => {
  it('should return 111,000', () => {
    const num = '111000';
    expect(numberWithCommas(num)).toEqual('111,000');
  });
});
