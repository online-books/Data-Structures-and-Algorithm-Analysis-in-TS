/** @format */

export interface PathCostMap {
    [propName: string]: {
        path: string[]
        distance: number
    }
}
export class VertexHeapNode {
    constructor(public vertexIndex: number, public distance: number) {
        this.vertexIndex = vertexIndex
        this.distance = distance
    }
    public valueOf(): number {
        return this.distance
    }
}
