import Vector, { VectorParameters } from "../classes/Vector";
import IMovable from "../other/Movable/IMovable";
import WorldObject, { WorldObjectParameters, WorldObjectUpdateParameters } from "./WorldObjects";

export interface PhysicalObjectParameters extends WorldObjectParameters {
    inertia?: VectorParameters;
}

export type BoundingVolume = { radius: number }

export default abstract class PhysicalObject extends WorldObject {
    public inertia: Vector;
    public constructor(params?: PhysicalObjectParameters) {
        super(params);
        this.inertia = new Vector(params?.inertia);
    }

    public abstract readonly boundingVolume: BoundingVolume;

    public override UpdateFixed(params: WorldObjectUpdateParameters): void {
        const inertiaCoefficient = 0.9;
        this.position.x += this.inertia.x *= inertiaCoefficient;
        this.position.y += this.inertia.y *= inertiaCoefficient;
    }
}