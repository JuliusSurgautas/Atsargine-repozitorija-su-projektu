export const calculateTotalWithoutVAT = (cartItems) => {
  return cartItems.reduce((acc, { price, quantity = 1 }) => {
    return acc + (parseFloat(price) || 0) * quantity;
  }, 0);
};

export const calculateVAT = (total) => total * 0.21;

export const calculateTotalWithVAT = (totalWithoutVAT) =>
  totalWithoutVAT * 1.21;
