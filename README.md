# pi-android-current

A dependency-free [Pi package](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/packages.md) that grounds Android development and code review in Google's live [Android Knowledge Base](https://developer.android.com/tools/agents/android-cli#docs).

The package is deliberately small and project-scoped. Its extension requires the `android-current-docs` skill for Android code review, architecture, implementation, bug fixing, refactoring, testing, and build or dependency work. It does not configure MCP servers, API keys, or global Pi behavior.

## Prerequisite (Windows)

Install Google's Android CLI once:

```powershell
winget install --id Google.AndroidCLI
android -V
android update
```

## Install for one project

From the Android project's root:

```powershell
pi install git:github.com/aercanozcan/pi-android-current -l
```

The `-l` option records the package in that project's `.pi/settings.json`. Other projects are unaffected.

Update or remove it with:

```powershell
pi update git:github.com/aercanozcan/pi-android-current
pi remove git:github.com/aercanozcan/pi-android-current -l
```

You can explicitly invoke the public skill interface with `/skill:android-current-docs`; the extension also tells Pi to load it automatically for Android tasks, including generic requests such as "read the whole codebase and do a code review."

## What it checks

The skill first inspects the project's Gradle wrapper, build files, version catalogs, plugins, SDK levels, Compose BOM, and dependencies. It then searches with `android docs search`, fetches only the best one to three `kb://` results, accepts only official Google sources, and applies compatibility and stable-release constraints.

For code reviews, the skill requires at least one targeted documentation search and validates Android-framework findings against fetched official documentation. Repository-local logic findings remain separate and do not receive artificial citations.

Existing pinned versions are preserved unless an upgrade was requested or documented compatibility requires a change. If Android CLI, the network, or suitable official documentation is unavailable, the skill warns explicitly, continues only with repository-local reasoning where useful, and marks Android-framework claims as unverified.

Third-party library documentation, Composables UI MCP, community Android MCP servers, and vendored documentation snapshots are outside the scope of this first release.

## Development

```powershell
npm test
```

The tests use Node's built-in test runner and install no dependencies.

## License

[MIT](LICENSE)
