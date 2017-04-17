module.exports = {
    'env' : {
        'browser' : true,
        'node'  : true,
        'es6'   : true,
        'mocha' : true
    },
    'plugins' : [
        'jsdoc'
    ],
    'rules'   : {
        // Possible Errors
        'comma-dangle'             : [2, 'never'],
        'no-cond-assign'           : 2,
        'no-console'               : 2,
        'no-constant-condition'    : 2,
        'no-control-regex'         : 2,
        'no-debugger'              : 2,
        'no-dupe-args'             : 2,
        'no-dupe-keys'             : 2,
        'no-duplicate-case'        : 2,
        'no-empty'                 : 1,
        'no-empty-character-class' : 2,
        'no-ex-assign'             : 2,
        'no-extra-boolean-cast'    : 2,
        'no-extra-parens'          : 1,
        'no-extra-semi'            : 2,
        'no-func-assign'           : 2,
        'no-inner-declarations'    : [2, 'both'],
        'no-invalid-regexp'        : 2,
        'no-irregular-whitespace'  : 2,
        'no-negated-in-lhs'        : 2,
        'no-obj-calls'             : 2,
        'no-regex-spaces'          : 2,
        'no-sparse-arrays'         : 2,
        'no-unexpected-multiline'  : 2,
        'no-unreachable'           : 2,
        'use-isnan'                : 2,
        'valid-jsdoc'              : [2, {
            'requireReturn' : false,
            'prefer'        : {
                'return' : 'returns'
            }
        }],
        'valid-typeof' : 2,

        // Best Practices
        'accessor-pairs'               : 2,
        'array-callback-return'        : 0,
        'block-scoped-var'             : 2,
        'complexity'                   : 0,
        'consistent-return'            : 0,
        'curly'                        : [2, 'all'],
        'default-case'                 : 1,
        'dot-location'                 : [2, 'property'],
        'dot-notation'                 : 1,
        'eqeqeq'                       : 2,
        'guard-for-in'                 : 2,
        'no-alert'                     : 2,
        'no-caller'                    : 2,
        'no-case-declarations'         : 2,
        'no-div-regex'                 : 2,
        'no-else-return'               : 2,
        'no-empty-function'            : 2,
        'no-empty-pattern'             : 2,
        'no-eq-null'                   : 2,
        'no-eval'                      : 2,
        'no-extend-native'             : 2,
        'no-extra-bind'                : 2,
        'no-extra-label'               : 2,
        'no-fallthrough'               : 2,
        'no-floating-decimal'          : 2,
        'no-implicit-coercion'         : 2,
        'no-implicit-globals'          : 2,
        'no-implied-eval'              : 2,
        'no-invalid-this'              : 2,
        'no-iterator'                  : 2,
        'no-labels'                    : 2,
        'no-lone-blocks'               : 2,
        'no-loop-func'                 : 1,
        'no-magic-numbers'             : [0, {ignore : [-1, 0, 1, 2, 200, 500]}],
        'no-multi-spaces'              : [2, {exceptions : {'VariableDeclarator' : true}}],
        'no-multi-str'                 : 2,
        'no-native-reassign'           : 2,
        'no-new'                       : 2,
        'no-new-func'                  : 1,
        'no-new-wrappers'              : 2,
        'no-octal'                     : 2,
        'no-octal-escape'              : 2,
        'no-proto'                     : 2,
        'no-redeclare'                 : 1,
        'no-return-assign'             : 2,
        'no-script-url'                : 2,
        'no-self-assign'               : 2,
        'no-self-compare'              : 2,
        'no-sequences'                 : 2,
        'no-throw-literal'             : 2,
        'no-unmodified-loop-condition' : 2,
        'no-unused-expressions'        : 2,
        'no-unused-labels'             : 2,
        'no-useless-call'              : 2,
        'no-useless-concat'            : 2,
        'no-useless-escape'            : 2,
        'no-void'                      : 2,
        'no-warning-comments'          : 1,
        'no-with'                      : 2,
        'radix'                        : 2,
        'vars-on-top'                  : 0,
        'wrap-iife'                    : [2, 'inside'],
        'yoda'                         : 2,

        // Strict Mode
        strict : [2, 'global'],

        // Variables
        'init-declarations'          : 0,
        'no-catch-shadow'            : 2,
        'no-delete-var'              : 2,
        'no-label-var'               : 2,
        'no-restricted-globals'      : 0,
        'no-shadow'                  : 0,
        'no-shadow-restricted-names' : 2,
        'no-undef'                   : 2,
        'no-undef-init'              : 2,
        'no-undefined'               : 0,
        'no-unused-vars'             : [2, {'vars' : 'all', 'args' : 'after-used'}],

        // Node.js and CommonJS
        'callback-return'       : [2, ['callback', 'cb', 'next']],
        'global-require'        : 1,
        'handle-callback-err'   : 2,
        'no-new-require'        : 2,
        'no-path-concat'        : 2,
        'no-process-env'        : 0,
        'no-process-exit'       : 2,
        'no-restricted-modules' : 0,

        // Stylistic Issues
        'array-bracket-spacing'         : [2, 'never'],
        'block-spacing'                 : [2, 'always'],
        'brace-style'                   : [2, 'stroustrup'],
        'camelcase'                     : 2,
        'comma-spacing'                 : [2, {'before' : false, 'after' : true}],
        'comma-style'                   : [2, 'last'],
        'computed-property-spacing'     : [2, 'never'],
        'consistent-this'               : [2, 'self'],
        'eol-last'                      : 0,
        'func-names'                    : 0,
        'id-blacklist'                  : 0,
        'id-length'                     : [2, {'min' : 2, 'max' : 40, 'properties' : 'always', 'exceptions' : ['_', 'i', 'j', '$']}],
        'id-match'                      : 0,
        'indent'                        : [2, 4, {SwitchCase : 1}],
        'jsx-quotes'                    : 0,
        'key-spacing'                   : [2, {'beforeColon' : true, 'afterColon' : true}],
        'keyword-spacing'               : 0,
        'linebreak-style'               : 0,
        'lines-around-comment'          : 0,
        'max-depth'                     : 0,
        'max-len'                       : [1, 120, 4],
        'max-nested-callbacks'          : 2,
        'max-params'                    : [1, 5],
        'max-statements'                : 0,
        'max-statements-per-line'       : 2,
        'new-cap'                       : 2,
        'new-parens'                    : 2,
        'newline-after-var'             : 2,
        'newline-before-return'         : 2,
        'newline-per-chained-call'      : 2,
        'no-array-constructor'          : 2,
        'no-bitwise'                    : 0,
        'no-continue'                   : 2,
        'no-inline-comments'            : 2,
        'no-lonely-if'                  : 2,
        'no-mixed-spaces-and-tabs'      : 2,
        'no-multiple-empty-lines'       : 0,
        'no-negated-condition'          : 0,
        'no-nested-ternary'             : 2,
        'no-new-object'                 : 0,
        'no-plusplus'                   : 0,
        'no-restricted-syntax'          : 0,
        'no-spaced-func'                : 2,
        'no-ternary'                    : 0,
        'no-trailing-spaces'            : 2,
        'no-unneeded-ternary'           : 2,
        'no-whitespace-before-property' : 2,
        'object-curly-spacing'          : [2, 'never'],
        'one-var'                       : 0,
        'one-var-declaration-per-line'  : 2,
        'operator-assignment'           : 0,
        'operator-linebreak'            : 0,
        'padded-blocks'                 : [2, 'never'],
        'quote-props'                   : [2, 'consistent'],
        // 'quotes'                        : [2, 'single', {'avoidEscape': true, 'allowTemplateLiterals': true}],
        'require-jsdoc'                 : [2, {
            'require' : {
                'FunctionDeclaration' : true,
                'MethodDefinition'    : true,
                'ClassDeclaration'    : true
            }
        }],
        'semi'                        : [2, 'always'],
        'semi-spacing'                : [2, {'before' : false, 'after' : true}],
        'sort-imports'                : 2,
        'sort-vars'                   : 0,
        'space-before-blocks'         : 2,
        'space-before-function-paren' : [2, 'never'],
        'space-in-parens'             : [2, 'never'],
        'space-infix-ops'             : 2,
        'space-unary-ops'             : [1, {'words' : true, 'nonwords' : false}],
        'spaced-comment'              : 0,
        'wrap-regex'                  : 2,

        // ECMAScript 6
        'arrow-body-style'       : 0,
        'arrow-parens'           : 0,
        'arrow-spacing'          : 0,
        'constructor-super'      : 0,
        'generator-star-spacing' : 0,
        'no-class-assign'        : 0,
        'no-confusing-arrow'     : 0,
        'no-const-assign'        : 0,
        'no-dupe-class-members'  : 0,
        'no-duplicate-imports'   : 0,
        'no-new-symbol'          : 0,
        'no-restricted-imports'  : 0,
        'no-this-before-super'   : 0,
        'no-useless-constructor' : 0,
        'no-var'                 : 0,
        'object-shorthand'       : 0,
        'prefer-arrow-callback'  : 0,
        'prefer-const'           : 0,
        'prefer-reflect'         : 0,
        'prefer-rest-params'     : 0,
        'prefer-spread'          : 0,
        'prefer-template'        : 0,
        'require-yield'          : 0,
        'template-curly-spacing' : 0,
        'yield-star-spacing'     : 0,
        'no-underscore-dangle'   : 0

        // Plugin JSDoc
        // 'jsdoc/check-param-names'                     : 0,
        // 'jsdoc/check-tag-names'                       : 1,
        // 'jsdoc/check-types'                           : 1,
        // 'jsdoc/newline-after-description'             : 0,
        // 'jsdoc/require-description-complete-sentence' : 0,
        // 'jsdoc/require-param'                         : 0,
        // 'jsdoc/require-param-description'             : 0,
        // 'jsdoc/require-param-types'                   : 0,
        // 'jsdoc/require-returns-description'           : 0,
        // 'jsdoc/require-returns-type'                  : 2
    }
};