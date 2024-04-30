class Color {
    public static Hex(hex: string | number): Color { return {} as Color; /* ... */ }
    public static RGBA(r: number, g: number, b: number, a: number = 1): Color { return {} as Color; /* ... */ }

    public code: number = 0x000000;
    private constructor() { };
}
abstract class Vertex { }
class VertexCircle { constructor(radius: number) { } }
class VertexSquare { constructor(width: number, height: number) { } }

abstract class Figure {
    public color: Color = Color.Hex("#FF0000");
    public abstract vertex: Vertex;
}
class Circle extends Figure {
    public override vertex: Vertex;
    public constructor(radius: number) {
        super();
        this.vertex = new VertexCircle(radius);
    }
}
class Square extends Figure {
    public override vertex: Vertex;
    public constructor(size: number) {
        super();
        this.vertex = new VertexSquare(size, size);
    }
}

let circle = new Circle(10);
let cube = new Square(5);

circle.color = Color.RGBA(255, 255, 0, .5);