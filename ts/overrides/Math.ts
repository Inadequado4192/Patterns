declare global {
    interface Math extends A {}
}
type A = typeof newMethods;
const newMethods = {
    rand(n1: number, n2: number): number {
        const min = Math.min(n1, n2);
        const max = Math.max(n1, n2);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randElement<A extends any[]>(array: A): A[number] {
        return array[Math.floor(Math.random() * array.length)];
    }
}



export function initOverrideMath() {
    for (let n in newMethods) {
        let name = n as keyof typeof newMethods;
        (Math as any)[name] = newMethods[name];
    }
}