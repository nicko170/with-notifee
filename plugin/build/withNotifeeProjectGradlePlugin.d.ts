import { ConfigPlugin } from '@expo/config-plugins';
declare const withNotifeeProjectGradlePlugin: ConfigPlugin;
declare const setMavenRepository: (projectBuildGradle: string) => string;
export { setMavenRepository };
export default withNotifeeProjectGradlePlugin;
