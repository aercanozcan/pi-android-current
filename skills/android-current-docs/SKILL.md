---
name: android-current-docs
description: Grounds Android development and code review in Google's live Android Knowledge Base. Use for Android code reviews, architecture reviews, implementation, bug fixes, refactoring, testing, build or dependency work, API behavior, versions, Jetpack, Compose, AGP, SDK, deprecations, and Firebase.
license: MIT
---

# Android Current Docs

Use Google's live Android Knowledge Base for Android development tasks, including code reviews that do not explicitly mention versions. Keep this workflow scoped to the current project and do not add MCP configuration, API keys, or global Pi settings.

Require Google's Android CLI (`android`) with network access for live documentation search and fetch.

## Workflow

1. Inspect the project before searching. Read the relevant files that exist, including:
   - `gradle/wrapper/gradle-wrapper.properties`
   - root and module `build.gradle` or `build.gradle.kts` files
   - `settings.gradle` or `settings.gradle.kts`
   - `gradle/libs.versions.toml` and other version catalogs
   - SDK levels, plugin declarations, Compose BOM coordinates, and existing dependency constraints
2. Identify the narrow decision to ground. Form a specific query that includes the component and compatibility concern, rather than a broad request such as "latest Android".
3. Confirm Android CLI is available with `android -V`. Then run:

   ```text
   android docs search "<specific query>"
   ```

4. Review the results and select only the best one to three `kb://` identifiers. Fetch each selected result individually:

   ```text
   android docs fetch <kb://identifier>
   ```

5. Accept a result only when its fetched material is official Google documentation. Valid source families include Android Developers, Jetpack, Compose, Firebase, Google Developers, and Google's Maven repository. Expected canonical domains include `developer.android.com`, `firebase.google.com`, `developers.google.com`, and `maven.google.com`. Discard community posts, mirrors, generated summaries without an official source, and unrelated results.
6. Compare the fetched guidance with the project's actual Gradle, AGP, Kotlin, SDK, Compose, and dependency constraints. Prefer the newest stable release that is compatible with those constraints.
7. Preserve versions already pinned by the project unless the user requested an upgrade or a documented compatibility requirement makes a change necessary.
8. Make the smallest compatible recommendation or edit. In the final response, list the official source links exposed by fetched documents; if a canonical link is unavailable, list the consulted `kb://` identifiers.

## Code reviews

For an Android code review:

1. Inspect the build configuration and relevant implementation before choosing documentation queries.
2. Run at least one targeted Android Knowledge Base search before finalizing the review. Query the exact Android or Google APIs involved in suspected findings rather than searching for generic review advice.
3. Fetch official documentation before claiming that an Android API is misused, deprecated, incompatible, unsafe, or contrary to current guidance.
4. Separate repository-local findings, such as incorrect state transitions or missing tests, from findings grounded in Android documentation. Local logic findings do not need artificial citations.
5. Add a short "Android documentation consulted" section to the review. If live documentation is unavailable, state that Android-framework claims remain unverified instead of silently relying on training data.

## Release policy

- Stable releases are the default.
- Do not introduce alpha, beta, release-candidate, canary, dev, EAP, or other preview versions unless the user explicitly requests previews or the project already uses that preview channel for the relevant component.
- A numerically newer release is not preferable when it is incompatible with the project's Gradle, AGP, Kotlin, compile SDK, min SDK, Java, Compose compiler, or BOM constraints.
- Do not opportunistically upgrade unrelated pinned dependencies.
- For third-party libraries, use normal Pi research behavior; this skill's Android Knowledge Base authority is limited to official Google material.

## Failure behavior

If `android` is missing, the search or fetch command fails, network access is unavailable, no relevant `kb://` result exists, or official provenance cannot be established:

1. State the exact limitation clearly.
2. Do not invent or rely on remembered versions, compatibility claims, deprecation status, or APIs as if they were current.
3. Continue only with repository-local reasoning when useful, and clearly mark Android API, compatibility, deprecation, and current-best-practice claims as unverified.
4. Avoid version-sensitive edits until the documentation can be consulted, unless the user explicitly chooses to proceed with the uncertainty.
5. Provide the Windows setup commands when Android CLI is missing:

   ```powershell
   winget install --id Google.AndroidCLI
   android -V
   android update
   ```

## Out of scope

Do not configure Composables UI MCP, community Android MCP servers, third-party documentation services, API keys, or vendored snapshots of Android documentation.
