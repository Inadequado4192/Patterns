import Vector, { VectorParameters } from "../classes/Vector";
import { ClonableObject } from "../interfaces";
import Renderer from "../Singleton/Renderer";
import World from "../Singleton/World";


export type WorldObjectParameters = {
    position?: VectorParameters
}
export interface WorldObjectUpdateParameters {
    renderIndex: number
    deltaTime: DOMHighResTimeStamp
}

export default abstract class WorldObject {
    public position: Vector;


    public constructor(params?: WorldObject);
    public constructor(params?: WorldObjectParameters);
    public constructor(params?: WorldObject | WorldObjectParameters) {
        if (params instanceof WorldObject) {
            this.position = params.position;
        } else {            
            this.position = new Vector(params?.position);
        }
    }

    public Update?(params: WorldObjectUpdateParameters): void
    public UpdateFixed?(params: WorldObjectUpdateParameters): void

    public Render(renderer: Renderer) {

    }
}