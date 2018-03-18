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
        filename: '[hash].js',
    },
    devServer: {
        hot: true,
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),

        // define node variables to the package
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                VERSION: JSON.stringify(version),
            },
        }),

        argv.mode === 'production' ? webpack.optimize.OccurrenceOrderPlugin(true) : null,

        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),

        new OfflinePlugin({
            ServiceWorker: {
                minify: false,
            },
        }),

        new HtmlWebpackPlugin({
            title: 'Snake',
            template: './src/index.html',
        }),
    ].filter(Boolean),
});
