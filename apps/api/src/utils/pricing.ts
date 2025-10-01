export type PriceInput = {
  base: number;
  discountPercentage?: number;
  vatRate?: number;
};

export function calculateGrossPrice({ base, discountPercentage = 0, vatRate = 25 }: PriceInput) {
  const discounted = base - base * (discountPercentage / 100);
  const gross = discounted * (1 + vatRate / 100);
  return Math.round(gross * 100) / 100;
}

export function applyB2BMarkup(price: number, markupPercentage: number) {
  return Math.round(price * (1 + markupPercentage / 100) * 100) / 100;
}
