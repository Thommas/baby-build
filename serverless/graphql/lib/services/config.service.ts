/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';

declare var process: {
  env: EnvConfig
}

export interface EnvConfig {
  [key: string]: string;
}

class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this.envConfig = this.validateInput(process.env);
    } else if (process.env.NODE_ENV) {
      const config = dotenv.parse(fs.readFileSync('.env.' + process.env.NODE_ENV));
      this.envConfig = this.validateInput(config);
    } else {
      const config = dotenv.parse(fs.readFileSync('.env'));
      this.envConfig = this.validateInput(config);
    }
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['local', 'production'])
        .default('local'),
      ELASTIC_SEARCH_INDEX: Joi.string().default('app'),
      ELASTIC_SEARCH_HOST: Joi.string().default('http://localhost:9200'),
      LOCAL_DYNAMODB_HOST: Joi.string().default('localhost'),
      LOCAL_DYNAMODB_PORT: Joi.number().default(4567),
      LOCAL_DYNAMODB_TABLE: Joi.string().default('pathofchild-graphql-dev'),
      AUTH0_CLIENT_ID: Joi.string(),
      AUTH0_JWKS_URI: Joi.string(),
      AUTH0_JWKS_KID: Joi.string(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get elasticSearchIndex(): string {
    return String(this.envConfig.ELASTIC_SEARCH_INDEX);
  }

  get elasticSearchHost(): string {
    return String(this.envConfig.ELASTIC_SEARCH_HOST);
  }

  get localDynamoDBHost(): string {
    return String(this.envConfig.LOCAL_DYNAMODB_HOST);
  }

  get localDynamoDBPort(): number {
    return Number(this.envConfig.LOCAL_DYNAMODB_PORT);
  }

  get localDynamoDBTable(): string {
    return String(this.envConfig.LOCAL_DYNAMODB_TABLE);
  }

  get auth0ClientId(): string {
    return String(this.envConfig.AUTH0_CLIENT_ID);
  }

  get auth0JwksUri(): string {
    return String(this.envConfig.AUTH0_JWKS_URI);
  }

  get auth0JwksKid(): string {
    return String(this.envConfig.AUTH0_JWKS_KID);
  }
}

export const configService = new ConfigService();
