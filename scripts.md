# Binance Automation Scripts

## Binance Futures
### listall.ts
List all positions currently open for an account.

```
ts-node src/futures/listall.ts
```


### closeall.ts
Cancel all orders and close all positions.

Note: Add "closeall" to your `features` in your config accounts to enable for individual accounts: `"features: ["closeall"]`. Accounts without this feature defined are ignored.

```
ts-node src/futures/closeall.ts
```