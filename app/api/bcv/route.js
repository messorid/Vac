export async function GET() {
  try {
    const res = await fetch("https://ve.dolarapi.com/v1/dolares/oficial", { cache: "no-store" })
    if (!res.ok) throw new Error("Error en API BCV")
    const data = await res.json()

    return Response.json({
      usd: Number(data.valor),
    })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
