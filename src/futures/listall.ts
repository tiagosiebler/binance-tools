/**
 * Simple panic script. Connect to exchange, query open positions and close them all.
 */

import Binance from "node-binance-api";
import { getAccounts } from "../lib/config";
import { BinanceFuturesAccountResponse } from "../lib/binancetypes";

async function checkPositionsForAccount(api_key: string, api_secret: string, desc: string) {
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

  if (!positions || positions.length === 0) {
    logger('No positions found.');
    return;
  }

  logger(`Found ${positions.length} active positions`);
  console.table(positions);
}

(async () => {
  const accounts = getAccounts();
  const promises = accounts.map(account => checkPositionsForAccount(account.api_key, account.api_secret, account.desc));

  await Promise.allSettled(promises);
})();