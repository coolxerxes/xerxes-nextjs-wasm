/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer, dev }) {
    config.output.webassemblyModuleFilename = isServer && !dev ? '..static/wasm/[name].[moduleHash].wasm' : 'static/wasm/[name].[moduleHash].wasm'
    config.experiments = { ...config.experiments, asyncWebAssembly: true }

    config.module.rules.push({
      test: /.*\.wasm$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/wasm/[name].[modulehash][ext]'
      }
    })

    return config;
  }
}

module.exports = nextConfig
