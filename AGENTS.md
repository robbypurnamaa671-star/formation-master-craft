# Project decisions

- Package the React/Vite app as a native Android project with Capacitor so it can be opened in Android Studio and prepared for Google Play.
- Keep the Lovable preview URL in the development Capacitor config and use a separate bundled-assets config for Android releases, preventing store builds from loading preview content.