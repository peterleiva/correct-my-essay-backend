/**
 * @file Describe a database config interface
 */

/**
 * Database configuration object model
 **/
interface DatabaseConfig {
  readonly database: string;
  readonly username?: string;
  readonly password?: string;
  readonly port: string;
  readonly host: string;
}

export default DatabaseConfig;
