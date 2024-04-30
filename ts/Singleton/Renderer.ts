// Singleton

import IHelper from "../other/IHelper";
import WorldObject, { WorldObjectUpdateParameters } from "../objects/WorldObjects";
import World from "./World";


class SingletonRenderer {
    public canvas = document.querySelector("canvas")!;
    public get ctx() { return this.canvas.getContext("2d")!; };
    public drawContext(callback: (ctx: CanvasRenderingContext2D) => void) {
        this.ctx.save();
        this.ctx.beginPath();
        callback(this.ctx);
        this.ctx.closePath();
        this.ctx.restore();
    }
    public render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let o of World.objects) {
            o.Render(this);
        }
    }

    public renderGrid() {
        let size = 50;
        for (let y = 0; y < this.canvas.height; y += size) {
            this.drawContext(() => {
                this.ctx.moveTo(0, y);
                this.ctx.lineTo(this.canvas.width, y);
                this.ctx.stroke();
            });
        }

        for (let x = 0; x < this.canvas.width; x += size) {
            this.drawContext(() => {
                this.ctx.moveTo(x, 0);
                this.ctx.lineTo(x, this.canvas.height);
                this.ctx.stroke();
            })
        }
    }

    private loop: number = -1;
    public startLoop(options?: {
        grid?: boolean
        helpers?: boolean
    }) {
        if (this.loop >= 0) return;
        this.loop = requestAnimationFrame((function loop(this: SingletonRenderer, time: DOMHighResTimeStamp) {
            if (options?.grid) this.renderGrid();
            this.render();

            let renderIndex = 0;
            World.objects.forEach(o => {
                let params: WorldObjectUpdateParameters = {
                    renderIndex: renderIndex++,
                    deltaTime: time,
                }

                if (options?.helpers && Object.keys(o).find(k => k.search(/^_h_/) > -1)) {
                    let t = o as WorldObject & IHelper;
                    this.drawContext(() => {
                        this.ctx.strokeStyle = t._h_arc_color;
                        this.ctx.lineWidth = t._h_arc_lineWidth;
                        this.ctx.arc(o.position.x, o.position.y, t._h_arc_radius, 0, 2 * Math.PI)
                        this.ctx.stroke();
                    })
                }


                o.Update?.(params);
            });

            this.render();

            requestAnimationFrame(loop.bind(this));
        }).bind(this));
    }

    public stopLoop() {
        cancelAnimationFrame(this.loop);
        this.loop = -1;
    }
}
// parameters: RenderParameters
// interface RenderParameters {

// }





type Renderer = SingletonRenderer;
const Renderer = new SingletonRenderer();


addEventListener("load", () => {
    addEventListener("resize", (function resize() {
        Renderer.canvas.width = innerWidth;
        Renderer.canvas.height = innerHeight;
        return resize;
    })())
})



export default Renderer;