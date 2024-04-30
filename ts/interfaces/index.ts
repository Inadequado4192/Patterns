// export interface IEnumerator {
//     MoveNext(): boolean // переміщення на одну позицію вперед в контейнері елементів
//     readonly Current: object  // поточний елемент в контейнері
//     Reset(): void // перехід на початок контейнера
// }
// export interface IEnumerable {
//     GetEnumerator(): IEnumerator
// }

export interface ClonableObject<T = ClonableObject<any>> {
    clone(): T
}

export interface ObserverSubject {
    // Attach an observer to the subject.
    observerAttach(observer: Observer): void;

    // Detach an observer from the subject.
    observerDetach(observer: Observer): void;

    // Notify all observers about an event.
    observerNotify(): void;
}
export interface Observer {
    // Receive update from subject.
    observerUpdate(subject: ObserverSubject, state?: any): void;
}