import WorldObject, { WorldObjectUpdateParameters } from "../../objects/WorldObjects"

export default interface IMovable {
    target: WorldObject
    Process(params: WorldObjectUpdateParameters): void
}