/** @format */

module.exports = {
    presets: ['@babel/preset-typescript', '@babel/preset-env'],
    plugins: [
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        [
            'module-resolver',
            {
                alias: {
                    '@': './SourceCode',
                },
            },
        ],
        'transform-class-properties',
    ],
}
