export class HexToText {
  private static RandomCharacters = "?_/.-:,*+{}GHIJKLMNOPQRSTUVWXYZÑ¬|,<>+][?¿¡~·•Ł"

  private static RandomLetter() {
    const randomChar = Math.floor(Math.random() * (this.RandomCharacters.length - 1 - 0 + 1) + 0);
    return this.RandomCharacters[randomChar];
  }
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
}
