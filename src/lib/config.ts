export type Features = 'closeall';

export interface ExchangeAccount {
  // piece of text to identify account. No functional purpose, just for humans.
  desc: string;

  // get these from binance
  api_key: string;
  api_secret: string;

  // optional: if set to true, this account will be ignored (used as a way to turn things accounts off and on without deleting it)
  ignore?: false;

  // feature list. Not sure yet if this will be deprecated. Add the features you want this account to run on
  features: Features[];
}

export function getAccounts(): ExchangeAccount[] {
  try {
    const accounts: ExchangeAccount[] = require('../../config.json');
    if (!Array.isArray(accounts)) {
      throw new Error(`config did not contain an array.`);
    }

    const filteredAccounts = accounts.filter(account => !account.ignore);
    console.log(new Date(), `Loaded ${filteredAccounts}/${accounts.length} accounts.`);
    return filteredAccounts;
  } catch (e) {
    console.error(new Date(), 'Error: "config.json" could not be loaded from project root. Exception: ', e);
  }
  return [];
}