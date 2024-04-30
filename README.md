# LW 1 ✔
**Factory Method Pattern** використовується для реалізації класу [`Spawner`](/ts/objects/Spawner.ts) для створення об'єктів на основі переданої фабрики.

# LW 2 ✔
**Prototype Pattern** був використаний для створення інтерфейсу [`ClonableObject`](/ts/interfaces/index.ts) який використовується для повного клонування усіх властивостей об'єкта.

**Builder Pattern** використовується для створення [`CellBuilder`](ts/Builders/CellBuilder.ts) який додає можливість будувати розширений об'єкт.

# LW 3 ✔
**Strategy Pattern** використовується для реалізації інтерфейсу [`IMovable`](ts/objects/Movable/IMovable.ts) який використовується для встановлення алгоритму руху об'єкта.

**Observer Pattern** використовується для спостереження об'єктів `Cell` за батьківським `Cell` ([`ObserverSubject`](/ts/interfaces/index.ts))

З використанням **Command Pattern** можна реалізувати взаємодію з ігровим світом, а саме вибір об'єкту, видалення та редагування параметрів.

# ~~LW 4~~
**~~Паттерн Макрокоманди~~**

**~~Template Method~~**

# LW 5 ✔
Через наявність `Symbol.iterator`, **Iterator Pattern** в TypeScript часто не використовується, оскільки `Symbol.iterator` надає зручний та сучасний спосіб створення ітераторів для об'єктів і колекцій, що робить ручну реалізацію паттерну ітератора зайвою.

**State Pattern** використовується для створення класу `FrogState` для визначення стану об'єкта.

**Chain of responsibility** - [`ts/__/chainOfResponsibility.ts`](ts/__/chainOfResponsibility.ts)

# LW 6
**Pattern Interpreter** - [`ts/__/Interpreter.ts`](ts/__/Interpreter.ts)

**Mediator** - [`ts/__/Mediator.ts`](ts/__/Mediator.ts)

# LW 7
Для зберігання інформації про `Cell` був використаний **Memento Pattern**. За допомогогую метода `save(): Memento` зберігається інформація про об'єм та інша інформаці. Метод `restore(m: Memento): void` відновлює збережені данні.

**Visitor** - [`ts/__/Visitor.ts`](ts/__/Visitor.ts)


# LW 8

**Facade** - [`ts/__/Facade.ts`](ts/__/Facade.ts)

**Proxy** - [`ts/__/Proxy.ts`](ts/__/Proxy.ts)

**Bridge** - [`ts/__/Bridge.ts`](ts/__/Bridge.ts)