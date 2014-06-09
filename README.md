# Angular UI Router Helper

## Motivation
Code over configuration
Decorator pattern over config blob
Want to be clear what things are doing

## Dependencies
    angular
    ui.router
    underscore

## Installing
    bower install angular-ui-router-helper

## Using
    angular.module('demo', ['ui.router.helper'])
    .config(['stateTree', function(stateTree){
        var home = stateTree.node('home')
        home.view('content', '/example.html')
        home.register()
    })
        

