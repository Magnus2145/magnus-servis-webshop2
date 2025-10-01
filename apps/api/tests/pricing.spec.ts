import { applyB2BMarkup, calculateGrossPrice } from '../src/utils/pricing';

describe('pricing utils', () => {
  it('calculates gross price with discount and VAT', () => {
    const price = calculateGrossPrice({ base: 1000, discountPercentage: 10, vatRate: 25 });
    expect(price).toBe(1125);
  });

  it('applies B2B markup correctly', () => {
    expect(applyB2BMarkup(100, 15)).toBe(115);
  });
});
