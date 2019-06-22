import { RuleTester } from 'eslint/lib/rule-tester';

const ruleTester = new RuleTester({
  parser: require.resolve('babel-eslint')
});

import rule from './rule';

ruleTester.run('no-dupe-class-fields', rule, {
  valid: [
    // ADDED
    'class A { foo; bar() {} }',
    'class A { foo = 1; bar() {} }',
    'class A { foo = 1; bar = 2; }',
    'class A { foo = 1; bar; }',
    'class A { foo() {} bar; }',
    'class A { foo() {} bar = 2; }',
    // no-dupe-class-members upstream
    'class A { foo() {} bar() {} }',
    'class A { static foo() {} foo() {} }',
    'class A { get foo() {} set foo(value) {} }',
    'class A { static foo() {} get foo() {} set foo(value) {} }',
    'class A { foo() { } } class B { foo() { } }',
    'class A { [foo]() {} foo() {} }',
    "class A { 'foo'() {} 'bar'() {} baz() {} }",
    "class A { *'foo'() {} *'bar'() {} *baz() {} }",
    "class A { get 'foo'() {} get 'bar'() {} get baz() {} }",
    'class A { 1() {} 2() {} }'
  ],
  invalid: [
    // ADDED
    {
      code: 'class A { foo; foo() {} }',
      errors: [
        {
          type: 'MethodDefinition',
          line: 1,
          column: 16,
          messageId: 'unexpected',
          data: { name: 'foo' }
        }
      ]
    },
    {
      code: 'class A { foo() {} foo; }',
      errors: [
        {
          type: 'ClassProperty',
          line: 1,
          column: 20,
          messageId: 'unexpected',
          data: { name: 'foo' }
        }
      ]
    },
    {
      code: 'class A { foo = 1; foo() {} }',
      errors: [
        {
          type: 'MethodDefinition',
          line: 1,
          column: 20,
          messageId: 'unexpected',
          data: { name: 'foo' }
        }
      ]
    },
    {
      code: 'class A { foo = 1; foo = 2; }',
      errors: [
        {
          type: 'ClassProperty',
          line: 1,
          column: 20,
          messageId: 'unexpected',
          data: { name: 'foo' }
        }
      ]
    },
    {
      code: 'class A { foo() {} foo = 1; }',
      errors: [
        {
          type: 'ClassProperty',
          line: 1,
          column: 20,
          messageId: 'unexpected',
          data: { name: 'foo' }
        }
      ]
    },
    // no-dupe-class-members upstream
    {
      code: 'class A { foo() {} foo() {} }',
      errors: [
        {
          type: 'MethodDefinition',
          line: 1,
          column: 20,
          messageId: 'unexpected',
          data: { name: 'foo' }
        }
      ]
    },
    {
      code: '!class A { foo() {} foo() {} };',
      errors: [
        {
          type: 'MethodDefinition',
          line: 1,
          column: 21,
          messageId: 'unexpected',
          data: { name: 'foo' }
        }
      ]
    },
    {
      code: "class A { 'foo'() {} 'foo'() {} }",
      errors: [
        {
          type: 'MethodDefinition',
          line: 1,
          column: 22,
          messageId: 'unexpected',
          data: { name: 'foo' }
        }
      ]
    },
    {
      code: 'class A { 10() {} 1e1() {} }',
      errors: [
        {
          type: 'MethodDefinition',
          line: 1,
          column: 19,
          messageId: 'unexpected',
          data: { name: '10' }
        }
      ]
    },
    {
      code: 'class A { foo() {} foo() {} foo() {} }',
      errors: [
        {
          type: 'MethodDefinition',
          line: 1,
          column: 20,
          messageId: 'unexpected',
          data: { name: 'foo' }
        },
        {
          type: 'MethodDefinition',
          line: 1,
          column: 29,
          messageId: 'unexpected',
          data: { name: 'foo' }
        }
      ]
    },
    {
      code: 'class A { static foo() {} static foo() {} }',
      errors: [
        {
          type: 'MethodDefinition',
          line: 1,
          column: 27,
          messageId: 'unexpected',
          data: { name: 'foo' }
        }
      ]
    },
    {
      code: 'class A { foo() {} get foo() {} }',
      errors: [
        {
          type: 'MethodDefinition',
          line: 1,
          column: 20,
          messageId: 'unexpected',
          data: { name: 'foo' }
        }
      ]
    },
    {
      code: 'class A { set foo(value) {} foo() {} }',
      errors: [
        {
          type: 'MethodDefinition',
          line: 1,
          column: 29,
          messageId: 'unexpected',
          data: { name: 'foo' }
        }
      ]
    }
  ]
});
