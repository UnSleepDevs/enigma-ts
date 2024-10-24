import { parseArgs } from "util";
export default parseArgs({
  options: {
    encode: {
      type: "boolean"
    },
    config_file: {
      type: "string",
      default: "config.json"
    },
    output: {
      type: "string",
      short: "o"
    },
    decode: {
      type: "boolean"
    }
  }
})
