import { parseArgs } from "util"
export default function Args() {
    return parseArgs({
        options: {
            config: {
                type: "string",
                default: "config.json",
                short: "c"
            }
        }
    })
}

export type Arguments = ReturnType<typeof Args>;