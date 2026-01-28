# Phase Secrets to .env Action

This GitHub Action allows you to fetch secrets from [Phase](https://phase.dev) and inject them into your workflow by creating a `.env` file or exporting them as environment variables.

## Features

- 🔒 Securely fetch secrets from Phase Console.
- 📁 Automatic `.env` file generation.
- ⚡ Option to export secrets directly to `GITHUB_ENV` for use in subsequent steps.
- 🚫 Ability to exclude specific secrets.
- 🌍 Support for self-hosted Phase instances.

## Basic Usage

```yaml
steps:
  - name: Checkout code
    uses: actions/checkout@v4

  - name: Phase Secrets to .env
    uses: AngelloFD/phase-to-env@v1
    with:
      APP_ID: ${{ secrets.PHASE_APP_ID }}
      SERVICE_TOKEN: ${{ secrets.PHASE_SERVICE_TOKEN }}
      ENV_NAME: 'production'
      HOST: 'https://console.phase.dev'

  - name: Use .env file
    run: |
      cat .env
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|-----------|-------------------|
| `APP_ID` | Your Phase App ID. | ✅ Yes | N/A |
| `SERVICE_TOKEN` | Service Token for authentication. | ✅ Yes | N/A |
| `ENV_NAME` | Environment name to query (e.g., `production`, `development`). | ✅ Yes | N/A |
| `HOST` | Phase API base URL (e.g., `https://console.phase.dev`). | ✅ Yes | N/A |
| `SECRET_FILE_PATH` | Path/Name of the output file. | ❌ No | `.env` |
| `EXPORT_ENV_VARS` | If `true`, exports secrets as workflow environment variables. | ❌ No | `false` |
| `EXCLUDE_SECRETS` | Comma-separated list of secret names to exclude. | ❌ No | N/A |

## Use Cases

### 1. Generate a custom .env file

If you need the file to have a specific name (e.g., for frameworks using `.env.local` or `.env.prod`):

```yaml
- uses: AngelloFD/phase-to-env@v1
  with:
    APP_ID: ${{ secrets.PHASE_APP_ID }}
    SERVICE_TOKEN: ${{ secrets.PHASE_SERVICE_TOKEN }}
    ENV_NAME: 'production'
    HOST: 'https://console.phase.dev'
    SECRET_FILE_PATH: '.env.production'
```

### 2. Export secrets as environment variables

Useful if you need to use secrets directly in subsequent step commands without reading a file:

```yaml
- uses: AngelloFD/phase-to-env@v1
  with:
    APP_ID: ${{ secrets.PHASE_APP_ID }}
    SERVICE_TOKEN: ${{ secrets.PHASE_SERVICE_TOKEN }}
    ENV_NAME: 'production'
    HOST: 'https://console.phase.dev'
    EXPORT_ENV_VARS: 'true'

- name: Print Secret (Masked)
  run: echo "My secret is $MY_SECRET_KEY"
```

### 3. Exclude specific secrets

If there are secrets in Phase you don't want to bring into the CI/CD environment:

```yaml
- uses: AngelloFD/phase-to-env@v1
  with:
    APP_ID: ${{ secrets.PHASE_APP_ID }}
    SERVICE_TOKEN: ${{ secrets.PHASE_SERVICE_TOKEN }}
    ENV_NAME: 'production'
    HOST: 'https://console.phase.dev'
    EXCLUDE_SECRETS: 'DATABASE_URL,ADMIN_PASSWORD'
```

## Prerequisites

1. Have an account and project configured in [Phase](https://phase.dev).
2. Generate a **Service Token** in the Phase console for your application and environment.
3. Save `PHASE_APP_ID` and `PHASE_SERVICE_TOKEN` as secrets in your GitHub repository.
