import World from "../Singleton/World";
import Vector from "../classes/Vector";
import Cell from "../objects/Cells/Cell";


export default class CellBuilder {
    public core: Cell;

    public constructor(core: Cell) {
        this.core = core;
    }

    public addCell(cell: Cell, relativePosition: Vector) {
        this.core.observerAttach(cell);
        (this.core.cellParts ?? (this.core.cellParts = []))
            .push({ cell, relativePosition });
        return this;
    }
    // public addToWorld() {
    //     World.objects.add(this.core);
    //     this.core.cellParts?.forEach(c => World.objects.add(c.cell));
    //     return this.core;
    // }
}