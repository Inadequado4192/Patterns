import World from "../../Singleton/World";
import Cell, { CellParameters, CellParametersBase } from "./Cell";
import WorldObject from "../WorldObjects";

export type FoodParameters = CellParameters & {

}

export default class Food extends Cell {
    public constructor(params: FoodParameters) {
        super(Object.assign(params, {
            color: "#" + Math.rand(0, 16777215).toString(16)
        }));
    }
}