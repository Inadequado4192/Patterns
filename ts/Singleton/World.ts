import Cell from "../objects/Cells/Cell";
import WorldObject from "../objects/WorldObjects";

// Singleton
class SingletonWorld {
    public objects = new Set<WorldObject>();
}




type World = SingletonWorld;
const World = new SingletonWorld();

(window as any).World = World;

export default World;