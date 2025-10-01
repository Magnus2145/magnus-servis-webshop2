import { parseBrandFilter, toggleBrandFilter } from '../src/lib/filters';

describe('brand filter helpers', () => {
  it('returns empty string when brand missing', () => {
    const params = new URLSearchParams();
    expect(parseBrandFilter(params)).toBe('');
  });

  it('returns value when brand exists', () => {
    const params = new URLSearchParams('brand=icematic');
    expect(parseBrandFilter(params)).toBe('icematic');
  });

  it('toggles brand on', () => {
    const params = new URLSearchParams();
    expect(toggleBrandFilter(params, 'elframo')).toBe('brand=elframo');
  });

  it('toggles brand off', () => {
    const params = new URLSearchParams('brand=icematic');
    expect(toggleBrandFilter(params, '')).toBe('');
  });
});
