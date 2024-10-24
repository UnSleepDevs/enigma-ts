export class Logger {
  readonly class_name: string;
  func: string = "void";

  public constructor(class_name: string) {
    this.class_name = class_name;
  }

  public setFunc(func: string | Function): Logger {
    this.func = (func as Function).name ?? func;
    return this;
  }

  private static LogPattern(log_type: string, l?: Logger) {
    const log_tile = l ? `[${l.class_name}->${l.func}() | ${log_type} ]` : "[" + log_type + "]";
    return;
  }
  public static Log(message: any[], l?: Logger, return_str?: boolean) {
    const log = this.LogPattern("LOG", l) + message.join(" ");
    if (return_str)
      return log;
    console.log(return_str);
  };


  public static Warn(message: any[], l?: Logger, return_str?: boolean) {
    const log = this.LogPattern("WARN", l) + message.join(" ");
    if (return_str)
      return log;
    console.warn(return_str);
  }

  public static Error(message: any[], l?: Logger, return_str?: boolean) {
    const log = this.LogPattern("ERROR", l) + message.join(" ");
    if (return_str)
      return log;
    console.error(return_str);
  }
}
