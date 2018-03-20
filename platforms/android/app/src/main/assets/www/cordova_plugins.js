cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "cordova-plugin-video-thumbnail.video-thumbnail",
    "file": "plugins/cordova-plugin-video-thumbnail/www/VideoThumbnail.js",
    "pluginId": "cordova-plugin-video-thumbnail",
    "clobbers": [
      "navigator.createThumbnail"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-splashscreen": "5.0.1",
  "cordova-plugin-video-thumbnail": "2.0.1"
};
// BOTTOM OF METADATA
});