import ICommand from "./ICommand";

export default class MacroCommand implements ICommand {
    name: string = "MacroCommand";
    commands: Set<ICommand>;
    constructor(commands?: Iterable<ICommand>) {
        this.commands = new Set(commands);
    }
    execute(...args: any) {
        this.commands.forEach(c => c.execute(...args));
    }
}