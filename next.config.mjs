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
    webpack: (config, { isServer }) => {

        config.module.rules.push({
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,

            use: [
                {
                    loader: 'graphql-tag/loader',
                    options: {

                    },
                },
            ],
        });

        return config;
    },
};

export default nextConfig;
