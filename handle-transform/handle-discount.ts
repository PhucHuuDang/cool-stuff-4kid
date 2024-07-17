import { formatCurrency } from "./formatCurrency";

export const calculateDiscountedPrice = (
  totalAmount: number,
  discountPercent?: number,
) => {
  if (discountPercent == null || isNaN(discountPercent)) {
    const formattedTotal = formatCurrency(totalAmount);
    return {
      formattedDiscountAmount: formatCurrency(0),
      formattedFinalTotal: formattedTotal,
      discountPercent: 0,
    };
  }

  const discountAmount = (totalAmount * discountPercent) / 100;
  const finalTotal = totalAmount - discountAmount;

  const formattedDiscountAmount = formatCurrency(discountAmount);
  const formattedFinalTotal = formatCurrency(finalTotal);

  // return { discountAmount, finalTotal };
  return { formattedDiscountAmount, formattedFinalTotal, discountPercent };
};
