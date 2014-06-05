/**
 * @ngdoc module
 * @name ui-tree
 * @description 
 *
 * Betable State is a wrapper around ui-router.
 */
angular.module('ui.router.helper', ['ui.router'])
    /**
     * @ngdoc service
     * @name ui-tree.service:stateTree
     * @description
     * Turnt down for what
     */
    .provider('stateTree', ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        var self = this
        var state_tree = []
        /**
         * @ngdoc method
         * @methodOf ui-tree.service:stateTree
         * @name ui-tree.service:stateTree#state
         * @description
         * Turnt up for what
         * Returns a {@link ui-tree.object:node node} object 
         *
         * @param {String} name of the node
         */
        self.node = function(name) {
            var new_node = {}
            /**
             * @ngdoc object
             * @name ui-tree.object:node
             * @description
             * A state definition object
             * @property {string} name the display name
             * @property {string} node_name the internal node name
             * @property {route} relative URI to the node
             */
            var node_name = name.toLowerCase().replace(' ', '-')
            new_node = _.extend(new_node, {
                name: name
              , node_name: node_name
              , route: node_name + '/'
              , subnodes: []
              , state_definition: {
                views: {}
              }
            })

            new_node.setQuery = function(query_string) {
                var parent = new_node.parent_node
                if(parent && parent.query) {
                    new_node.query = query_string + '&' + parent.query
                } else {
                    new_node.query = query_string
                }
                return new_node
            }

            /**
             * @ngdoc method
             * @methodOf ui-tree.object:node
             * @name ui-tree.object:node#subnode
             * @description
             * Creates a newnode with name subname. The node is assigned the callers node
             * as the parent node
             *
             * @param {String} name the node's name
             **/
            new_node.subnode = function(name) {
                var node = self.node(name)
                node.parent_node = this
                this.subnodes.push(node)
                return node
            }
            new_node.view = function view(view_name, template_name) {
                new_node.state_definition.views[view_name]= {
                    templateUrl: template_name
                }
                return new_node 
            }


            /**
             * @ngdoc method
             * @methodOf ui-tree.object:node
             * @name ui-tree.object:node#register
             * @description
             * Registers the state definitions with ui-router
             **/
            new_node.register = function register() {
                if (!new_node.registered) {
                    new_node.registered = true
                    new_node.state_name = new_node.node_name
                    new_node.state_definition.url = new_node.route 
                    if(new_node.parent_node) {
                        //Generate full state name path
                        new_node.state_name = new_node.parent_node.state_name + "." + new_node.node_name

                        //Generate full registered URL
                        if(new_node.query) {
                            new_node.state_definition.url = new_node.route + '?' + new_node.query
                        }
                    } else {
                        new_node.state_definition.url = '/' + new_node.route 
                        state_tree.push(new_node)
                    }
                    $stateProvider.state(new_node.state_name, new_node.state_definition)
                    _.each(new_node.subnodes, function(node) {
                        node.register()
                    })
                }
            }
            return new_node
        }
        self.$get = function() {
            return state_tree
        }
    }])

