#!/usr/bin/env node

const http = require('http');
const https = require('https');
const chalk = require('chalk');

class HealthChecker {
  constructor() {
    this.services = [
      {
        name: 'Frontend',
        url: 'http://localhost:3000',
        expectedStatus: 200,
        timeout: 5000
      },
      {
        name: 'Backend API',
        url: 'http://localhost:3001/health',
        expectedStatus: 200,
        timeout: 5000
      },
      {
        name: 'Sanity Studio',
        url: 'http://localhost:3333',
        expectedStatus: 200,
        timeout: 5000
      }
    ];
  }

  async checkService(service) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const url = new URL(service.url);
      const client = url.protocol === 'https:' ? https : http;

      const req = client.request(service.url, { timeout: service.timeout }, (res) => {
        const responseTime = Date.now() - startTime;

        resolve({
          name: service.name,
          status: res.statusCode === service.expectedStatus ? 'healthy' : 'unhealthy',
          statusCode: res.statusCode,
          responseTime,
          message: res.statusCode === service.expectedStatus ? 'OK' : `Expected ${service.expectedStatus}, got ${res.statusCode}`
        });
      });

      req.on('error', (err) => {
        resolve({
          name: service.name,
          status: 'error',
          statusCode: null,
          responseTime: Date.now() - startTime,
          message: err.message
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          name: service.name,
          status: 'timeout',
          statusCode: null,
          responseTime: service.timeout,
          message: `Request timeout after ${service.timeout}ms`
        });
      });

      req.end();
    });
  }

  async checkEnvironmentVariables() {
    const requiredFiles = [
      'frontend/.env.local',
      'backend/.env',
      'sanity-studio/.env'
    ];

    const fs = require('fs');
    const results = [];

    for (const file of requiredFiles) {
      const exists = fs.existsSync(file);
      results.push({
        name: file,
        status: exists ? 'exists' : 'missing',
        message: exists ? 'Environment file exists' : 'Environment file is missing'
      });
    }

    return results;
  }

  async checkDependencies() {
    const fs = require('fs');
    const results = [];

    const directories = [
      'frontend/node_modules',
      'backend/node_modules',
      'sanity-studio/node_modules'
    ];

    for (const dir of directories) {
      const exists = fs.existsSync(dir);
      results.push({
        name: dir.replace('/node_modules', ' Dependencies'),
        status: exists ? 'installed' : 'missing',
        message: exists ? 'Dependencies installed' : 'Run npm run setup:deps'
      });
    }

    return results;
  }

  async run() {
    console.log(chalk.blue.bold('🏥 VIETBUILD GROUP - Health Check'));
    console.log(chalk.gray('Checking all services and dependencies...\n'));

    // Check service health
    console.log(chalk.blue('📡 Service Health:'));
    const serviceResults = await Promise.all(
      this.services.map(service => this.checkService(service))
    );

    serviceResults.forEach(result => {
      const icon = result.status === 'healthy' ? '✅' :
                  result.status === 'error' ? '❌' : '⏰';
      const color = result.status === 'healthy' ? chalk.green :
                   result.status === 'error' ? chalk.red : chalk.yellow;

      console.log(`  ${icon} ${result.name}: ${color(result.status)} (${result.responseTime}ms)`);
      if (result.status !== 'healthy') {
        console.log(chalk.gray(`     → ${result.message}`));
      }
    });

    // Check environment variables
    console.log(chalk.blue('\n⚙️  Environment Configuration:'));
    const envResults = await this.checkEnvironmentVariables();
    envResults.forEach(result => {
      const icon = result.status === 'exists' ? '✅' : '❌';
      const color = result.status === 'exists' ? chalk.green : chalk.red;
      console.log(`  ${icon} ${result.name}: ${color(result.status)}`);
      if (result.status !== 'exists') {
        console.log(chalk.gray(`     → ${result.message}`));
      }
    });

    // Check dependencies
    console.log(chalk.blue('\n📦 Dependencies:'));
    const depResults = await this.checkDependencies();
    depResults.forEach(result => {
      const icon = result.status === 'installed' ? '✅' : '❌';
      const color = result.status === 'installed' ? chalk.green : chalk.red;
      console.log(`  ${icon} ${result.name}: ${color(result.status)}`);
      if (result.status !== 'installed') {
        console.log(chalk.gray(`     → ${result.message}`));
      }
    });

    // Summary
    const allHealthy = serviceResults.every(r => r.status === 'healthy');
    const allEnvExists = envResults.every(r => r.status === 'exists');
    const allDepsInstalled = depResults.every(r => r.status === 'installed');

    console.log(chalk.blue('\n📊 Summary:'));

    if (allHealthy && allEnvExists && allDepsInstalled) {
      console.log(chalk.green.bold('  🎉 All systems operational!'));
      console.log(chalk.gray('\n🚀 Your VIETBUILD GROUP system is ready to use:'));
      console.log(chalk.gray('  • Frontend: http://localhost:3000'));
      console.log(chalk.gray('  • Backend API: http://localhost:3001'));
      console.log(chalk.gray('  • Sanity Studio: http://localhost:3333'));
    } else {
      console.log(chalk.yellow.bold('  ⚠️  Some issues detected'));

      if (!allDepsInstalled) {
        console.log(chalk.yellow('\n📦 To fix dependencies:'));
        console.log(chalk.gray('  npm run setup:deps'));
      }

      if (!allEnvExists) {
        console.log(chalk.yellow('\n⚙️  To configure environment:'));
        console.log(chalk.gray('  npm run setup:env'));
      }

      if (!allHealthy) {
        console.log(chalk.yellow('\n🔄 To start services:'));
        console.log(chalk.gray('  npm run dev:all'));
      }
    }

    process.exit(allHealthy && allEnvExists && allDepsInstalled ? 0 : 1);
  }
}

// Check if running directly
if (require.main === module) {
  const healthChecker = new HealthChecker();
  healthChecker.run().catch(console.error);
}

module.exports = HealthChecker;