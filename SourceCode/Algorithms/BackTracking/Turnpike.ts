/** @format */

import {compareFn} from '@/Shared/Util'

export default function turnpike(distance: number[]): number[] {
    const {length} = distance
    if (!length) {
        return []
    }
    const pointNum = Math.sqrt(2 * length + 1 / 4) + 1 / 2
    if (!Number.isInteger(pointNum)) {
        throw Error('The count of distance is invalid')
    }
    const sortedDistance = distance.slice().sort(compareFn(false))
    const points: number[] = []
    points[0] = 0
    points[pointNum - 1] = sortedDistance.pop()!
    place(points, sortedDistance, 1, pointNum - 2)
    return points
}

function place(points: number[], distance: number[], left: number, right: number): boolean {
    if (distance.length === 0) {
        return true
    }
    const {length} = points
    const removed: number[] = []
    let maxDistance = distance[distance.length - 1]
    let found = true
    for (let i = 0; i < length; i++) {
        if (i > right || i < left) {
            const diff = Math.abs(points[i] - maxDistance)
            const index = distance.findIndex(d => d === diff)
            if (index < 0) {
                found = false
                break
            } else {
                removed.push(distance[index])
                distance.splice(index, 1)
            }
        }
    }
    if (found) {
        points[right] = maxDistance
        found = place(points, distance, left, right - 1)
    }
    if (!found) {
        removed.forEach(value => distance.push(value))
        distance.sort(compareFn(false))
        removed.length = 0
        found = true
        maxDistance = points[length - 1] - maxDistance
        for (let i = 0; i < length; i++) {
            if (i > right || i < left) {
                const diff = Math.abs(points[i] - maxDistance)
                const index = distance.findIndex(d => d === diff)
                if (index < 0) {
                    found = false
                    break
                } else {
                    removed.push(distance[index])
                    distance.splice(index, 1)
                }
            }
        }
        if (found) {
            points[left] = maxDistance
            found = place(points, distance, left + 1, right)
        }
        if (!found) {
            removed.forEach(value => distance.push(value))
            distance.sort(compareFn(false))
            removed.length = 0
        }
    }
    return found
}
