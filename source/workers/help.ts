import type { Config } from "../config/config";
import Worker from "./worker";
import Arguments from "../utils/args";
export default class HelpWorker extends Worker {
  static work(conf: Config, args: typeof Arguments.values): Promise<void> | void {
    console.log(
      Bun.color("#ff595e", "ansi"),
      "[Little Enigma]",
      Bun.color("#ffca3a", "ansi"),
      "\tUsage: little_enigma <options>",
      Bun.color("#8ac926", "ansi"),
      "\n* --decode | -d\t\tDecodes a message",
      "\n* --encode | -e\t\tEncodes a message",
      "\n========= Other Options =========",
      "\n* --config | -c\t\tUses a custom config file",
      "\n* --input  | -i\t\tGive a file for encript/decrypt",
      "\n* --output | -o\t\tGive a output file"
    );

    process.exit(1);
  };
}
