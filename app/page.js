import Converter from "./components/Converter"

// 🔹 Helper para fetch seguro con manejo de errores
async function safeFetch(url) {
  try {
    const res = await fetch(url, { cache: "no-store" })
    if (!res.ok) throw new Error(`Error en API ${url}`)
    return await res.json()
  } catch (err) {
    console.error("❌ Error en fetch:", url, err.message)
    return null
  }
}

async function getRates() {
  // ⚡ 1. BCV (USD oficial)
  const bcv = await safeFetch("https://ve.dolarapi.com/v1/dolares/oficial")

  // ⚡ 2. EUR → VES desde ExchangeRatesAPI
  const eur = await safeFetch(
    "https://api.exchangeratesapi.io/v1/latest?access_key=b926f93a5858c21d9c4da3d4a1bccc25&base=EUR&symbols=VES,USD"
  )

  // ⚡ 3. Binance P2P → usamos la URL base según entorno
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000" // ✅ Vercel o local
  const binance = await safeFetch(`${baseUrl}/api/binance`)

  // ⚡ Conversiones seguras
  const bcvUsd = bcv?.promedio || 0
  const bcvEur = eur?.rates?.VES || 0
  const binanceAvg = binance?.average ? Number(binance.average) : 0
  const paralelo =
    bcvUsd && binanceAvg ? (bcvUsd + binanceAvg) / 2 : binanceAvg || bcvUsd

  return {
    bcvUsd,
    bcvEur,
    binance: binanceAvg,
    calle: paralelo,
  }
}

export default async function Home() {
  const rates = await getRates()

  return (
    <main className="min-h-screen flex items-center justify-center bg-[--color-bg]">
      <Converter rates={rates} />
    </main>
  )
}
