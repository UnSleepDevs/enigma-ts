import { Logger } from "./utils/logger";

export interface AbstractRotor {
  initial_position: number;
  end_position: number;
};

type SignalType = "reset" | "next";

type AttachRotorType = "next" | "back";

export class Rotor {
  protected NextRotor: Rotor | undefined;
  protected BackRotor: Rotor | undefined;
  protected Current: number;
  protected RotorConfig: AbstractRotor;
  protected Logger: Logger = new Logger("Rotor");
  constructor(config: AbstractRotor) {
    this.RotorConfig = config;
    this.Current = config.initial_position;
  }

  attachRotor(rotor: Rotor, position: AttachRotorType = "next") {
    if (position === "next") {
      if (!this.NextRotor) {
        this.NextRotor = rotor;
        rotor.attachRotor.bind(rotor)(this, "back");
        return;
      }

      this.NextRotor.attachRotor(rotor, "next");
      return;
    }


    if (position === "back") {
      this.BackRotor = rotor;
    }
  }

  public static Encode(rotor: Rotor, str: string) {
    const ReturningArray: string[] = [];
    for (let i = 0; i < str.length; i++) {
      let char_code = str[i].codePointAt(0)!;
      char_code += rotor.Current;
      ReturningArray[i] = char_code.toString(16);
      rotor.send_signal.bind(rotor)("next");
    }
    return ReturningArray;
  }

  send_signal(signal_type: SignalType, i: number = 1) {

    if (signal_type === "reset") {
      if (!this.BackRotor) return;
      this.Current = this.RotorConfig.initial_position;
      this.send_signal.bind(this.BackRotor)(signal_type);
      return;
    }

    if (signal_type === "next") {
      // this will increase the counter, and then if the counter is larger than the config
      // it ill send a signal to the next rotor just in case of exists

      // but if its the last rotor it will reset all rotors to its first state
      this.Current += i;
      if (this.Current >= this.RotorConfig.end_position) {
        if (!this.NextRotor) {
          // it will reset the counter if back rotor does not exists,
          // but if exists it also will reset it :D
          this.send_signal.bind(this)("reset");
          return;
        };
        this.send_signal.bind(this.NextRotor)("next")
        return;
      }
      return;
    }



    throw Logger.Log(["Invalid SignalType"], this.Logger.setFunc(this.send_signal), true);
  }
};
