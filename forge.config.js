module.exports = {
    packagerConfig: {
        name: process.env.APP_NAME,
        appVersion: process.env.RELEASE_VERSION,
        icon: "./icons/icon"
    },
    makers: [
    {
        name: "@electron-forge/maker-squirrel",
        config: {
        name: "test_electron_forge"
        }
    },
    {
        name: "@electron-forge/maker-zip",
        platforms: [
            darwin
        ]
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