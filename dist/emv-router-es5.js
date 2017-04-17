/*global define, module, exports*/
/* eslint no-invalid-this:0 */

/**
 * emv-router.js 1.0.0
 *
 * @author Elvyrra S.A.S
 * @license http://rem.mit-license.org/ MIT
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (global, factory) {
    if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
        var EMV = require('emv');

        module.exports = factory(EMV);
    } else if (typeof define === 'function' && define.amd) {
        define(['emv'], factory);
    } else {
        factory(global.EMV);
    }
})(undefined, function (EMV) {
    /**
     * This class describes the bevahior of a route
     */
    var Route = function () {
        /**
         * Constructor
         * @param  {Object} data The route data
         */
        function Route(data) {
            var _this = this;

            _classCallCheck(this, Route);

            Object.keys(data).forEach(function (key) {
                _this[key] = data[key];
            });

            this.args = [];
            this.pattern = this.path.replace(/\{(\w+?)\}/g, function (match, arg) {
                _this.args.push(arg);

                return '(.*?)';
            });
        }

        /**
         * Get the route path
         * @param   {Object} param The path parameters
         * @returns {string}       The route path
         */


        _createClass(Route, [{
            key: 'getPath',
            value: function getPath(param) {
                var path = this.path;

                if (param) {
                    Object.keys(param).forEach(function (key) {
                        path = path.replace('{' + key + '}', param[key]);
                    });
                }

                return path;
            }

            /**
             * Check if the route matches a path
             * @param   {string} path The path to check
             * @returns {boolean}     True if the route matches the path, else false
             */

        }, {
            key: 'match',
            value: function match(path) {
                var regex = new RegExp('^' + this.pattern + '$');

                return path.match(regex);
            }

            /**
             * Get the path data
             * @param   {string} path The path to check
             * @returns {Object}      The path data, or null if the route does not match the path
             */

        }, {
            key: 'getData',
            value: function getData(path) {
                var regex = new RegExp('^' + this.pattern + '$');
                var match = regex.exec(path);
                var data = {};

                if (match === null) {
                    return null;
                }

                this.args.forEach(function (arg, index) {
                    data[arg] = match[index + 1];
                });

                return data;
            }
        }]);

        return Route;
    }();

    /**
     * This class manage the router directive
     */


    var Router = function (_EMV) {
        _inherits(Router, _EMV);

        /**
         * Construct
         */
        function Router() {
            _classCallCheck(this, Router);

            var _this2 = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this, {
                data: {
                    path: '',
                    route: null
                },
                computed: {
                    template: function template() {
                        if (!this.route) {
                            return '';
                        }

                        return this.route.template || this.route.templateUrl;
                    },
                    model: function model() {
                        if (!this.route) {
                            return null;
                        }

                        return this.route.model;
                    }
                }
            }));

            _this2.$watch('model', function (model) {
                if (_this2.route && _this2.route.init && model[_this2.route.init]) {
                    _this2.model[_this2.route.init].call(model);
                }
            });
            return _this2;
        }

        /**
         * Get a path by the route name
         * @param   {string} routeName The route name
         * @param   {Object} data      The data to inject in the path
         * @returns {string}           The found path, or '/' if not found
         */


        _createClass(Router, [{
            key: 'getPath',
            value: function getPath(routeName, data) {
                var route = this.getRoute(routeName);

                if (!route) {
                    return '/';
                }

                return route.getPath(data);
            }

            /**
             * Get a route by a route name
             * @param  {string} routeName The route name
             * @returns {Object}           The found route, or null if not found
             */

        }, {
            key: 'getRoute',
            value: function getRoute(routeName) {
                return this.routes[routeName] || null;
            }

            /**
             * Get the name of a route by a path
             * @param  {string} path The path
             * @returns {string}     The found route name
             */

        }, {
            key: 'getRouteNameByPath',
            value: function getRouteNameByPath(path) {
                var _this3 = this;

                return Object.keys(this.routes).find(function (name) {
                    return _this3.routes[name].match(path);
                });
            }

            /**
             * Get the route by it path
             * @param   {string} path The path
             * @returns {Object}     The found route
             */

        }, {
            key: 'getRouteByPath',
            value: function getRouteByPath(path) {
                var routeName = this.getRouteNameByPath(path);

                return routeName && this.routes[routeName] || null;
            }

            /**
             * Render the element content
             * @param  {DOMNode} element The element to render
             * @param  {EMV}     model   The EMV instance applied on the element
             */

        }, {
            key: 'render',
            value: function render(element, model) {
                var _this4 = this;

                this.path = location.hash.substr(1);
                var route = this.getRouteByPath(this.path);

                if (!route) {
                    this.route = route;

                    return;
                }

                if (route.templateUrl && !model.$templates[route.templateUrl]) {
                    // Load the template
                    var xhr = new XMLHttpRequest();

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            // The view has been successfully loaded
                            model.$registerTemplate(route.templateUrl, xhr.responseText);

                            _this4.route = route;
                        }
                    };

                    xhr.open('GET', route.templateUrl, true);
                    xhr.send(null);
                } else {
                    this.route = route;
                }
            }

            /**
             * Init the directive
             * @param  {DOMNode} element   The element the directive is applied on
             * @param  {string} parameters The directive parameters
             * @param  {EMV} model         The EMV instance applied on the element
             */

        }, {
            key: 'init',
            value: function init(element, parameters, model) {
                var _this5 = this;

                this.routes = {};
                Object.keys(EMV.config.routes).forEach(function (routeName) {
                    _this5.routes[routeName] = new Route(EMV.config.routes[routeName]);
                });

                model.$observe('$router', this);

                model.$setElementDirective(element, 'with', '$router.model');
                EMV.directives.with.init.call(this, element, '$router.model', this);
                model.$setElementDirective(element, 'template', '$parent.template');

                if (!location.hash) {
                    location.hash = '#/';
                }

                this.render(element, model);
            }

            /**
             * Bind the DOM
             * @param  {DOMNode} element   The element the directive is applied on
             * @param  {string} parameters The directive parameters
             * @param  {EMV} model         The EMV instance applied on the element
             */

        }, {
            key: 'bind',
            value: function bind(element, parameters, model) {
                var _this6 = this;

                window.onhashchange = function () {
                    if (_this6.model) {
                        Array.from(element.childNodes).forEach(function (child) {
                            _this6.model.$clean(child);
                        });
                    }

                    _this6.render(element, model);
                };
            }
        }]);

        return Router;
    }(EMV);

    // Register the router on EMV.$router


    EMV.$router = new Router();

    // The router directive
    EMV.directive('router', EMV.$router);

    // The path transformation, to display path in href attributes
    EMV.transform('path', function (value, param) {
        return '#' + EMV.$router.getPath(value, param);
    });
});
