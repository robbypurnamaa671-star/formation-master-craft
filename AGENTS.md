# Project decisions

- Package the React/Vite app as a native Android project with Capacitor so it can be opened in Android Studio and prepared for Google Play.
- Keep the Lovable preview URL in the development Capacitor config and strip it from generated Android settings for release builds, preventing store builds from loading preview content.