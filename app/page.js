import Converter from "./components/Converter"

async function getRates() {
  // USD oficial (BCV)
  const bcvRes = await fetch("https://ve.dolarapi.com/v1/dolares/oficial", { cache: "no-store" })
  const bcv = await bcvRes.json()

  // EUR → VES desde exchangeratesapi.io
  const eurRes = await fetch(
    "https://api.exchangeratesapi.io/v1/latest?access_key=b926f93a5858c21d9c4da3d4a1bccc25&base=EUR&symbols=VES,USD",
    { cache: "no-store" }
  )
  const eur = await eurRes.json()

  // Binance P2P (tu endpoint interno)
  const binanceRes = await fetch("http://localhost:3000/api/binance", { cache: "no-store" })
  const binance = await binanceRes.json()

  // ⚡ conversiones
  const bcvUsd = bcv.promedio      // 1 USD en VES (oficial BCV)
  const bcvEur = eur.rates.VES     // 1 EUR en VES (oficial vía exchangeratesapi)

  // Promedio "calle" = entre BCV USD y Binance
  const paralelo = (bcvUsd + Number(binance.average)) / 2

  return {
    bcvUsd,
    bcvEur,
    binance: Number(binance.average),
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
