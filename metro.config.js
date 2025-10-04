const os = require("os");
if (!os.availableParallelism) {
  os.availableParallelism = () => os.cpus().length; // fallback
}

if (typeof AbortSignal !== 'undefined' && !AbortSignal.prototype.throwIfAborted) {
  AbortSignal.prototype.throwIfAborted = function() {
    if (this.aborted) {
      throw this.reason || new DOMException('AbortError', 'AbortError');
    }
  };
}


const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require("nativewind/metro");



const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;





/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    assetExts: assetExts.filter((extension) => extension !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
    unstable_allowRequireContext: true,
  },
};



const mergedConfig = mergeConfig(defaultConfig, config);

module.exports = withNativeWind(mergedConfig, { input: "./global.css" });

