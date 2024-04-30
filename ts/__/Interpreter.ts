class Context {
    private variables: Map<string, number>;
    public constructor() {
        this.variables = new Map();
    }
    public GetVariable(name: string) {
        return this.variables.get(name) ?? (() => { throw Error(`Variable "${name}" is undefined`) })();
    }
    public SetVariable(name: string, value: number): void {
        this.variables.set(name, value);
    }
}

interface IExpression {
    Interpret(context: Context): number;
}
abstract class AbstractExpression {
    public abstract Interpret(context: Context): void;
}

class NumberExpression implements IExpression {
    private name: string; // ім'я змінної
    public constructor(variableName: string) {
        this.name = variableName;
    }
    public Interpret(context: Context): number {
        return context.GetVariable(this.name);
    }
}
class AddExpression implements IExpression {
    private leftExpression: IExpression;
    private rightExpression: IExpression;
    public constructor(left: IExpression, right: IExpression) {
        this.leftExpression = left;
        this.rightExpression = right;
    }
    public Interpret(context: Context): number {
        return this.leftExpression.Interpret(context) +
            this.rightExpression.Interpret(context);
    }
}
class SubtractExpression implements IExpression {
    private leftExpression: IExpression;
    private rightExpression: IExpression;
    public constructor(left: IExpression, right: IExpression) {
        this.leftExpression = left;
        this.rightExpression = right;
    }
    public Interpret(context: Context): number {
        return this.leftExpression.Interpret(context) -
            this.rightExpression.Interpret(context);
    }
}




(() => {
    const context = new Context();
    context.SetVariable("x", 5);
    context.SetVariable("y", 8);
    context.SetVariable("z", 2);
    let expression: IExpression = new SubtractExpression(
        new AddExpression(
            new NumberExpression("x"), new NumberExpression("y")
        ),
        new NumberExpression("z")
    );
    let result: number = expression.Interpret(context);
    console.log("Result", result);
})();