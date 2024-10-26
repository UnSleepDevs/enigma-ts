export default class HexTools {
  private static RandomCharacters = "?_/.-:,*+{}GHIJKLMNOPQRSTUVWXYZÑ¬|,<>+][?¿¡~·•Ł"

  private static RandomLetter() {
    const randomChar = Math.floor(Math.random() * (this.RandomCharacters.length - 1 - 0 + 1) + 0);
    return this.RandomCharacters[randomChar];
  }

  private static MagicRegexp = new RegExp(/[?_/.\-:,*+{}GHIJKLMNOPQRSTUVWXYZÑ¬|,<>+\]\[¿¡~·•Ł]/g);

  static BuildText(str: string[]): string {
    let returnable: string = "";
    for (let i = 0; i < str.length; i++) {
      // its already on Hex
      const letter = str[i];
      returnable += letter;
      returnable += this.RandomLetter();
    }

    return returnable;
  }

  // TODO:
  // [ ] Clean text whit "trash"
  static UnbuildText(str: string) {
    return str.split(this.MagicRegexp).slice(0, -1);
  }
}
