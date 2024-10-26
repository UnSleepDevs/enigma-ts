import { Logger } from "./logger";

export default class Saver {
  static Logger: Logger = new Logger("Saver");
  static SaveToDisk(fileName: string, content: string) {
    return Bun.write(fileName,
      new TextEncoder().
        encode(content)
    ).then(() => {
      Logger.Log(
        ["Saved encoded messsage to a file!"],
        this.Logger.setFunc(this.SaveToDisk)
      )
    });
  }
}
