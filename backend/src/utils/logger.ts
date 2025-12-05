import fs from 'fs';
import path from 'path';

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  data?: any;
  requestId?: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
}

class Logger {
  private logLevel: LogLevel;
  private logFile?: string;
  private requestId: string;

  constructor(logLevel: LogLevel = LogLevel.INFO, logFile?: string) {
    this.logLevel = logLevel;
    this.logFile = logFile;
    this.requestId = this.generateRequestId();
  }

  private generateRequestId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private formatLogEntry(entry: LogEntry): string {
    return JSON.stringify(entry);
  }

  private writeLog(entry: LogEntry): void {
    const formattedLog = this.formatLogEntry(entry);

    // Always log to console
    console.log(formattedLog);

    // Log to file if configured
    if (this.logFile) {
      try {
        const logDir = path.dirname(this.logFile);
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir, { recursive: true });
        }

        fs.appendFileSync(this.logFile, formattedLog + '\n');
      } catch (error) {
        console.error('Failed to write to log file:', error);
      }
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.logLevel;
  }

  public setRequestId(requestId: string): void {
    this.requestId = requestId;
  }

  public getRequestId(): string {
    return this.requestId;
  }

  public error(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.ERROR)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      message,
      data,
      requestId: this.requestId,
    };

    this.writeLog(entry);
  }

  public warn(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.WARN)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'WARN',
      message,
      data,
      requestId: this.requestId,
    };

    this.writeLog(entry);
  }

  public info(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.INFO)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message,
      data,
      requestId: this.requestId,
    };

    this.writeLog(entry);
  }

  public debug(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'DEBUG',
      message,
      data,
      requestId: this.requestId,
    };

    this.writeLog(entry);
  }

  // Request logging
  public logRequest(req: any, res: any, next?: any): void {
    const startTime = Date.now();

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message: `${req.method} ${req.url}`,
      requestId: this.requestId,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      data: {
        method: req.method,
        url: req.url,
        headers: req.headers,
        query: req.query,
        body: req.body,
      },
    };

    this.writeLog(entry);

    // Override res.end to log response
    const originalEnd = res.end;
    res.end = function(...args: any[]) {
      const duration = Date.now() - startTime;
      const responseEntry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: 'INFO',
        message: `${req.method} ${req.url} - ${res.statusCode}`,
        requestId: this.requestId,
        data: {
          statusCode: res.statusCode,
          duration: `${duration}ms`,
        },
      };

      logger.writeLog(responseEntry);
      originalEnd.apply(res, args);
    };

    if (next) next();
  }

  // Error logging with stack trace
  public logError(error: Error, req?: any): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      message: error.message,
      requestId: this.requestId,
      ip: req?.ip,
      userAgent: req?.get('User-Agent'),
      data: {
        stack: error.stack,
        url: req?.url,
        method: req?.method,
        headers: req?.headers,
        query: req?.query,
        body: req?.body,
      },
    };

    this.writeLog(entry);
  }

  // Business event logging
  public logEvent(event: string, data?: any): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message: `EVENT: ${event}`,
      requestId: this.requestId,
      data,
    };

    this.writeLog(entry);
  }

  // Security event logging
  public logSecurity(event: string, req: any, data?: any): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'WARN',
      message: `SECURITY: ${event}`,
      requestId: this.requestId,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      data: {
        url: req.url,
        method: req.method,
        ...data,
      },
    };

    this.writeLog(entry);
  }

  // Performance logging
  public logPerformance(operation: string, duration: number, data?: any): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message: `PERFORMANCE: ${operation} - ${duration}ms`,
      requestId: this.requestId,
      data: {
        operation,
        duration,
        ...data,
      },
    };

    this.writeLog(entry);
  }
}

// Create default logger instance
const logLevel = process.env.LOG_LEVEL ? LogLevel[process.env.LOG_LEVEL.toUpperCase() as keyof typeof LogLevel] : LogLevel.INFO;
const logFile = process.env.LOG_FILE;

export const logger = new Logger(logLevel, logFile);

// Express middleware for request logging
export const requestLogger = (req: any, res: any, next: any) => {
  const requestLogger = new Logger(logLevel, logFile);
  requestLogger.setRequestId(req.headers['x-request-id'] as string || requestLogger.getRequestId());
  requestLogger.logRequest(req, res);
  next();
};

// Error logging middleware
export const errorLogger = (error: Error, req: any, res: any, next: any) => {
  logger.logError(error, req);
  next(error);
};

export default Logger;