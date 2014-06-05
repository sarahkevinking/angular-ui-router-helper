module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-docular');
 
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
        , docular: {
            groups: [
                {
                    groupTitle: 'Ui Router Helper'
                    , groupId: 'ui.router.helper'
                    , groupIcon: 'icon-beer'
                    , sections: [
                        {
                            id: "provider"
                            , title: "Provider"
                            , scripts: [
                                "index.js"
                            ]
                            , docs: [
                                "index.doc"
                            ]
                            , rank: {}
                        }
                    ]
                }
            ]
            , showDocularDocs: true
            , showAngularDocs: true
        }
    });
    grunt.registerTask('default', ['docular']);
 
};
