const test = require('ava')

const { primitives } = require('@jscad/modeling')

const { serialize } = require('../index.js')

const countOf = (search, string) => {
  let count = 0
  let index = string.indexOf(search)
  while (index !== -1) {
    count++
    index = string.indexOf(search, index + 1)
  }
  return count
}

test('3D Geometry to JSON', t => {
  const geom1 = primitives.cube()
  const obs1 = serialize({}, geom1)
  t.is(countOf('polygons', obs1[0]), 1)
  t.is(countOf('transforms', obs1[0]), 1)
  t.is(countOf('[', obs1[0]), 39)
  t.is(countOf(']', obs1[0]), 39)
  t.is(countOf(',', obs1[0]), 112)

  const geom2 = primitives.sphere()
  const obs2 = serialize({}, geom2)
  t.is(countOf('polygons', obs2[0]), 1)
  t.is(countOf('transforms', obs2[0]), 1)
  t.is(countOf('[', obs2[0]), 411)
  t.is(countOf(']', obs2[0]), 411)
  t.is(countOf(',', obs2[0]), 1096)

  const obs3 = serialize({}, geom1, geom2, ['hello', 'goodbye'])
  t.is(countOf('polygons', obs3[0]), 2)
  t.is(countOf('transforms', obs3[0]), 2)
  t.is(countOf('[', obs3[0]), 449)
  t.is(countOf(']', obs3[0]), 449)
  t.is(countOf(',', obs3[0]), 1211)
})
