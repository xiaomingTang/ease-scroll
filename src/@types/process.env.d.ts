declare namespace NodeJS {
  /**
   * 这儿, 我根据 /config/.env.ts 中提供的环境变量添加了类型描述
   * 
   * 如果不想一个个添加类型, 也可以设置为
   * 
   * ```
   * export interface ProcessEnv {
   *   [key: string]: string;
   * }
   * ```
   */
  export interface ProcessEnv {
    NODE_ENV: "development" | "production";
    SCAFFOLD_CONFIG_APP_NAME: string;
    [key: string]: string;
  }
}
