// Singleton

import IHelper from "../other/IHelper";
import IMovable from "../other/Movable/IMovable";
import PhysicalObject, { BoundingVolume } from "../objects/PhysicalObject";
import WorldObject, { WorldObjectUpdateParameters } from "../objects/WorldObjects";
import Renderer from "./Renderer";
import World from "./World";


class SingletonProcessing {
    private loop: number = -1;

    public startProcessing(options?: {}) {
        if (this.loop >= 0) return;
        const fixedUpdateInterval = 1000 / 50;

        let lastUpdateTime = performance.now();
        (function loopFunction(this: SingletonProcessing) {
            const currentTime = performance.now();
            const deltaTime = currentTime - lastUpdateTime;

            const objectsList = [...World.objects];
            if (deltaTime >= fixedUpdateInterval) {
                for (let i = 0; i < objectsList.length; i++) {
                    const o1 = objectsList[i]!;


                    if (o1 instanceof PhysicalObject) {
                        for (let j = i + 1; j < objectsList.length; j++) {
                            const o2 = objectsList[j]!;
                            if (o2 instanceof PhysicalObject && o2 != o1)
                                this.collisionDetected(o1, o2);
                        }
                        class Border extends PhysicalObject {
                            public override boundingVolume: BoundingVolume = { radius: 0 }
                        }

                        [
                            new Border({ position: [o1.position.x, 0] }), /* Top */
                            new Border({ position: [Renderer.canvas.width, o1.position.y] }), /* Right */
                            new Border({ position: [o1.position.x, Renderer.canvas.height] }), /* Bottom */
                            new Border({ position: [0, o1.position.y] }), /* Left */
                        ].forEach(o2 => this.collisionDetected(o1, o2));
                    }


                    o1.UpdateFixed?.({ renderIndex: i, deltaTime: deltaTime });
                }
            }

            lastUpdateTime = currentTime;
            setTimeout(loopFunction.bind(this), fixedUpdateInterval);
        }).call(this);
    }

    private collisionDetected(o1: PhysicalObject, o2: PhysicalObject) {
        const dis = o1.position.distanceTo(o2.position);
        let dif = dis - (o1.boundingVolume.radius) - (o2.boundingVolume.radius);

        if (dif < 0) {
            // Визначаємо напрямок інерції: вектор, який спрямований від цільового об'єкта до поточного
            const inertiaDirection = o2.position.subtract(o1.position).normalize();

            // Визначаємо величину інерції. Наприклад, використовуючи обернену пропорціональність до відстані між об'єктами
            const inertiaMagnitude = 50 / dis;

            // Застосовуємо інерцію до поточного об'єкта
            o1.inertia.x -= inertiaDirection.x * inertiaMagnitude;
            o1.inertia.y -= inertiaDirection.y * inertiaMagnitude;

            // Застосовуємо інерцію до цільового об'єкта
            o2.inertia.x += inertiaDirection.x * inertiaMagnitude;
            o2.inertia.y += inertiaDirection.y * inertiaMagnitude;
        }
    }

    public stopLoop() {
        cancelAnimationFrame(this.loop);
        this.loop = -1;
    }
}



type Processing = SingletonProcessing;
const Processing = new SingletonProcessing();



export default Processing;