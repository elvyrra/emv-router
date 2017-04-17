/*global define, module, exports*/
/* eslint no-invalid-this:0 */

/**
 * emv-router.js 1.0.0
 *
 * @author Elvyrra S.A.S
 * @license http://rem.mit-license.org/ MIT
 */
'use strict';

(function(global, factory) {
    if(typeof exports === 'object' && typeof module !== 'undefined') {
        const EMV = require('emv');

        module.exports = factory(EMV);
    }
    else if (typeof define === 'function' && define.amd) {
        define(['emv'], factory);
    }
    else {
        factory(global.EMV);
    }
})(this, function(EMV) {
    /**
     * This class describes the bevahior of a route
     */
    class Route {
        /**
         * Constructor
         * @param  {Object} data The route data
         */
        constructor(data) {
            Object.keys(data).forEach((key) => {
                this[key] = data[key];
            });

            this.args = [];
            this.pattern = this.path.replace(/\{(\w+?)\}/g, (match, arg) => {
                this.args.push(arg);

                return '(.*?)';
            });
        }

        /**
         * Get the route path
         * @param   {Object} param The path parameters
         * @returns {string}       The route path
         */
        getPath(param) {
            let path = this.path;

            if(param) {
                Object.keys(param).forEach((key) => {
                    path = path.replace(`{${key}}`, param[key]);
                });
            }

            return path;
        }


        /**
         * Check if the route matches a path
         * @param   {string} path The path to check
         * @returns {boolean}     True if the route matches the path, else false
         */
        match(path) {
            const regex = new RegExp(`^${this.pattern}$`);

            return path.match(regex);
        }

        /**
         * Get the path data
         * @param   {string} path The path to check
         * @returns {Object}      The path data, or null if the route does not match the path
         */
        getData(path) {
            const regex = new RegExp(`^${this.pattern}$`);
            const match = regex.exec(path);
            const data = {};

            if(match === null) {
                return null;
            }


            this.args.forEach((arg, index) => {
                data[arg] = match[index + 1];
            });

            return data;
        }
    }

    /**
     * This class manage the router directive
     */
    class Router extends EMV {
        /**
         * Construct
         */
        constructor() {
            super({
                data : {
                    path : '',
                    route : null
                },
                computed : {
                    template : function() {
                        if(!this.route) {
                            return '';
                        }

                        return this.route.template || this.route.templateUrl;
                    },
                    model : function() {
                        if(!this.route) {
                            return null;
                        }

                        return this.route.model;
                    }
                }
            });

            this.$watch('model', (model) =>{
                if(this.route && this.route.init && model[this.route.init]) {
                    this.model[this.route.init].call(model);
                }
            });
        }


        /**
         * Get a path by the route name
         * @param   {string} routeName The route name
         * @param   {Object} data      The data to inject in the path
         * @returns {string}           The found path, or '/' if not found
         */
        getPath(routeName, data) {
            const route = this.getRoute(routeName);

            if(!route) {
                return '/';
            }

            return route.getPath(data);
        }

        /**
         * Get a route by a route name
         * @param  {string} routeName The route name
         * @returns {Object}           The found route, or null if not found
         */
        getRoute(routeName) {
            return this.routes[routeName] || null;
        }


        /**
         * Get the name of a route by a path
         * @param  {string} path The path
         * @returns {string}     The found route name
         */
        getRouteNameByPath(path) {
            return Object.keys(this.routes).find((name) => {
                return this.routes[name].match(path);
            });
        }


        /**
         * Get the route by it path
         * @param   {string} path The path
         * @returns {Object}     The found route
         */
        getRouteByPath(path) {
            const routeName = this.getRouteNameByPath(path);

            return routeName && this.routes[routeName] || null;
        }


        /**
         * Render the element content
         * @param  {DOMNode} element The element to render
         * @param  {EMV}     model   The EMV instance applied on the element
         */
        render(element, model) {
            this.path = location.hash.substr(1);
            const route = this.getRouteByPath(this.path);

            if(!route) {
                this.route = route;

                return;
            }

            if(route.templateUrl && !model.$templates[route.templateUrl]) {
                // Load the template
                const xhr = new XMLHttpRequest();

                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        // The view has been successfully loaded
                        model.$registerTemplate(route.templateUrl, xhr.responseText);

                        this.route = route;
                    }
                };

                xhr.open('GET', route.templateUrl, true);
                xhr.send(null);
            }
            else {
                this.route = route;
            }
        }

        /**
         * Init the directive
         * @param  {DOMNode} element   The element the directive is applied on
         * @param  {string} parameters The directive parameters
         * @param  {EMV} model         The EMV instance applied on the element
         */
        init(element, parameters, model) {
            this.routes = {};
            Object.keys(EMV.config.routes).forEach((routeName) => {
                this.routes[routeName] = new Route(EMV.config.routes[routeName]);
            });

            model.$observe('$router', this);

            model.$setElementDirective(element, 'with', '$router.model');
            EMV.directives.with.init.call(this, element, '$router.model', this);
            model.$setElementDirective(element, 'template', '$parent.template');

            if(!location.hash) {
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
        bind(element, parameters, model) {
            window.onhashchange = () => {
                if(this.model) {
                    Array.from(element.childNodes).forEach((child) => {
                        this.model.$clean(child);
                    });
                }

                this.render(element, model);
            };
        }
    }

    // Register the router on EMV.$router
    EMV.$router = new Router();

    // The router directive
    EMV.directive('router', EMV.$router);

    // The path transformation, to display path in href attributes
    EMV.transform('path', function(value, param) {
        return `#${EMV.$router.getPath(value, param)}`;
    });
});