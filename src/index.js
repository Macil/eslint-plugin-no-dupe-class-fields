import rule from './rule';

export default {
  configs: {
    recommended: {
      plugins: ['no-dupe-class-fields'],
      rules: {
        'no-dupe-class-fields/$': ['error'],
        'no-dupe-class-members': ['off']
      }
    }
  },
  rules: {
    $: rule
  }
};
