import type { Config } from "../config/config";
import type { AbstractRotor } from "../rotor";
import Arguments from "../utils/args"
import Saver from "../utils/saver";
import Worker from "./worker";

export default class GenKeyWorker extends Worker {
  static saveMessage(args: typeof Arguments.values, key: string): Promise<void> | void {
    return Saver.SaveToDisk(args.genKey!, key);
  }
  static work(conf: Config, args: typeof Arguments.values): Promise<void> | void {
    let key = "";
    while (key === "") {
      key = prompt("Ingrese una llave para codificar sus mensajes", "")!;
    }

    const Rotors: AbstractRotor[] = [];
    for (let char of key) {
      const char_code = char.charCodeAt(0);
      const rotor = {
        initial_position: Number((char_code / 2).toPrecision(1)),
        end_position: char_code
      } satisfies AbstractRotor;
      Rotors.push(rotor);
    }
    const toSave = JSON.stringify({
      rotors: Rotors
    });
    return this.saveMessage(args, toSave);
  }
}
