/** @type {import('next').NextConfig} */
const isApi = process.env.NEXT_APP_MODE === 'api' || process.argv.some(arg => arg.includes('3003'));

const nextConfig = {
    distDir: isApi ? '.next-api' : '.next',

    // Add CORS headers for API mode (backend on port 3003)
    async headers() {
        if (isApi) {
            return [
                {
                    source: '/api/:path*',
                    headers: [
                        { key: 'Access-Control-Allow-Credentials', value: 'true' },
                        { key: 'Access-Control-Allow-Origin', value: 'http://localhost:3000' },
                        { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS' },
                        { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
                    ],
                },
            ];
        }
        return [];
    },
};

export default nextConfig;
