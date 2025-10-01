// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // A new feature
        'fix',      // A bug fix
        'docs',     // Documentation only changes
        'style',    // Changes that do not affect meaning (formatting, etc.)
        'refactor', // Code change that neither fixes a bug nor adds a feature
        'perf',     // Performance improvements
        'test',     // Adding or updating tests
        'build',    // Changes that affect the build system or dependencies
        'ci',       // Changes to CI/CD configuration
        'chore',    // Other changes that don’t modify src or test files
        'revert'    // Reverts a previous commit
      ],
    ],
    'subject-case': [2, "always", "sentence-case"], // Disable subject case rule (allows free text)
  },
};
