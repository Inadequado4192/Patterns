import WorldObject from "../objects/WorldObjects";

export default interface IFactory<I = WorldObject> {
    callback?(): I;
    create(): I;
}