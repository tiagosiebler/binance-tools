/*
  Some of the types used with binance. This list is minimal/incomplete.
*/
interface BinancePositionResponse {
  symbol: string; // symbol name
  initialMargin: string; // initial margin required with current mark price
  maintMargin: string; // maintenance margin required
  unrealizedProfit: string; // unrealized profit
  positionInitialMargin: string; // initial margin required for positions with current mark price
  openOrderInitialMargin: string; // initial margin required for open orders with current mark price
  leverage: string; // current initial leverage
  isolated: boolean; // if the position is isolated
  entryPrice: string; // average entry price
  maxNotional: string; // maximum available notional with current leverage
  positionSide: 'BOTH' | 'LONG' | 'SHORT'; // position side
  positionAmt: string; // position amount
}

export interface BinanceFuturesAccountResponse {
  positions: BinancePositionResponse[]
}

interface BinanceFuturesOrderResponse {
  symbol: string;
  status: 'FILLED' | 'CANCELED';
}

export type BinanceFuturesAllOrdersResponse = BinanceFuturesOrderResponse[];