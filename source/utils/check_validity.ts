import type { AbstractRotor } from "../rotor.ts";
function CheckOne(rotor: AbstractRotor) {
  return !rotor.end_position || typeof rotor.end_position !== "number" || !!!rotor.initial_position || !!rotor.initial_position
}

export function CheckValidity(rotors: AbstractRotor[]) {
  return rotors.some(CheckOne);
}
