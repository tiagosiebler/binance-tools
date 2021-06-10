# Binance Tools

These are miscellaneous tools & pieces of automation for interacting with the Binance APIs. If you have any scripts that you think are useful, please open a pull request to contribute.

# Setup
### Clone or download the repo:
```
$ git clone git@github.com:tiagosiebler/binance-tools.git
$ cd binance-tools
```

### Install dependencies
```
$ npm install

# Optional: recommend instlaling ts-node to execute typescript files directly:
$ npm install -g ts-node
```

### Prepare config
- Make a copy of `config.template.json` and call it `config.json`.
- Add as many accounts to your `config.json` as you like.
- For the full schema of the config file, check the definition of `ExchangeAccount` in [src/lib/config.ts](/src/lib/config.ts).

### Execute desired scripts
```
ts-node src/futures/poslist.ts
```

See [scripts.md](/scripts.md) for a list of scripts and their purpose.