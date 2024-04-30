import Vector from "../../classes/Vector";
import Cell from "../../objects/Cells/Cell";
import WorldObject, { WorldObjectUpdateParameters } from "../../objects/WorldObjects";
import IMovable from "./IMovable";



export default class MovableRandom implements IMovable {
    public target: Cell;

    public constructor(target: Cell) {
        this.target = target;
    }


    private lastProcessTime: number = 0;
    public Process(params: WorldObjectUpdateParameters): void {
        const currentTime = performance.now();
        if (currentTime - this.lastProcessTime >= 1000) {
            this.move();
            this.lastProcessTime = currentTime;
        }
    }
    public move() {
        let d = Math.rand(5, 10);
        this.target.inertia.add(new Vector(Math.rand(-d, d), Math.rand(-d, d)));
    }
}