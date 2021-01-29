/** @format */

import {swap} from '@/Shared/Util'

export interface Point {
    x: number
    y: number
}

export function generagePoints(num: number): Point[] {
    const points = []
    for (let i = 0; i < num; i++) {
        points.push({
            x: i + Math.random(),
            y: i + Math.random(),
        })
    }
    for (let i = 0; i < num; i++) {
        const index = Math.floor(Math.random() * num)
        swap(points, i, index)
    }
    return points
}

export function getDistance(p1: Point, p2: Point): number {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}

export default function findNearestPointPair(points: Point[]): number {
    const xSortedPoints = points.sort((p1, p2) => (p1.x > p2.x ? 1 : -1))
    const ySortedPoints = points.sort((p1, p2) => (p1.y > p2.y ? 1 : -1))
    return getDistance(xSortedPoints[0], ySortedPoints[0])
}
