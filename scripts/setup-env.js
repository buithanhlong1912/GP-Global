#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

async function setupEnvironment() {
  console.log(chalk.blue.bold('🚀 VIETBUILD GROUP - Environment Setup'));
  console.log(chalk.gray('This will help you configure all environment variables.\n'));

  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'sanityProjectId',
        message: 'Enter your Sanity Project ID:',
        validate: input => input.length > 0 || 'Project ID is required'
      },
      {
        type: 'input',
        name: 'sanityDataset',
        message: 'Enter your Sanity Dataset:',
        default: 'production',
        validate: input => input.length > 0 || 'Dataset is required'
      },
      {
        type: 'input',
        name: 'sanityApiToken',
        message: 'Enter your Sanity API Token:',
        validate: input => input.length > 0 || 'API Token is required'
      },
      {
        type: 'list',
        name: 'emailService',
        message: 'Choose your email service:',
        choices: [
          { name: 'SendGrid (Recommended)', value: 'sendgrid' },
          { name: 'Gmail/Google Workspace', value: 'gmail' },
          { name: 'Other SMTP', value: 'custom' }
        ]
      },
      {
        type: 'input',
        name: 'smtpHost',
        message: 'Enter SMTP Host:',
        when: (answers) => answers.emailService === 'custom',
        validate: input => input.length > 0 || 'SMTP Host is required'
      },
      {
        type: 'input',
        name: 'smtpPort',
        message: 'Enter SMTP Port:',
        when: (answers) => answers.emailService === 'custom',
        default: '587',
        validate: input => input.length > 0 || 'SMTP Port is required'
      },
      {
        type: 'input',
        name: 'smtpUser',
        message: 'Enter SMTP Username:',
        when: (answers) => answers.emailService !== 'sendgrid',
        validate: input => input.length > 0 || 'SMTP Username is required'
      },
      {
        type: 'password',
        name: 'smtpPass',
        message: 'Enter SMTP Password/API Key:',
        validate: input => input.length > 0 || 'SMTP Password is required'
      },
      {
        type: 'input',
        name: 'emailFrom',
        message: 'Enter from email address:',
        default: 'noreply@vietbuildgroup.vn',
        validate: input => input.includes('@') || 'Valid email is required'
      },
      {
        type: 'list',
        name: 'environment',
        message: 'Choose environment:',
        choices: [
          { name: 'Development', value: 'development' },
          { name: 'Production', value: 'production' }
        ],
        default: 'development'
      }
    ]);

    // Set email configuration based on service choice
    let smtpConfig = {
      host: answers.smtpHost,
      port: answers.smtpPort,
      user: answers.smtpUser,
      pass: answers.smtpPass
    };

    switch (answers.emailService) {
      case 'sendgrid':
        smtpConfig = {
          host: 'smtp.sendgrid.net',
          port: '587',
          user: 'apikey',
          pass: answers.smtpPass
        };
        break;
      case 'gmail':
        smtpConfig = {
          host: 'smtp.gmail.com',
          port: '587',
          user: answers.smtpUser,
          pass: answers.smtpPass
        };
        break;
      case 'custom':
        // Use provided custom config
        break;
    }

    // Generate JWT secret
    const jwtSecret = require('crypto').randomBytes(64).toString('hex');

    // Frontend environment file
    const frontendEnv = `# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=${answers.sanityProjectId}
NEXT_PUBLIC_SANITY_DATASET=${answers.sanityDataset}
NEXT_PUBLIC_SANITY_API_URL=https://${answers.sanityProjectId}.api.sanity.io

# API Configuration
NEXT_PUBLIC_API_URL=${answers.environment === 'production' ? 'https://api.vietbuildgroup.vn' : 'http://localhost:3001'}

# Site Configuration
NEXT_PUBLIC_SITE_URL=${answers.environment === 'production' ? 'https://vietbuildgroup.vn' : 'http://localhost:3000'}
NEXT_PUBLIC_SITE_NAME=VIETBUILD GROUP
NEXT_PUBLIC_SITE_DESCRIPTION=Thiết kế nội thất và cung ứng nhân sự chuyên nghiệp
`;

    // Backend environment file
    const backendEnv = `# Server Configuration
PORT=3001
NODE_ENV=${answers.environment}

# Sanity CMS Configuration
SANITY_PROJECT_ID=${answers.sanityProjectId}
SANITY_DATASET=${answers.sanityDataset}
SANITY_API_TOKEN=${answers.sanityApiToken}

# Email Configuration
SMTP_HOST=${smtpConfig.host}
SMTP_PORT=${smtpConfig.port}
SMTP_USER=${smtpConfig.user}
SMTP_PASS=${smtpConfig.pass}
EMAIL_FROM=${answers.emailFrom}

# Security Configuration
JWT_SECRET=${jwtSecret}
JWT_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=${answers.environment === 'production' ? 'https://vietbuildgroup.vn' : 'http://localhost:3000'}

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload Configuration
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document
BASE_URL=${answers.environment === 'production' ? 'https://api.vietbuildgroup.vn' : 'http://localhost:3001'}

# Logging Configuration
LOG_LEVEL=${answers.environment === 'production' ? 'WARN' : 'INFO'}
LOG_FILE=${answers.environment === 'production' ? './logs/app.log' : ''}
`;

    // Sanity Studio environment file
    const sanityEnv = `# Sanity Studio Configuration
SANITY_STUDIO_API_PROJECT_ID=${answers.sanityProjectId}
SANITY_STUDIO_API_DATASET=${answers.sanityDataset}
SANITY_STUDIO_API_VERSION=2024-01-01
`;

    // Write environment files
    fs.writeFileSync('frontend/.env.local', frontendEnv);
    fs.writeFileSync('backend/.env', backendEnv);
    fs.writeFileSync('sanity-studio/.env', sanityEnv);

    // Create necessary directories
    if (!fs.existsSync('backend/uploads')) {
      fs.mkdirSync('backend/uploads', { recursive: true });
    }
    if (!fs.existsSync('backend/logs')) {
      fs.mkdirSync('backend/logs', { recursive: true });
    }

    console.log(chalk.green.bold('\n✅ Environment setup complete!'));
    console.log(chalk.blue('\n📁 Created files:'));
    console.log(chalk.gray('  - frontend/.env.local'));
    console.log(chalk.gray('  - backend/.env'));
    console.log(chalk.gray('  - sanity-studio/.env'));
    console.log(chalk.gray('  - backend/uploads/'));
    console.log(chalk.gray('  - backend/logs/'));

    console.log(chalk.blue('\n🚀 Next steps:'));
    console.log(chalk.gray('  1. Run: npm run dev:all'));
    console.log(chalk.gray('  2. Open: http://localhost:3000'));
    console.log(chalk.gray('  3. Configure content in Sanity Studio: http://localhost:3333'));

    console.log(chalk.yellow('\n⚠️  Important:'));
    console.log(chalk.gray('  - Never commit .env files to version control'));
    console.log(chalk.gray('  - Keep your secrets and API keys secure'));
    console.log(chalk.gray('  - Test email sending before going to production'));

  } catch (error) {
    console.error(chalk.red('❌ Setup failed:'), error.message);
    process.exit(1);
  }
}

// Check if running directly
if (require.main === module) {
  setupEnvironment();
}

module.exports = setupEnvironment;