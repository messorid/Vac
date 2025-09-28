"use client"
import { useState } from "react"

export default function Converter({ rates }) {
  const [amount, setAmount] = useState("1000")
  const price = Number(amount)

  // Calcular valores
  const values = {
    usd: price * rates.bcvUsd,
    eur: price * rates.bcvEur,
    binance: price * rates.binance,
    paralelo: price * rates.calle,
  }

  // % diferencias contra USD oficial
  const diffPercent = (value) =>
    ((value - values.usd) / values.usd) * 100

  const diffs = {
    usd: 0,
    eur: diffPercent(values.eur),
    binance: diffPercent(values.binance),
    paralelo: diffPercent(values.paralelo),
  }

  return (
    <div className="p-6 space-y-8 max-w-2xl mx-auto w-full">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Precio del Vac. Dr. Cesar
      </h1>

      {/* Input */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ingrese el valor en USD
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded-lg p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ej: 1000"
        />
      </div>

      {/* Resultados */}
      <section className="grid gap-4">
        {[
          { label: "Precio del Vac en USD (Oficial)", value: values.usd, diff: diffs.usd, color: "text-green-600" },
          { label: "Precio del Vac en EUR (Oficial)", value: values.eur, diff: diffs.eur, color: "text-blue-600" },
          { label: "Precio del Vac en Binance (Aprox)", value: values.binance, diff: diffs.binance, color: "text-yellow-600" },
          { label: "Precio Paralelo (Aprox)", value: values.paralelo, diff: diffs.paralelo, color: "text-red-600" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-md transition"
            onClick={() =>
              navigator.clipboard.writeText(
                `${item.label}: ${item.value.toFixed(2)} Bs (${item.diff.toFixed(2)}%)`
              )
            }
          >
            <h3 className="text-lg font-semibold">{item.label}</h3>
            <p className={`text-2xl font-bold ${item.color}`}>
              {item.value.toFixed(2)} Bs
            </p>
            {item.label !== "Precio del Vac en USD (Oficial)" && (
              <p className="text-sm text-gray-500">
                Diferencia: {item.diff.toFixed(2)}%
              </p>
            )}
            <p className="text-xs text-gray-400">Toca para copiar</p>
          </div>
        ))}
      </section>

      {/* Resumen */}
      <section className="bg-gray-100 p-5 rounded-lg shadow-inner space-y-2">
        <h2 className="text-xl font-bold text-gray-800">Resumen</h2>
        <p>
          Si el Vac cuesta <strong>{amount} USD</strong>:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>
            En <strong>USD oficial</strong> equivale a{" "}
            <span className="font-semibold">{values.usd.toFixed(2)} Bs</span>.
          </li>
          <li>
            En <strong>EUR oficial</strong> equivale a{" "}
            <span className="font-semibold">{values.eur.toFixed(2)} Bs</span>, lo
            que representa una diferencia de{" "}
            <span className="font-semibold">{diffs.eur.toFixed(2)}%</span>.
          </li>
          <li>
            En <strong>Binance</strong> equivale a{" "}
            <span className="font-semibold">{values.binance.toFixed(2)} Bs</span>, con{" "}
            <span className="font-semibold">{diffs.binance.toFixed(2)}%</span> de diferencia.
          </li>
          <li>
            En el <strong>Paralelo (Aprox)</strong> equivale a{" "}
            <span className="font-semibold">{values.paralelo.toFixed(2)} Bs</span>, con{" "}
            <span className="font-semibold">{diffs.paralelo.toFixed(2)}%</span> de diferencia.
          </li>
        </ul>
      </section>
    </div>
  )
}
