# Angular UI Router Helper

## Motivation
Angular UI Router provides a great API to define routes and the view heirarchy of an angular project. However it can be clumsy to use when there are many states in a project or when you want to define reusable middlewares: validate credentials, redirecting a user, registering states with other providers (ie for a menu), or changing page layouts.

This helper solves these problems by providing an API to modify a state object prior to configuration. Developers can define state-view relationships, create reusable middlewares, and easily define state parameters.

## Dependencies
    angular
    angular-ui-router
    underscore

## Installing
    bower install angular-ui-router-helper

## Example
Download the repo and open the ```example.html``` demo.

