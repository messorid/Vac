import nextPWA from "next-pwa"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

export default nextPWA({
  dest: "public",      // dónde se guarda el service worker
  register: true,      // registra el SW automáticamente
  skipWaiting: true,   // activa el nuevo SW al instante
})(nextConfig)
