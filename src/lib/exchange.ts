type OrderId = string;

/**
 * Generate a new order ID for futures trading.
 */
export function generateNewFuturesOrderId(): OrderId {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let randomstring = 'x-15PC4ZJy';
  for (let i = 0; i < 20; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
}

/**
 * Generate a new order ID for spot trading.
 */
export function generateNewSpotOrderId(): OrderId {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let randomstring = 'x-15PC4ZJy';
  for (let i = 0; i < 20; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
}