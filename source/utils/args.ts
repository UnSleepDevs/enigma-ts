import { parseArgs } from "util";
const args = parseArgs({
  options: {
    encode: {
      type: "boolean",
      short: "e"
    },
    config_file: {
      type: "string",
      short: "c",
      default: "config.json"
    },
    output: {
      type: "string",
      short: "o"
    },
    input: {
      type: "string",
      short: "i"
    },
    decode: {
      type: "boolean",
      short: "d"
    }
  }
})

export default args;
