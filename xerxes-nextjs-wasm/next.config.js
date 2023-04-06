/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  experiments: {
    asyncWebAssembly: true,
  },
  output: {
    webassemblyModuleFilename: 'static/wasm/[modulehash].wasm',
  }
}

module.exports = nextConfig
