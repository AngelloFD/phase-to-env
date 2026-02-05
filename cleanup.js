const fs = require('fs');
const core = require('@actions/core');

try {
  const secretFilePath = core.getInput('SECRET_FILE_PATH') || '.env';

  if (fs.existsSync(secretFilePath)) {
    fs.unlinkSync(secretFilePath);
    core.info(`Successfully deleted temporary secret file: ${secretFilePath}`);
  } else {
    core.info(`ℹFile ${secretFilePath} does not exist, skipping cleanup.`);
  }
} catch (error) {
  core.warning(`Failed to delete secret file: ${error.message}`);
}
