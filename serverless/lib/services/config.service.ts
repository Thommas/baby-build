/**
 * Path of child
 *
 * @author Thomas Bullier <thomasbullier@gmail.com>
 */

import * as Joi from 'joi';

declare var process: {
  env: EnvConfig
}

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    require('dotenv').config({
      path: __dirname + '/../../.env.' + process.env.NODE_ENV
    });
    this.envConfig = this.validateInput(process.env);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('dev', 'test')
        .default('dev'),
      AWS_REGION: Joi.string().default('eu-west-1'),
      ELASTIC_SEARCH_INDEX: Joi.string().default('app'),
      ELASTIC_SEARCH_HOST: Joi.string().default('http://localhost:9200'),
      LOCAL_DYNAMODB_HOST: Joi.string().default('localhost'),
      LOCAL_DYNAMODB_PORT: Joi.number().default(4567),
      LOCAL_DYNAMODB_TABLE: Joi.string().default('pathofchild-graphql-dev'),
      AUTH0_CLIENT_ID: Joi.optional(),
      AUTH0_JWKS_URI: Joi.optional(),
      AUTH0_JWKS_KID: Joi.optional(),
      USER_ID: Joi.optional(),
    }).unknown(true);

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get awsRegion(): string {
    return String(this.envConfig.AWS_REGION);
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

  get userId(): string {
    return String(this.envConfig.USER_ID);
  }
}

export const configService = new ConfigService();
