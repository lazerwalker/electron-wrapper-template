const gitRef = process.env.GITHUB_REF || ''

// By default, the version number is the GH Actions build number
// This will not change if you re-run an exact build.
// (I wanted to use the commit SHA, but Windows version numbers must be decimal)
let appVersion = process.env.GITHUB_RUN_NUMBER

// However, if there's a git tag of the form "v1.2.3", use that instead
// It's assumed power users will prefer manually tagging vesrions.
if (gitRef.lastIndexOf("/") != -1) {
    // A Windows version number must only be Semver-like numbers
    // The "+2" skips past the "v", and the regex ensures number-ness
    // TODO: Do Windows version numbers allow suffixes like "-beta"?
    let version = gitRef.substring(gitRef.lastIndexOf("/") + 2)
    if (/^[0-9.]*$/.test(version)) {
        appVersion = version
     }
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
            entitlements: './entitlements.plist',      
            'entitlements-inherit': './entitlements.plist',      
            'gatekeeper-assess': false,
            hardenedRuntime: true,
            identity: process.env['CERTIFICATE_NAME']
        },
        osxNotarize: {
            appleId: process.env['APPLE_ID'],
            appleIdPassword: process.env['APPLE_ID_PASSWORD'],
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


if (process.env["APPLE_PROVIDER"]) {
    module.exports.packagerConfig.osxNotarize.ascProvider = process.env["APPLE_PROVIDER"]
}