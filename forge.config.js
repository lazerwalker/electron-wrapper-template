const gitRef = process.env.GITHUB_REF
const appVersion = gitRef.substring(gitRef.lastIndexOf("/") + 2)

console.log(appVersion)

module.exports = {
    packagerConfig: {
        name: process.env.APP_NAME,
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