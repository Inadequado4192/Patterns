import ICommand from "./ICommand";

export default class PrintCommand implements ICommand {
    public name: string = "Print"
    public constructor(public customName: string) { }
    public execute(...args: any) {
        console.log(this.customName, args);
    }
}