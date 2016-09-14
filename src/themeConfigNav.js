function themeConfigNav($mdThemingProvider) {
    'ngInject';
    var customBlueMap = $mdThemingProvider.extendPalette('blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
    var customWhiteMap = $mdThemingProvider.extendPalette('grey', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });

    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    $mdThemingProvider.definePalette('white', customWhiteMap);
    // $mdThemingProvider.theme('default')
    //     .primaryPalette('grey', {
    //         'default': '900',
    //         'hue-1': '50',
    //         'hue-2': '200',
    //         'hue-3': '500'
    //     })
    //     .accentPalette('light-green', {
    //         'default': '200'
    //     })
        
    $mdThemingProvider.theme('navTheme')
        .primaryPalette('black')
        .accentPalette('black')
        // .backgroundPalette('light-green')
    //     .backgroundPalette('white')
    //     .primaryPalette('customBlue', {
    //         'default': '500',
    //         'hue-1': '50'
    //     })
    //     .accentPalette('green', {
    //         'default': '500',
    //         'hue-3': '700'
    //     });
    // $mdThemingProvider.theme('input', 'default')
    //     .primaryPalette('grey');

}
export default themeConfigNav;