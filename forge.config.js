const gitRef = process.env.GITHUB_REF
const appVersion = gitRef.substring(gitRef.lastIndexOf("/") + 1)

console.log(process.env)

module.exports = {
    packagerConfig: {
        name: process.env.APP_NAME,
        appVersion,
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