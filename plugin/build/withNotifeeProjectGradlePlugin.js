"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMavenRepository = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const withNotifeeProjectGradlePlugin = config => {
    return config_plugins_1.withProjectBuildGradle(config, ({ modResults, ...config }) => {
        if (modResults.language !== 'groovy') {
            config_plugins_1.WarningAggregator.addWarningAndroid('withNotifee', `Cannot automatically configure project build.gradle if it's not groovy`);
            return { modResults, ...config };
        }
        modResults.contents = setMavenRepository(modResults.contents);
        return { modResults, ...config };
    });
};
const setMavenRepository = (projectBuildGradle) => {
    if (projectBuildGradle.includes('@notifee/react-native/android/libs'))
        return projectBuildGradle;
    return projectBuildGradle.replace(/repositories\s?{/, `repositories {
        maven { url "$rootDir/../node_modules/@notifee/react-native/android/libs" }
    `);
};
exports.setMavenRepository = setMavenRepository;
exports.default = withNotifeeProjectGradlePlugin;
