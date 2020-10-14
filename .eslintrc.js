module.exports = {
    'parser': '@typescript-eslint/parser',
    // 'extends': ['airbnb-base', 'plugin:@typescript-eslint/recommended'],
    'plugins': ['@typescript-eslint'],
    'env': {
        'browser': false,
        'node': true
    },
    'settings': {
        //解决路径引用ts文件报错的问题
        'import/resolver': {
            'node': {
                'extensions': ['.ts']
            },
            // 解决tsconfig下的path别名导致eslint插件无法解决的bug
            'typescript': {
                'alwaysTryTypes': true
            }
        }
    },
}