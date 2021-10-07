import { ConfigPlugin, WarningAggregator, withProjectBuildGradle } from '@expo/config-plugins';

const withNotifeeProjectGradlePlugin: ConfigPlugin = config => {
  return withProjectBuildGradle(config, ({ modResults, ...config }) => {
    if (modResults.language !== 'groovy') {
      WarningAggregator.addWarningAndroid(
        'withNotifee',
        `Cannot automatically configure project build.gradle if it's not groovy`,
      );
      return { modResults, ...config };
    }

    modResults.contents = setMavenRepository(modResults.contents);
    return { modResults, ...config };
  });
};

const setMavenRepository = (projectBuildGradle: string) => {
  if (projectBuildGradle.includes('@notifee/react-native/android/libs')) return projectBuildGradle;

  return projectBuildGradle.replace(
    /repositories\s?{/,
    `repositories {
        maven { url "$rootDir/../node_modules/@notifee/react-native/android/libs" }
    `,
  );
};

export { setMavenRepository };
export default withNotifeeProjectGradlePlugin;
