import Cell, { CellParameters } from "./Cell";

export type FrogParameters = CellParameters & {

}

export default class Frog extends Cell {
    public constructor(params: FrogParameters) {
        super(Object.assign(params, {
            color: "#99C68E"
        }));
    }
}