export function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function distance(p1, p2) {
  return Math.sqrt((p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1]))
}

export function createVector(p1, p2) {
  return [
    p2[0] - p1[0],
    p2[1] - p1[1],
  ]
}

export function dotProduct(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1]
}

export function computeStraightFromPoints(p1, p2) {
  if (p2[0] - p1[0] === 0) return { x: p1[0] }
  if (p2[1] - p1[1] === 0) return { y: p1[1] }

  const a = (p2[1] - p1[1]) / (p2[0] - p1[0])
  const b = p1[1] - a * p1[0]

  return { a, b }
}

export function computeStraightsIntersection(s1, s2) {
  const s1x = s1.hasOwnProperty('x')
  const s1y = s1.hasOwnProperty('y')
  const s2x = s2.hasOwnProperty('x')
  const s2y = s2.hasOwnProperty('y')

  if (s1x) {
    if (s2x) return null
    if (s2y) return [s1.x, s2.y]
    return [s1.x, s2.a * s1.x + s2.b]
  }

  if (s1y) {
    if (s2x) return [s2.x, s1.y]
    if (s2y) return null
    return [(s1.y - s2.b) / s2.a, s1.y]
  }

  if (s2x) return [s2.x, s1.a * s2.x + s1.b]
  if (s2y) return [(s2.y - s1.b) / s1.a, s2.y]

  const x = (s2.b - s1.b) / (s1.a - s2.a)

  return [x, s1.a * x + s1.b]
}

function isBetween(x, a, b) {
  return Math.min(a, b) <= x && x <= Math.max(a, b)
}

export function doesPointBelongToSegment(point, segment) {
  const [p1, p2] = segment

  return isBetween(point[0], p1[0], p2[0]) && isBetween(point[1], p1[1], p2[1])
}
