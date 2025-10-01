export function parseBrandFilter(searchParams: URLSearchParams) {
  const brand = searchParams.get('brand');
  return brand ?? '';
}

export function toggleBrandFilter(searchParams: URLSearchParams, brand: string) {
  const params = new URLSearchParams(searchParams);
  if (brand) {
    params.set('brand', brand);
  } else {
    params.delete('brand');
  }
  return params.toString();
}
