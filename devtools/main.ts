import { Config } from "../source/config/config";
import type { AbstractRotor } from "../source/rotor";
import Args from "./args";
import UserUI from "./UserUI";
const textFromRotor = (rotor: AbstractRotor) => [`Init: ${rotor.initial_position}`, `End: ${rotor.end_position}`];
const readed_args = Args().values;
const appSize = UserUI.Utils.GetSize();

const config = await Config.Read(readed_args.config)

const Mainbox = new UserUI.Box(textFromRotor(config.Rotors[0]));

for (let i = 1; i < config.Rotors.length; i++) {
    const rotor = config.Rotors[i];
    UserUI.Box.setChild(Mainbox, new UserUI.Box(textFromRotor(rotor)));
}


Mainbox.draw(0, 0)