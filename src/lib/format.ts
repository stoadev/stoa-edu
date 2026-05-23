export const formatPrice = (price: number, currency: string) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency }).format(price)
