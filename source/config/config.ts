import { resolve } from "node:path";
import { type AbstractRotor, Rotor } from "../rotor";
import { Logger } from "../utils/logger";
import { CheckValidity } from "../utils/check_validity";


const defaultPath = resolve("./config.json");

const defaultConfig: AbstractRotor = {
  initial_position: 1,
  end_position: 10
};

interface AbstractConfig {
  rotors: AbstractRotor[];
  useDateRotor?: boolean;
};

export class Config {
  readonly Rotors: AbstractRotor[] = [];
  readonly Logger: Logger = new Logger("Config");
  static readonly StaticLogger: Logger = new Logger("Static Config");


  private constructor(Rotors: AbstractRotor[] | AbstractRotor) {
    this.Rotors = Array.isArray(Rotors) ? Rotors : [Rotors];
  }


  public toRealRotor(): Rotor {
    const MainRotor = new Rotor(this.Rotors[0]);
    for (let i = 1; i < this.Rotors.length; i++) {
      const new_rotor = new Rotor(this.Rotors[i]);
      MainRotor.attachRotor(new_rotor, "next");
    }
    return MainRotor;
  };


  private static generate_date_rotor(): AbstractRotor {
    const clear_unix_date = Date.now() % 100000;
    const start_at = Number((clear_unix_date / 1.5).toFixed(0));

    return {
      initial_position: start_at,
      end_position: clear_unix_date
    } satisfies AbstractRotor;
  };


  private static checkSettings(settings: Partial<AbstractConfig>): void {
    if (!settings.rotors) {
      Logger.Warn(["You should have rotors in your config file"], this.StaticLogger);
    }

    if (!Array.isArray(settings.rotors)) {
      Logger.Error(["You shhould give a rotor array or an object of an Abstract Rotor"]);
    }

    if (!CheckValidity(settings.rotors!)) {
      const useDefault = prompt("Do you want to use default rotors?", "y")?.toLocaleLowerCase() === "y" ? "y" : "n";
      if (useDefault) {
        Logger.Log(["[Using basic configuration]"], this.StaticLogger);
      }
      throw Logger.Error(["You should have an array of Rotors of just one rotor!"], this.StaticLogger.setFunc(this.checkSettings), true);
    }

    if (settings.useDateRotor === undefined && typeof settings.useDateRotor !== "boolean") {
      throw Logger.Error(["useDateRotor is boolean property!"], this.StaticLogger.setFunc(this.checkSettings), true)
    }
  }
  static async Read(path: string = defaultPath) {

    const real_path = resolve(path);
    const file = Bun.file(real_path)
    if (!file.exists()) {
      return new Config({ initial_position: 1, end_position: 10 });
    }

    const json = await file.json() satisfies AbstractConfig;
    this.checkSettings(json);
  }
}
