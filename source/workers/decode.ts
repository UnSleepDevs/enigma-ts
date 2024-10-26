import type { Config } from "../config/config";
import Worker from "./worker";
import Arguments from "../utils/args";
import ConsoleReader from "../utils/reader";
import Rotor from "../rotor";
import Saver from "../utils/saver";

export default class DecodeWorker extends Worker {

  static saveMessage(args: typeof Arguments.values, decoded: string): Promise<void> | void {
    if (!!args.output) return Saver.SaveToDisk(args.output, decoded);
    console.log(decoded);
    return;
  }

  static work(conf: Config, args: typeof Arguments.values): Promise<void> | void {
    const MainRotor = conf.toRealRotor();
    const message = ConsoleReader.get_input(args);

    if (message instanceof Promise) {
      return message.then(msg => {
        const Decoded = Rotor.Decode(MainRotor, msg);
        return this.saveMessage(args, Decoded);
      })
    }

    const Decoded = Rotor.Decode(MainRotor, message);
    return this.saveMessage(args, Decoded);
  }
}
