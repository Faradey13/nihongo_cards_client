/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        console.log("Rewrites called");
        return [
            {
                source: '/socket.io/:path*',
                destination: 'http://localhost:5002/socket.io/:path*',
            },
            {
                source: '/:path*',
                destination: 'http://localhost:5000/:path*',
            },
        ];
    },
};

export default nextConfig;
