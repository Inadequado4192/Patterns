class Originator {
    public state: string;

    constructor(state: string) {
        this.state = state;
    }

    public save(): Memento {
        return new ConcreteMemento(this.state);
    }

    public restore(memento: Memento): void {
        this.state = memento.data;
    }
}

interface Memento<D = any> {
    name: string;
    createAt: Date;
    data: D;
}

class ConcreteMemento implements Memento<string> {
    public get name(): string { return `${this.createAt} - ${this.data}` };
    public readonly data: string;
    public readonly createAt: Date;

    constructor(data: string) {
        this.data = data;
        this.createAt = new Date()
    }
}

const originator = new Originator("Txt 1");

console.log(originator.state);
const backup = originator.save();

originator.state = "Txt 2";
console.log(originator.state);


originator.restore(backup);
console.log(originator.state);