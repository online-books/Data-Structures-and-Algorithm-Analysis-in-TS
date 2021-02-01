/** @format */

import findNearestPointPair, {
    findNearestPointPairWithBruteForce,
    generagePoints,
} from '@/Algorithms/DivideAndConquer/FindingNearestPointPair'

describe('Divide and conquer', () => {
    test('finding nearest point pair', () => {
        const POINT_NUM = 200
        const points = generagePoints(POINT_NUM)
        expect(points.length).toBe(POINT_NUM)
        const minDistance = findNearestPointPairWithBruteForce(points)
        expect(findNearestPointPair(points)).toBe(minDistance)
    })
})
