import get_args from "../utils/args.ts"
import { Config } from "../config/config.ts";
import EncodeWorker from "./encode.ts";
import DecodeWorker from "./decode.ts";
import HelpWorker from "./help.ts";
export default class Process {
  args: typeof get_args.values;
  config?: Config;

  public async ReadConfig() {
    if (this.config) return this.config;
    this.config = await Config.Read(this.args.config_file);
    return this.config;
  }

  constructor() {
    this.args = get_args.values;
  }

  static GetInput(process: Process) {
    process.ReadConfig.bind(process)()
      .then(config => {
        const { encode, decode } = process.args;
        if (encode) {
          return EncodeWorker.work(config, process.args)
        }

        if (decode)
          return DecodeWorker.work(config, process.args);

        return HelpWorker.work(config, process.args);
      })
  }
};
