/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  env: {
    GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  // Excluir pasta docs do build
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules/**',
        '**/docs/**',
        '**/.git/**',
        '**/.next/**'
      ]
    };
    return config;
  },
  // Excluir da compilação TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
  // Excluir do linting
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: false,
  }
}

module.exports = nextConfig