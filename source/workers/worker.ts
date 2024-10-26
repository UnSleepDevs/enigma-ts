import type GetArguments from "../utils/args";
import type { Config } from "../config/config";
import type { Logger } from "../utils/logger";

export default abstract class Worker {
  static Logger: Logger;
  static work(conf: Config, args: typeof GetArguments.values): Promise<void> | void {

  }
}
