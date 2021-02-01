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
            x: num * Math.random(),
            y: num * Math.random(),
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

function getMinStrip(left: number, right: number, points: Point[]): number {
    if (left === right) {
        return Infinity
    }
    const center = Math.floor((left + right) / 2)
    const leftMinDistance = getMinStrip(left, center, points)
    const rightMinDistance = getMinStrip(center + 1, right, points)
    const xSet: Point[] = []
    let k = 0
    let minDistance = Math.min(leftMinDistance, rightMinDistance)
    for (let i = left; i <= right; i++) {
        if (Math.abs(points[i].x - points[center].x) < minDistance) {
            xSet[k++] = points[i]
        }
    }
    const ySortedPoints = xSet.slice().sort((p1, p2) => (p1.y > p2.y ? 1 : -1))
    for (let i = 0; i < k; i++) {
        for (let j = i + 1; j < k; j++) {
            const dis = getDistance(ySortedPoints[i], ySortedPoints[j])
            if (dis < minDistance) {
                minDistance = dis
            }
        }
    }

    return minDistance
}

export default function findNearestPointPair(points: Point[]): number {
    const xSortedPoints = points.slice().sort((p1, p2) => (p1.x > p2.x ? 1 : -1))
    const left = 0
    const right = points.length - 1
    return getMinStrip(left, right, xSortedPoints)
}

export function findNearestPointPairWithBruteForce(points: Point[]): number {
    const {length} = points
    let minDistance = Infinity
    for (let i = 0; i < length; i++) {
        for (let j = i + 1; j < length; j++) {
            const distance = getDistance(points[i], points[j])
            if (distance < minDistance) {
                minDistance = distance
            }
        }
    }
    return minDistance
}
