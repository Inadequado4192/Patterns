interface Subject {
    sendRequest(): Promise<void>;
}


class Sender implements Subject {
    public async sendRequest(): Promise<void> {
        console.log("Send from Sender...");
    }
}

class NewProxy<S extends Subject> implements Subject {
    protected _target: S;
    public constructor(target: S) {
        this._target = target;
    }

    public async sendRequest(): Promise<void> {
        if (this.isReady()) {
            console.log("Send from Proxy...");
            return this._target.sendRequest();
        } else throw Error("Subject is not ready");
    }

    private isReady() {
        // Check...
        return true;
    }
}


let target = new Sender();
target.sendRequest();

let proxy = new NewProxy(target);
proxy.sendRequest();

/* Result:
Send from Sender...
Send from Proxy...
Send from Sender...
*/