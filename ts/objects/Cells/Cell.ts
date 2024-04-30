import Vector from "../../classes/Vector";
import { ClonableObject, Observer, ObserverSubject } from "../../interfaces";
import Renderer from "../../Singleton/Renderer";
import World from "../../Singleton/World";
import IMovable from "../../other/Movable/IMovable";
import PhysicalObject, { BoundingVolume, PhysicalObjectParameters } from "../PhysicalObject";
import WorldObject, { WorldObjectUpdateParameters } from "../WorldObjects";


export interface CellParametersBase extends PhysicalObjectParameters {
    color?: string
    movable?: IMovable
    cellParts?: { relativePosition: Vector, cell: Cell }[]
}
export interface CellParametersV1 extends CellParametersBase {
    radius: number
}
export interface CellParametersV2 extends CellParametersBase {
    area: number
}
export type CellParameters = (CellParametersV1 | CellParametersV2) | CellParametersBase;

export default class Cell extends PhysicalObject implements ClonableObject<Cell>, ObserverSubject, CellObserver {
    public color: string;
    public area: number;
    public get radius() { return Math.sqrt(this.area / Math.PI); }

    public movable?: IMovable;

    public cellParts: CellParameters["cellParts"];



    public override get boundingVolume(): BoundingVolume {
        return { radius: this.radius }
    }


    public constructor(params: Cell)
    public constructor(params: CellParameters)
    public constructor(params: Cell | CellParameters) {
        super(params);
        if (params instanceof Cell) {
            this.area = params.area;
            this.color = params.color;
            this.movable = params.movable;
            this.cellParts = params.cellParts;
        } else {
            if ("radius" in params) {
                this.area = Math.PI * params.radius ** 2;
            } else if ("area" in params) {
                this.area = params.area;
            } else {
                this.area = 50;
            }

            this.color = params.color ?? "transparent";
            this.movable = params.movable;
            this.cellParts = params.cellParts;
        }
    }


    public override UpdateFixed(params: WorldObjectUpdateParameters): void {
        super.UpdateFixed?.(params);
        this.movable?.Process(params);

    }

    public override Render(renderer: Renderer) {
        function drawCell(cell: Cell) {
            renderer.drawContext(ctx => {
                ctx.fillStyle = cell.color;
                ctx.translate(cell.position.x, cell.position.y);
                ctx.arc(0, 0, cell.radius, 0, Math.PI * 2);
                ctx.translate(-cell.position.x, -cell.position.y);
                ctx.fill();
            });
            // renderer.drawContext(ctx => {
            //     for (const { cell: pcell, relativePosition } of cell.cellParts ?? []) {
            //         ctx.translate(relativePosition.x, relativePosition.y);
            //         drawCell(pcell);
            //         ctx.translate(-relativePosition.x, -relativePosition.y);
            //     }
            // });
        }
        drawCell(this);
    }

    public clone(): Cell {
        return new Cell(this);
    }



    public observers = new Set<CellObserver>();
    public observerAttach(observer: CellObserver): void {
        this.observers.add(observer);
    }
    public observerDetach(observer: CellObserver): void {
        this.observers.delete(observer);
    }
    public observerNotify(): void {
        this.observers.forEach(o => o.observerUpdate(this, "A"))
    }
    public observerUpdate(subject: ObserverSubject, state: "A" | "B"): void {
        // Do someting...
    }
}

export interface CellObserver extends Observer {
    observerUpdate(subject: ObserverSubject, state: "A" | "B"): void;
}