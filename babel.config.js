/** @format */

module.exports = {
    presets: ['@babel/preset-typescript', '@babel/preset-env'],
    plugins: [
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
