/** @format */

export default class GraphEdge {
    public from: string
    public to: string
    public weight: number
    constructor(fromNodeName: string, toNodeName: string, weight = 0) {
        this.from = fromNodeName
        this.to = toNodeName
        this.weight = weight
    }
}
