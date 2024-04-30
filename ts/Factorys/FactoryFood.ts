import World from "../Singleton/World";
import Food from "../objects/Cells/Food";
import WorldObject from "../objects/WorldObjects";
import IFactory from "./IFactory";

export default class FactoryFood implements IFactory<Food> {
    public callback?: () => Food;
    public constructor(callback?: () => Food) {
        this.callback = callback;
    }
    public create(): Food {
        const food = this.callback?.() ?? new Food({});
        World.objects.add(food);
        return food;
    }
}