function getPloaderSantaConfig(serviceTopology, baseVersion, PackagesUtil) {

    var isSemver = RegExp.prototype.test.bind(/^(\d*\.\d*\.\d*)$/);
    var isAddress = RegExp.prototype.test.bind(/^https?:\/\//);
    var isCommitSha = RegExp.prototype.test.bind(/^([a-f]|\d){40}$/);

    function isValidBaseVersion(str) {
        var baseVersionWhiteList = ['http://localhost', 'http://s3.amazonaws.com/integration-tests-statics/'];
        function isInWhiteList(paramValue) {
            return baseVersionWhiteList.some(function(address) {
                return str.indexOf(address) === 0;
            });
        }
        return str
            && (isSemver(str)
            || isCommitSha(str)
            || isInWhiteList(str));
    }

    var packages = ["animations","cloud","components","componentsPreviewLayer","core","documentServices","editingRendererPlugins","fonts","layout","previewExtensionsCore","qaAutomation","render","server","skins","testUtils","tpa","tpaIntegration","tweenEngine","utils","widgets","wixCode","wixCodeIntegration","wixSites","wixappsBuilder","wixappsClassics","wixappsCore"];
    /* global joinURL */
function getViewerRjsConfig (serviceTopology) {
    /* eslint strict:0 */

    //TODO: cancel fallback to staticServerUrl when server is stable
    var scriptsLocation = serviceTopology.scriptsDomainUrl || serviceTopology.staticServerUrl;
    var serviceURL = joinURL.bind(null, scriptsLocation, 'services', 'third-party');
    return {
        //By default load any module IDs from js/lib
        baseUrl: '/',
        //except, if the module ID starts with "app",
        //load it from the js/app directory. paths
        //config is relative to the baseUrl, and
        //never includes a ".js" extension since
        //the paths config could be for a directory.
        paths: {
            experiment: 'js/plugins/experiment/experiment',
            RemoteModelInterface: 'static/wixcode/static/RemoteModelInterface',
            modernizr: serviceURL('modernizer/2.6.2/modernizr-2.6.2.min'),
            lodash: serviceURL('lodash/3.10.1/lodash.min'),
            react: {min: serviceURL('react/0.14.3/react-with-addons.min'), source: '//cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-with-addons'},
            reactDOM: {min: serviceURL('react/0.14.3/react-dom.min'), source: '//cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom'},
            reactDOMServer: {min: serviceURL('react/0.14.3/react-dom-server.min'), source: '//cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom-server'},
            zepto: serviceURL('zepto/1.1.3/zepto.min'),
            speakingurl: serviceURL('speakingurl/speakingurl.min'),
            immutable: {min: serviceURL('immutable/3.6.2/immutable.min'), source: serviceURL('immutable/3.6.2/immutable')},
            mousetrap: serviceURL('mousetrap/1.4.6/mousetrap.min'),
            swfobject: serviceURL('swfobject/2.3.20130521/swfobject.min'),
            TweenMax: {min: serviceURL('tweenmax/1.18.2/minified/TweenMax.min'), source: serviceURL('tweenmax/1.18.2/uncompressed/TweenMax')},
            TimelineMax: {min: serviceURL('tweenmax/1.18.2/minified/TweenMax.min'), source: serviceURL('tweenmax/1.18.2/uncompressed/TweenMax')},
            ScrollToPlugin: {min: serviceURL('tweenmax/1.18.2/minified/plugins/ScrollToPlugin.min'), source: serviceURL('tweenmax/1.18.2/uncompressed/plugins/ScrollToPlugin')},
            DrawSVGPlugin: {min: serviceURL('tweenmax/1.18.2/minified/plugins/DrawSVGPlugin.min'), source: serviceURL('tweenmax/1.18.2/uncompressed/plugins/DrawSVGPlugin')},
            color: 'js/vendor/color/color.min',
            jasmine: 'js/vendor/jasmine/jasmine2',
            'jasmine-html': 'js/vendor/jasmine/jasmine-html',
            'jasmine-boot': 'js/vendor/jasmine/jasmine-boot',
            bluebird: {min: 'js/vendor/bluebird.min', source: 'js/vendor/bluebird'},
            SoundManager: 'js/vendor/soundmanager2/soundmanager2-nodebug-jsmin',
            ajv: 'js/vendor/ajv/ajv.min',
            ReactProxy: 'js/vendor/ReactProxy',
            Squire: 'js/vendor/squire/Squire',
            io: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.0/socket.io.min',
            hot: './node_modules/santa-utils/common/hot/listener',
            patcher: './node_modules/santa-utils/common/hot/patcher',
            fake: 'js/plugins/fake/src/main/fake',
            definition: 'js/plugins/definition/src/main/definition'

        },
        // generated
        packages: null,
        bundles: null,
        shim: {
            zepto: {exports: '$'},
            color: {exports: 'Color'},
            'jasmine-html': {
                deps: ['jasmine']
            },
            'jasmine-boot': {
                deps: ['jasmine', 'jasmine-html']
            },
            bluebird: {exports: 'bluebird'},
            SoundManager: {exports: 'soundManager'},
            ReactProxy: {
                deps: ['react'],
                exports: 'ReactProxy'
            }
        },
        waitSeconds: 0
    };
}


    if (!isValidBaseVersion(baseVersion)) {
        baseVersion = serviceTopology.scriptsLocationMap.santa || location.origin;
    }
    var config = getViewerRjsConfig(serviceTopology);

    config.injects = {
        //react: 'react',
        lodash: 'lodash'
    };
    var packagesUtil = new PackagesUtil(packages, window.location.search);
    config = packagesUtil.buildConfig(config);
    //TODO: cancel fallback to staticServerUrl when server is stable
    var scriptsLocation = serviceTopology.scriptsDomainUrl || serviceTopology.staticServerUrl;
    config.baseUrl = isAddress(baseVersion) ?  baseVersion : joinURL(scriptsLocation, 'services', 'santa', baseVersion);
    config.versions = {};
    return config;
}
