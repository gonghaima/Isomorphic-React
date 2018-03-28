import webpack from 'webpack';
import path from 'path';

/**
 * Development webpack config designed to be loaded by express development server
 */
export default {
    /**
     * The scripts in entry are combined in order to create our bundle
     */
    entry: [
        /**
         * The entry point of the main application
         */
        path.resolve(__dirname, 'src/')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                WEBPACK: true
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                use: {
                    loader: 'babel-loader'
                },
                include: path.resolve(__dirname, 'src'),
            },
        ]
    }
}