import Vector from "../classes/Vector";
import IFactory from "../Factorys/IFactory";
import World from "../Singleton/World";
import IHelper from "../other/IHelper";
import WorldObject, { WorldObjectParameters } from "./WorldObjects";

export interface SpawnerParameters extends WorldObjectParameters {
    factory: IFactory
    spawnRadius?: number
}

export default class Spawner extends WorldObject implements IHelper {
    public factory: IFactory;
    public spawnRadius: number;
    public constructor(params: SpawnerParameters) {
        super({ position: params.position });

        this.spawnRadius = params.spawnRadius ?? 0;
        this.factory = params.factory;

        World.objects.add(this);
    }

    get _h_arc_radius() { return this.spawnRadius; }
    _h_arc_color = "red";
    _h_arc_lineWidth = 1;

    public Spawn() {
        const obj = this.factory.create();
        let a = this.spawnRadius;
        obj.position = new Vector(this.position.x + Math.rand(-a, a), this.position.y + Math.rand(-a, a));
    }
}