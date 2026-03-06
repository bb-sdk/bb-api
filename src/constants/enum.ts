export const BITBANK_ERROR_CODE = {
  INVALID_API_KEY: 10000,
  INVALID_NONCE: 10001,
  INVALID_SIGNATURE: 10002,
  API_KEY_REQUIRED: 10003,
  NONCE_REQUIRED: 10004,
  SIGNATURE_REQUIRED: 10005,
  INVALID_PAIR: 10006,
  ORDER_NOT_FOUND: 50009,
  CIRCUIT_BREAK_MARKET_ORDER: 70020,
} as const;

export const ORDER_STATUS = {
  INACTIVE: 'INACTIVE',
  UNFILLED: 'UNFILLED',
  PARTIALLY_FILLED: 'PARTIALLY_FILLED',
  FULLY_FILLED: 'FULLY_FILLED',
  CANCELED_UNFILLED: 'CANCELED_UNFILLED',
  CANCELED_PARTIALLY_FILLED: 'CANCELED_PARTIALLY_FILLED',
  REJECTED: 'REJECTED',
} as const;

export const ORDER_TYPE = {
  LIMIT: 'limit',
  MARKET: 'market',
  STOP: 'stop',
  STOP_LIMIT: 'stop_limit',
  TAKE_PROFIT: 'take_profit',
  STOP_LOSS: 'stop_loss',
  LOSSCUT: 'losscut',
} as const;

export const ORDER_SIDE = {
  BUY: 'buy',
  SELL: 'sell',
} as const;

export const POSITION_SIDE = {
  LONG: 'long',
  SHORT: 'short',
} as const;

export const CANDLE_TYPE = {
  MIN1: '1min',
  MIN5: '5min',
  MIN15: '15min',
  MIN30: '30min',
  HOUR1: '1hour',
  HOUR4: '4hour',
  HOUR8: '8hour',
  HOUR12: '12hour',
  DAY1: '1day',
  WEEK1: '1week',
  MONTH1: '1month',
} as const;

export const CIRCUIT_BREAK_MODE = {
  NONE: 'NONE',
  CIRCUIT_BREAK: 'CIRCUIT_BREAK',
  FULL_RANGE_CIRCUIT_BREAK: 'FULL_RANGE_CIRCUIT_BREAK',
  RESUMPTION: 'RESUMPTION',
  LISTING: 'LISTING',
} as const;

export const FEE_TYPE = {
  NORMAL: 'NORMAL',
  SELL_MAKER: 'SELL_MAKER',
  BUY_MAKER: 'BUY_MAKER',
  DYNAMIC: 'DYNAMIC',
} as const;

export const EXCHANGE_STATUS = {
  NORMAL: 'NORMAL',
  BUSY: 'BUSY',
  VERY_BUSY: 'VERY_BUSY',
  HALT: 'HALT',
} as const;

export const WITHDRAWAL_STATUS = {
  CONFIRMING: 'CONFIRMING',
  EXAMINING: 'EXAMINING',
  SENDING: 'SENDING',
  DONE: 'DONE',
  REJECTED: 'REJECTED',
  CANCELED: 'CANCELED',
  CONFIRM_TIMEOUT: 'CONFIRM_TIMEOUT',
} as const;

export const DEPOSIT_STATUS = {
  FOUND: 'FOUND',
  CONFIRMED: 'CONFIRMED',
  DONE: 'DONE',
} as const;

export const PAIR = {
  BTC_JPY: 'btc_jpy',
  XRP_JPY: 'xrp_jpy',
  LTC_JPY: 'ltc_jpy',
  ETH_JPY: 'eth_jpy',
  MONA_JPY: 'mona_jpy',
  BCC_JPY: 'bcc_jpy',
  XLM_JPY: 'xlm_jpy',
  QTUM_JPY: 'qtum_jpy',
  BAT_JPY: 'bat_jpy',
  OMG_JPY: 'omg_jpy',
  XYM_JPY: 'xym_jpy',
  LINK_JPY: 'link_jpy',
  MKR_JPY: 'mkr_jpy',
  BOBA_JPY: 'boba_jpy',
  ENJ_JPY: 'enj_jpy',
  MATIC_JPY: 'matic_jpy',
  DOT_JPY: 'dot_jpy',
  DOGE_JPY: 'doge_jpy',
  ASTR_JPY: 'astr_jpy',
  ADA_JPY: 'ada_jpy',
  AVAX_JPY: 'avax_jpy',
  AXS_JPY: 'axs_jpy',
  FLR_JPY: 'flr_jpy',
  SAND_JPY: 'sand_jpy',
  APE_JPY: 'ape_jpy',
  GALA_JPY: 'gala_jpy',
  CHZ_JPY: 'chz_jpy',
  OAS_JPY: 'oas_jpy',
  WBTC_JPY: 'wbtc_jpy',
  OP_JPY: 'op_jpy',
  ARB_JPY: 'arb_jpy',
  IMX_JPY: 'imx_jpy',
  MANA_JPY: 'mana_jpy',
  GRT_JPY: 'grt_jpy',
  BLUR_JPY: 'blur_jpy',
  PEPE_JPY: 'pepe_jpy',
  SHIB_JPY: 'shib_jpy',
  BNB_JPY: 'bnb_jpy',
  SOL_JPY: 'sol_jpy',
  SUI_JPY: 'sui_jpy',
  TON_JPY: 'ton_jpy',
  ORDI_JPY: 'ordi_jpy',
  SATS_JPY: 'sats_jpy',
  XRP_BTC: 'xrp_btc',
  LTC_BTC: 'ltc_btc',
  ETH_BTC: 'eth_btc',
  MONA_BTC: 'mona_btc',
  BCC_BTC: 'bcc_btc',
  XLM_BTC: 'xlm_btc',
} as const;
