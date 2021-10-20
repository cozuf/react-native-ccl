module.exports = {
    project: {
        ios: {
            project: "example/ios/CclExample.xcodeproj"
        },
        android: {
            sourceDir: "example/android/app",
            manifestPath: "src/main/AndroidManifest.xml",
            buildGradlePath: "/build.gradle",
            settingsGradlePath: "../example/android/settings.gradle",
            stringsPath: "src/main/res/values/strings.xml",
            // mainActivityPath: "src/main/java/com/example/MainActivity.java"
        },
    },
    assets: ['./src/Assets/Fonts'],
};
