const BINANCE_P2P_URL = "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search"

async function fetchPrice(tradeType) {
  const body = {
    asset: "USDT",
    fiat: "VES",
    merchantCheck: false,
    page: 1,
    payTypes: [],
    publisherType: null,
    rows: 1,
    tradeType
  }

  const res = await fetch(BINANCE_P2P_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",   // 👈 importante
      "accept-language": "es"
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) throw new Error(`Error al obtener precio ${tradeType}`)

  const data = await res.json()
  const price = parseFloat(data?.data?.[0]?.adv?.price)
  return price
}

export async function GET() {
  try {
    // Obtenemos tanto la tasa de compra como la de venta
    const [buyPrice, sellPrice] = await Promise.all([
      fetchPrice("BUY"),
      fetchPrice("SELL"),
    ])

    const averagePrice = ( (buyPrice + sellPrice) / 2 )

    return Response.json({
      buy: buyPrice,
      sell: sellPrice,
      average: averagePrice
    })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
