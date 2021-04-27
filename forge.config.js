const gitRef = process.env.GITHUB_REF

// By default, the version number is the GH Actions build number
// This will not change if you re-run an exact build.
// (I wanted to use the commit SHA, but Windows version numbers must be decimal)
let appVersion = process.env.GITHUB_RUN_NUMBER

// However, if there's a git tag, use that for the version number instead
// It's assumed power users will prefer manually tagging vesrions.
if (gitRef.lastIndexOf("/") != -1) {
 appVersion = gitRef.substring(gitRef.lastIndexOf("/") + 2)
}

console.log(appVersion)

module.exports = {
    packagerConfig: {
        name: process.env.APP_NAME,
        executableName: process.env.APP_NAME,
        appVersion: appVersion,
        buildVersion: appVersion,
        icon: "./icons/icon",
        osxSign: {
            'gatekeeper-assess': false,
            hardenedRuntime: true,
            identity: 'Developer ID Application: YOUR NAME HERE (YOUR ID HERE)'
        },
        osxNotarize: {
            appleId: process.env['APPLE_ID'],
            appleIdPassword: process.env['APPLE_ID_PASSWORD']
        }
    },
    makers: [
    {
        name: "@electron-forge/maker-squirrel",
        config: {
            name: "test_electron_forge",
            certificateFile: process.env['WINDOWS_PFX_FILE'],
            certificatePassword: process.env['WINDOWS_PFX_PASSWORD']
        }
    },
    {
        name: "@electron-forge/maker-zip",
        platforms: ["darwin"]
    },
    {
        name: "@electron-forge/maker-deb",
        config: {}
    },
    {
        name: "@electron-forge/maker-rpm",
        config: {}
    }
    ]
}
