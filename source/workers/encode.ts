import Worker from "./worker";
import GetArgs from "../utils/args";
import HexTools from "../utils/hex_utils";
import Rotor from "../rotor";
import ConsoleReader from "../utils/reader";
import Saver from "../utils/saver";

import { Logger } from "../utils/logger";
import type { Config } from "../config/config";

export default class EncodeWorker extends Worker {
  static Logger: Logger = new Logger("EncodeWorker");

  static saveMessage(args: typeof GetArgs.values, encoded: string[]): Promise<void> | void {
    const trashedMessage = HexTools.BuildText(encoded);
    if (!!args.output) return Saver.SaveToDisk(args.output, trashedMessage);
    console.log(trashedMessage);
    return;
  }

  static work(conf: Config, args: typeof GetArgs.values) {
    const MainRotor = conf.toRealRotor();
    let message = ConsoleReader.get_input(args);
    if (message instanceof Promise) {
      return message.then(msg => {
        const encoded = Rotor.Encode(MainRotor, msg);
        return this.saveMessage(args, encoded);
      })
    }

    const encoded = Rotor.Encode(MainRotor, message)
    return this.saveMessage(args, encoded)
  }
}
