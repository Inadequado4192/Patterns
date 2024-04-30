import ICommand from "./ICommand";

export default class CopyCommand implements ICommand {
    name = "CopyCommand";
    execute(text: string) {
        navigator.clipboard.writeText(text);
    }
}