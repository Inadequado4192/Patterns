interface Middleware {
    setNext(handler: Middleware): Middleware;

    handle(...args: any[]): any;
}

abstract class AbstractMiddleware implements Middleware {
    protected nextHandler?: Middleware;

    public setNext(handler: Middleware): Middleware {
        this.nextHandler = handler;
        return handler;
    }

    public abstract handle(...args: any[]): any;
}

abstract class AbstractServerMiddleware extends AbstractMiddleware {
    protected declare nextHandler?: AbstractServerMiddleware;
    public abstract override handle(req: Request, res: Response): void;
}


class HomeMiddleware extends AbstractServerMiddleware {
    public override handle(req: Request, res: Response): void {
        console.log("Render Homa Page");
    }
}
class AdminMiddleware extends AbstractServerMiddleware {
    public override handle(req: Request, res: Response): void {
        console.log("Render Admin Page");
    }
}

function isAdmin(req: Request) { return !!Math.floor(Math.random() * 2); }

class IsAdminMiddleware extends AbstractServerMiddleware {
    public override handle(req: Request, res: Response): void {
        if (isAdmin(req)) this.nextHandler?.handle(req, res);
        else { console.log("Render Error Page"); }
    }
}


class MiddlewareProcessing<M extends typeof AbstractMiddleware> {
    private list: InstanceType<M>[] = [];
    public execute(...args: Parameters<InstanceType<M>["handle"]>) {
        this.list[0]?.handle(...args);
    }
    public add(...ms: [InstanceType<M>, ...InstanceType<M>[]]) {
        let prev = this.list[this.list.length - 1] || ms[0];
        ms.forEach(m => prev !== m && prev.setNext(m));
        this.list.push(...ms);
    }
}


const HomePage = new MiddlewareProcessing<typeof AbstractServerMiddleware>();
HomePage.add(new HomeMiddleware());


const AdminPage = new MiddlewareProcessing<typeof AbstractServerMiddleware>();
AdminPage.add(new IsAdminMiddleware(), new AdminMiddleware());



([HomePage, AdminPage]).forEach(mp => mp.execute(
    new Request("https://github.com/mdn/content/issues/12959"),
    new Response(),
));