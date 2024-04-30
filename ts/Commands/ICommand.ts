export default interface ICommand {
    name: string
    execute(...args: any): any;
}