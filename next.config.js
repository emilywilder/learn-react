/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(html)$/,
            loader: 'html-loader',
        })
        return config
      },
}

module.exports = nextConfig
