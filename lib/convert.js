export function convertVac(amountUSD, rates) {
  const { bcvUsd, bcvEur, calle, binance } = rates

  // Bolívares obtenidos
  const bsUsd = amountUSD * bcvUsd
  const bsEur = amountUSD * bcvEur

  // Recompra (desde euro BCV → USD Calle/Binance)
  const recomprarCalle = bsEur / calle
  const recomprarBinance = bsEur / binance

  return {
    bs: { usd: bsUsd, eur: bsEur },
    recompras: {
      calle: recomprarCalle,
      binance: recomprarBinance,
    },
    perdidas: {
      calle: ((amountUSD - recomprarCalle) / amountUSD) * 100,
      binance: ((amountUSD - recomprarBinance) / amountUSD) * 100,
    },
  }
}
