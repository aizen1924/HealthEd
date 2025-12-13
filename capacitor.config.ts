import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'HealthEd',
  webDir: 'www',
  server: {
    // server config
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Show for 3000ms (3 seconds)
      launchAutoHide: true,     // Hide automatically
      backgroundColor: "#ffffffff", // White background
      androidSplashResourceName: "splash",
      showSpinner: true,        // Show a loading spinner
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999",
    }
  }
};

export default config;