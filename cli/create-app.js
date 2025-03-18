#!/usr/bin/env node

/**
 * create-nexuskit-app
 * 
 * This script creates a new NexusKit project by:
 * 1. Creating a new directory with the provided name
 * 2. Copying the template files
 * 3. Setting up the project (installing dependencies, initializing git, etc.)
 * 
 * Usage: npx create-nexuskit-app my-app
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const prompts = require('prompts');

// Utility function to print styled text
function print(message, color) {
  console.log(color ? chalk[color](message) : message);
}

// Utility function to execute shell commands
function execute(command, cwd) {
  try {
    execSync(command, { stdio: 'inherit', cwd });
    return true;
  } catch (error) {
    print(`Failed to execute command: ${command}`, 'red');
    print(error.message, 'red');
    return false;
  }
}

// Main function to create a new NexusKit project
async function createNexusKitApp() {
  // Get the project name from command line arguments
  const projectName = process.argv[2];

  // Verify the project name is provided
  if (!projectName) {
    print("Please provide a project name:", 'yellow');
    print("  npx create-nexuskit-app my-app", 'cyan');
    process.exit(1);
  }

  // Create the project directory
  const projectPath = path.resolve(process.cwd(), projectName);
  
  // Check if the directory already exists
  if (fs.existsSync(projectPath)) {
    print(`The directory ${projectName} already exists. Please choose a different name or delete the existing directory.`, 'red');
    process.exit(1);
  }

  // Create the project directory
  fs.mkdirSync(projectPath, { recursive: true });

  // Print welcome message
  print("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", 'blue');
  print(`Creating a new NexusKit project in ${chalk.cyan(projectPath)}`, 'blue');
  print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n", 'blue');

  // Clone the repository
  print("1. Cloning NexusKit template...", 'blue');
  const cloneSuccess = execute(`git clone --depth 1 https://github.com/nebulanollie/nexuskit.git .`, projectPath);
  
  if (!cloneSuccess) {
    print("Failed to clone the repository. Make sure git is installed and try again.", 'red');
    process.exit(1);
  }

  // Remove the .git directory to start fresh
  const gitDir = path.join(projectPath, '.git');
  if (fs.existsSync(gitDir)) {
    fs.rmSync(gitDir, { recursive: true, force: true });
  }

  // Create a new .env.local file from the .env.example
  print("2. Setting up environment variables...", 'blue');
  const envExamplePath = path.join(projectPath, '.env.example');
  const envLocalPath = path.join(projectPath, '.env.local');
  
  if (fs.existsSync(envExamplePath)) {
    // Generate a random AUTH_SECRET
    const authSecret = require('crypto').randomBytes(32).toString('base64');
    const envContent = fs.readFileSync(envExamplePath, 'utf8');
    fs.writeFileSync(
      envLocalPath,
      envContent.replace('AUTH_SECRET="replace_with_a_secure_random_value"', `AUTH_SECRET="${authSecret}"`)
    );
  } else {
    print("Warning: .env.example file not found. Creating a basic .env.local file...", 'yellow');
    fs.writeFileSync(
      envLocalPath,
      `DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"\nAUTH_SECRET="${require('crypto').randomBytes(32).toString('base64')}"`
    );
  }

  // Initialize a new git repository
  print("3. Initializing git repository...", 'blue');
  execute('git init', projectPath);

  // Install dependencies
  print("4. Installing dependencies...", 'blue');
  
  // Check which package manager is available
  let packageManager = 'npm';
  if (execute('pnpm --version', projectPath, true, true)) {
    packageManager = 'pnpm';
  } else if (execute('yarn --version', projectPath, true, true)) {
    packageManager = 'yarn';
  }

  // Install dependencies
  execute(`${packageManager} install`, projectPath);

  // Initialize Prisma
  print("5. Setting up Prisma...", 'blue');
  execute(`${packageManager} exec prisma generate`, projectPath);

  // Success message
  print("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", 'green');
  print(`Success! Created ${projectName} at ${projectPath}`, 'green');
  print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n", 'green');

  // Instructions for the next steps
  print("Inside that directory, you can run several commands:", 'white');
  print(`  ${packageManager} run dev`, 'cyan');
  print("    Starts the development server.\n");
  print(`  ${packageManager} run build`, 'cyan');
  print("    Builds the app for production.\n");
  print(`  ${packageManager} start`, 'cyan');
  print("    Runs the built app in production mode.\n");

  print("To get started, run:", 'white');
  print(`  cd ${projectName}`, 'cyan');
  print(`  ${packageManager} run dev`, 'cyan');
  
  print("\nNexusKit documentation:", 'white');
  print("  https://nexuskit.dev/docs\n", 'cyan');
}

// Execute the main function
createNexusKitApp().catch((error) => {
  console.error('An unexpected error occurred:', error);
  process.exit(1);
}); 