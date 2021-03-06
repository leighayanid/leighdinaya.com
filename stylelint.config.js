module.exports = {
  extends: ['stylelint-config-standard'],
  customSyntax: 'postcss-html',
  rules: {
    indentation: 2,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'at-rule-empty-line-before': null,
  },
}
