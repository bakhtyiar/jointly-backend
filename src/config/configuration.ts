export interface IConfig {
  DB_URI: string;
  PORT: number;
  JWT_KEY: string;
  JWT_EXPIRES_IN: string;
  IS_PUBLIC_KEY: string;
}

const config: IConfig = {
  DB_URI: process.env.DB_URI,
  PORT: parseInt(process.env.PORT, 10),
  JWT_KEY: process.env.JWT_KEY,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  IS_PUBLIC_KEY: process.env.IS_PUBLIC_KEY,
};

export const configKeys = new Proxy(config, {
  get: function (target, prop) {
    return prop;
  },
});

export default () => config;
