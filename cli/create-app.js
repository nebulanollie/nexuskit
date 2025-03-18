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
const readline = require('readline');

// ANSI color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
};

// Utility function to print styled text
function print(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Utility function to execute shell commands
function execute(command, cwd) {
  try {
    execSync(command, { stdio: 'inherit', cwd });
  } catch (error) {
    print(`Failed to execute command: ${command}`, colors.red);
    print(error.message, colors.red);
    process.exit(1);
  }
}

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Main function to create a new NexusKit project
async function createNexusKitApp() {
  // Get the project name from command line arguments
  const projectName = process.argv[2];

  // Verify the project name is provided
  if (!projectName) {
    print("Please provide a project name:", colors.yellow);
    print("  npx create-nexuskit-app my-app", colors.cyan);
    process.exit(1);
  }

  // Create the project directory
  const projectPath = path.resolve(process.cwd(), projectName);
  
  // Check if the directory already exists
  if (fs.existsSync(projectPath)) {
    print(`The directory ${projectName} already exists. Please choose a different name or delete the existing directory.`, colors.red);
    process.exit(1);
  }

  // Create the project directory
  fs.mkdirSync(projectPath, { recursive: true });

  // Print welcome message
  print("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", colors.blue);
  print(`${colors.bright}${colors.blue} Creating a new NexusKit project in ${colors.cyan}${projectPath}${colors.blue}${colors.reset}`);
  print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n", colors.blue);

  // Clone the repository
  print("1. Cloning NexusKit template...", colors.bright);
  execute(`git clone --depth 1 https://github.com/yourusername/nexuskit.git .`, projectPath);

  // Remove the .git directory to start fresh
  fs.rmSync(path.join(projectPath, '.git'), { recursive: true, force: true });

  // Create a new .env.local file from the .env.example
  print("2. Setting up environment variables...", colors.bright);
  fs.copyFileSync(
    path.join(projectPath, '.env.example'),
    path.join(projectPath, '.env.local')
  );

  // Generate a random AUTH_SECRET
  const authSecret = require('crypto').randomBytes(32).toString('base64');
  const envContent = fs.readFileSync(path.join(projectPath, '.env.local'), 'utf8');
  fs.writeFileSync(
    path.join(projectPath, '.env.local'),
    envContent.replace('AUTH_SECRET="replace_with_a_secure_random_value"', `AUTH_SECRET="${authSecret}"`)
  );

  // Initialize a new git repository
  print("3. Initializing git repository...", colors.bright);
  execute('git init', projectPath);

  // Install dependencies
  print("4. Installing dependencies...", colors.bright);
  execute('npm install', projectPath);

  // Initialize Prisma
  print("5. Setting up Prisma...", colors.bright);
  execute('npx prisma generate', projectPath);

  // Success message
  print("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", colors.green);
  print(`${colors.bright}${colors.green} Success! Created ${projectName} at ${projectPath}${colors.reset}`);
  print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n", colors.green);

  // Instructions for the next steps
  print("Inside that directory, you can run several commands:", colors.bright);
  print("  npm run dev", colors.cyan);
  print("    Starts the development server.\n", colors.dim);
  print("  npm run build", colors.cyan);
  print("    Builds the app for production.\n", colors.dim);
  print("  npm start", colors.cyan);
  print("    Runs the built app in production mode.\n", colors.dim);

  print("To get started, run:", colors.bright);
  print(`  cd ${projectName}`, colors.cyan);
  print("  npm run dev", colors.cyan);
  
  print("\nNexusKit documentation:", colors.bright);
  print("  https://nexuskit.dev/docs\n", colors.cyan);
}

// Execute the main function
createNexusKitApp().finally(() => {
  rl.close();
}); 