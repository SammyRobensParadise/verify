module.exports = {
    root: true,
    extends: [
        '@react-native-community',
        'airbnb-typescript',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react'
    ],
    ignorePatterns: ['**/node_modules/*'],
    rules: {
        '@typescript-eslint/member-delimiter-style': ['off']
    },
    exclude: ['./node_modules']
};
