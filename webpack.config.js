const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');
const fs = require('fs');
const { execSync } = require('child_process');

let pkg;
let customVersion;

try {
    pkg = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json')));
} catch(error) {
    console.error(error);
}

if (fs.existsSync('./.git')) {
    const isDirtyRepo = Boolean(`${execSync('git diff --shortstat 2> /dev/null | tail -n1')}`.replace(/[ \n\r]/g, ''));
    const gitVersionCommand = `git describe ${isDirtyRepo ? '--long ' : ''} | cut -c 2-`;
    customVersion = `${execSync(gitVersionCommand)}`.replace('\n', '');
}

const version = (customVersion || pkg.version || '').replace(/[ \n\r]/g, '');

module.exports = (env, argv) => ({
    output: {
        filename: `[name].[${argv.mode !== 'production' ? 'hash' : 'chunkhash'}].js`,
    },
    devServer: {
        hot: argv.mode !== 'production',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                },
                runtime: 'initial',
            }
        }
    },
    module: {
        rules: [
            // Add support to many browser in production only
            argv.mode === 'production' ? {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: argv.mode !== 'production',
                        presets: [
                            ['env', {
                                useBuiltIns: 'usage',
                                modules: false,
                            }]
                        ],
                        plugins: [
                            'syntax-dynamic-import',
                            'babel-plugin-transform-runtime',
                            'transform-object-rest-spread',
                        ],
                    }
                }
            } : null,
        ].filter(Boolean),
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),

        new webpack.HashedModuleIdsPlugin(),

        // define node variables to the package
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                VERSION: JSON.stringify(version),
            },
        }),

        argv.mode === 'production' ? new webpack.optimize.OccurrenceOrderPlugin(true) : null,

        argv.mode !== 'production' ? new webpack.NamedModulesPlugin() : null,
        argv.mode !== 'production' ? new webpack.HotModuleReplacementPlugin(): null,

        new HtmlWebpackPlugin({
            title: 'Snake',
            template: './src/index.html',
        }),

        new OfflinePlugin({
            version: '[hash]',
            autoUpdate: 30e3,
            responseStrategy: 'cache-first',
            excludes: [
                '**/.*',
                '**/*.map',
                '**/*.*.gz',
            ],
            safeToUseOptionalCaches: true,
            caches: {
                main: [
                    'index.html',
                    'main.*.js',
                    'vendors.*.js',
                ],
                additional: [
                    '*.js',
                    '*.ico',
                ],
                optional: [],
            },
            externals: [],
            ServiceWorker: {
                minify: false,
                events: true,
            },
            AppCache: {
                events: true,
            },
        }),
    ].filter(Boolean),
});
