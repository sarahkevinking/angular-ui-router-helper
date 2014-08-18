angular.module('ui.router.helper', ['ui.router'])
    .provider('state', ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        var self = this
        var state_tree = []
        self.state = function(name, route, middleware) {
            var new_node = middleware | {}
            var node_name = name.toLowerCase().replace(' ', '-')
            new_node = _.extend(new_node, {
                name: name
              , node_name: node_name
              , route: (route === undefined ? route : node_name) + "/" 
              , subnodes: []
              , state_definition: {
                views: {}
                , resolve: {}
              }
            })
            new_node

            new_node.setQuery = function(query_string) {
                var parent = new_node.parent_node
                if(parent && parent.query) {
                    new_node.query = query_string + '&' + parent.query
                } else {
                    new_node.query = query_string
                }
                return new_node
            }

            new_node.state = function(name, route) {
                var node = self.state(name, route, middleware)
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

;
