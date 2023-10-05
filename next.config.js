/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(html)$/,
            loader: 'html-loader',
        })
        // config.resolve.fallback = { fs: false };
        return config
      },
}

module.exports = nextConfig
