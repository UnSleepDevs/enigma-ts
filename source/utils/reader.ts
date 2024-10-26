import GetArgs from "./args";

export default class ConsoleReader {
  static get_input(args: typeof GetArgs.values): Promise<string> | string {
    if (!!args.input) {
      const f = Bun.file(args.input);
      return f.exists()
        .then(exists => {
          if (!exists)
            throw "Cannot found " + f.name;
          return f.text();
        })
    }

    let message = "";
    while (message === "") {
      message = prompt("Introduzca un mensaje", "")!;
    }

    return message;
  }
}
