/**
 * Simple panic script. Connect to exchange, query open positions and close them all.
 */

import Binance from "node-binance-api";
import { getAccounts } from "../lib/config";
import { BinanceFuturesAccountResponse, BinanceFuturesAllOrdersResponse } from "../lib/binancetypes";
import { generateNewFuturesOrderId } from "../lib/exchange";

const options = {
  // cancel orders when closing positions
  cancelOrders: true,

  // allow positions in loss to be closed
  allowCloseInLoss: true,
}

async function closePositionsForAccount(api_key: string, api_secret: string, desc: string) {
  const logger = (...params) => {
    console.log(new Date(), '|', desc, '|', ...params);
  }

  const binance = new Binance().options({
    APIKEY: api_key,
    APISECRET: api_secret,
  });

  logger('Checking positions...');
  const accountState: BinanceFuturesAccountResponse = await binance.futuresAccount();
  const positions = accountState.positions.filter(position => parseFloat(position.positionAmt ) != 0);

  if (positions?.length === 0) {
    logger('No positions found. Skipping.');
    return;
  }

  if (options.cancelOrders) {
    const allOrders: BinanceFuturesAllOrdersResponse = await binance.futuresAllOrders();
    const openOrders = allOrders.filter(order => order.status != 'FILLED' && order.status != 'CANCELED');

    logger(`Cancelling ${openOrders.length} orders...`);
    console.table(openOrders);
    await Promise.allSettled(positions.map((position) => {
      const symbol = position.symbol?.toUpperCase();

      // no orders for this symbol
      if (!openOrders.filter(order => order.symbol?.toUpperCase() === symbol)) {
        return;
      }

      // trigger cancel all for symbol
      return binance.futuresCancelAll(symbol);
    }));
    logger(`Cancelling ${openOrders.length} orders...done!`);
  }

  logger(`Closing ${positions.length} positions...`);
  console.table(positions);

  let skippedPositions = 0;
  await Promise.allSettled(positions.map((position) => {
    const symbol = position.symbol?.toUpperCase();
    const isInProfit = parseFloat(position.unrealizedProfit) > 0;
    const closingSide = parseFloat(position.positionAmt) > 0 ? 'SELL' : 'BUY';

    if (!isInProfit && options.allowCloseInLoss === false) {
      skippedPositions++;
      return;
    }

    // trigger reduce order to close position
    return binance.futuresOrder(closingSide, symbol, position.positionAmt, false, {
      reduceOnly: 'true',
      newClientOrderId: generateNewFuturesOrderId(),
    });
  }));
  logger(`Closing ${positions.length} positions...done! With ${skippedPositions} positions skipped.`);
}

(async () => {
  const accounts = getAccounts();
  const promises = accounts
  .filter(account => account.features.includes('closeall'))
  .map(account => closePositionsForAccount(account.api_key, account.api_secret, account.desc));

  await Promise.allSettled(promises);
  console.log(new Date(), 'All positions closed');
})();