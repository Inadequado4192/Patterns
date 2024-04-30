import CellBuilder from "./Builders/CellBuilder";
import Vector from "./classes/Vector";
import IFactory from "./Factorys/IFactory";
import FactoryFood from "./Factorys/FactoryFood";
import Cell from "./objects/Cells/Cell";
import Food from "./objects/Cells/Food";
import MovableRandom from "./other/Movable/MovableRandom";
import Spawner from "./objects/Spawner";
import initOverrides from "./overrides";
import Processing from "./Singleton/Processing";
import Renderer from "./Singleton/Renderer";
import World from "./Singleton/World";
import Frog from "./objects/Cells/Frog";
import PrintCommand from "./Commands/PrintCommand";
import MacroCommand from "./Commands/MacroCommand";
import CopyCommand from "./Commands/CopyCommand";



addEventListener("load", () => {
    initOverrides();

    Renderer.startLoop();
    Processing.startProcessing();


    const spawner = new Spawner({
        position: { x: 200, y: 200 },
        factory: new FactoryFood(() => {
            let cell: Cell = new CellBuilder(new Frog({ radius: Math.rand(40, 100), }))
                .addCell(new Cell({ radius: 10, color: "blue" }), new Vector(-20, -20))
                .addCell(new Cell({ radius: 10, color: "blue" }), new Vector(20, -20))
                .addCell(new Cell({ radius: 10, color: "blue" }), new Vector(20, 20))
                .addCell(new Cell({ radius: 10, color: "blue" }), new Vector(-20, 20))
                .core;
            cell.movable = new MovableRandom(cell);
            return cell;
        }),
        spawnRadius: 100
    });

    spawner.Spawn();

    let PrintC = new PrintCommand("Base_Print");
    addEventListener("mousedown", e => {
        e.preventDefault();
        switch (e.button) {
            case 0:
                PrintC.execute("Spawn Object");
                spawner.Spawn();
                break;
            case 1:
                new MacroCommand([
                    new PrintCommand("Copied"),
                    new CopyCommand()
                ]).execute(`Random - ${Math.random()}`);
                break;
            case 2:
                PrintC.execute("Text1", "Text2");
                break;
        }
    })
})

// let _ = (a: Food) => (World.objects.add(a), console.log(a.radius));

// _(new Food({ position: [0, 50], radius: 100 }))
// setTimeout(() => {
//     _(new Food({ position: [250, 200], radius: 100 }))
// }, 1000);
