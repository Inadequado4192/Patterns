class Facade {
    protected alertSubsystem: AlertSubsystem;

    protected notificationSubsystem: NotificationSubsystem;

    constructor(subsystem1?: AlertSubsystem, subsystem2?: NotificationSubsystem) {
        this.alertSubsystem = subsystem1 || new AlertSubsystem();
        this.notificationSubsystem = subsystem2 || new NotificationSubsystem();
    }

    public async sendMessage(msg: string): Promise<void> {
        console.log("Sending message...");
        await this.alertSubsystem.send(msg);
        await this.notificationSubsystem.send(msg);
    }
}

class AlertSubsystem {
    public async send(msg: string): Promise<string> {
        return msg; // To Windon
    }
}

class NotificationSubsystem {
    public async send(msg: string): Promise<string> {
        return msg; // To User
    }
}

(function clientCode() {
    const subsystem1 = new AlertSubsystem();
    const subsystem2 = new NotificationSubsystem();
    const facade = new Facade(subsystem1, subsystem2);

    console.log(facade.sendMessage("Test message"));
})();



export { }