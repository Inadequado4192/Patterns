type VectorV1 = [x: number, y: number]
type VectorV2 = { x: number, y: number }

export type VectorParameters = VectorV1 | VectorV2 | Vector;

export default class Vector {
    public x: number;
    public y: number;

    public constructor();
    public constructor(pos?: VectorParameters);
    public constructor(x: number, y: number);
    public constructor(a1?: VectorParameters | number, y?: number) {
        if (a1 === undefined) a1 = [0, 0];

        if (Array.isArray(a1)) [this.x, this.y] = a1;
        else if (typeof a1 == "object") ({ x: this.x, y: this.y } = a1);
        else[this.x, this.y] = [a1, y!];
    }
    public minus(pos: Vector) {
        return new Vector(this.x - pos.x, this.y - pos.y);
    }

    public distanceTo(pos: Vector) {
        const dx = this.x - pos.x;
        const dy = this.y - pos.y;
        return Math.sqrt(dx * dx + dy * dy);
    }


    // Обчислюємо довжину вектора
    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    // Віднімає вектор other від поточного вектора і повертає новий вектор
    public subtract(other: Vector): Vector {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    // Нормалізує цей вектор (змінює його довжину до 1)
    public normalize(): Vector {
        const length = Math.sqrt(this.x * this.x + this.y * this.y);
        return new Vector(this.x / length, this.y / length);
    }
    // Обчислюємо скалярний добуток векторів
    public dotProduct(other: Vector): number {
        return this.x * other.x + this.y * other.y;
    }

    public angle(vector: Vector): number {
        const deltaX = vector.x - this.x;
        const deltaY = vector.y - this.y;

        // Використовуємо Math.atan2, щоб отримати кут у радіанах
        let angleRad = Math.atan2(deltaY, deltaX);

        // Перетворюємо радіани в градуси
        let angleDeg = angleRad * (180 / Math.PI);

        // Впевніться, що кут знаходиться в межах від 0 до 360 градусів
        if (angleDeg < 0) angleDeg += 360;
        return angleDeg;
    }


    /**
     * Додати вектор до поточного.
     *
     * @param vector - Вектор, який потрібно додати.
     * @returns Поточний вектор, що є сумою двох векторів.
     */
    public add(vector: Vector): Vector {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
}