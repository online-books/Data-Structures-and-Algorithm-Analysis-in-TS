/** @format */

import findNearestPointPair, {generagePoints} from '@/Algorithms/DivideAndConquer/FindingNearestPointPair'

describe('Divide and conquer', () => {
    test('finding nearest point pair', () => {
        const POINT_NUM = 200
        const points = generagePoints(POINT_NUM)
        expect(points.length).toBe(POINT_NUM)
        expect(findNearestPointPair(points)).toBe(0)
    })
})
