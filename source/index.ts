import { Rotor, type AbstractRotor } from "./rotor.ts";
import { HexToText } from "./parser.ts";
import Arguments from "./args.ts";


const MainEngine = new Rotor({
  initial_position: 1,
  end_position: 10
} satisfies AbstractRotor);

const NextEngine = new Rotor({
  initial_position: 1,
  end_position: 20
});


MainEngine.attachRotor.bind(MainEngine)(NextEngine, "next");

const user_input = prompt("Escriba un mensaje: ") ?? "Hola mundo";
const encoded = Rotor.Encode(MainEngine, user_input);

console.log(HexToText.BuildText(encoded));


