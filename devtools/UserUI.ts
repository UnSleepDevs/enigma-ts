class Utils {
    static Goto(x: number, y: number) { return `\033[${y};${x}H`; }
    static ResetCursor() { return "\033[H"; }
    static ColorReset() { return "\033[39m"; }
    static GetSize(): [number, number] {
        return [
            process.stdout.rows,
            process.stdout.columns
        ]
    }
    static hasConsoleFirstClear: boolean = false;
    static FirstClear() {
        if (this.hasConsoleFirstClear) return;
        console.clear()
    }
}
class Box {
    textInside: string | string[];
    x: number = 0;
    y: number = 0;
    w: number = 0;
    h: number = 0;
    child?: Box;
    father?: Box;
    constructor(text: string | string[]) {
        this.textInside = text;
    }

    getBigger(): number {
        if (Array.isArray(this.textInside))
            return (this.textInside as string[]).map(i => i.length).sort((a, b) => b - a)[0]
        return this.textInside.length;
    }

    static setChild(main: Box, child: Box) {
        if (!main.child) {
            child.father = main;
            main.child = child;
            return;
        }

        Box.setChild(main.child, child);
    }
    draw(x: number, y: number) {
        Utils.FirstClear()
        const appName = " LittleEnigma ";
        const header = "=".repeat(Utils.GetSize()[1] / 2 - appName.length - 10) + appName + "=".repeat(Utils.GetSize()[1] / 2 - 14);
        console.log(Utils.Goto(10, 0) + header + " (x)");

        console.log()
    }
}


export default {
    Box,
    Utils
}