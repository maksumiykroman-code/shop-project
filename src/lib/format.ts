export function formatMoney(cents: number) {
  const value = cents / 100;
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

