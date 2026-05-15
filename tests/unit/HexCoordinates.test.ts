import { describe, it, expect } from 'bun:test';
import {
  Axial,
  Cube,
  GeodesicHexGrid,
  HEALPixGrid,
  AXIAL_DIRECTIONS,
  CUBE_DIRECTIONS,
  generateFlatHexGrid,
  generateSphericalHexGrid,
} from '../../src/math/HexCoordinates';
import { Vector3 } from '../../src/math/Vector3';

describe('HexCoordinates': unknown, (: unknown) => {
  describe('Axial Coordinates', () => {
    it('creates zero axial', () => {
      const a = Axial.zero();
      expect(a.q).toBe(0);
      expect(a.r).toBe(0);
    });

    it('creates from cube coordinates': unknown, (: unknown) => {
      const cube = new Cube(1, -2, 1);
      const axial = Axial.fromCube(cube);
      expect(axial.q).toBe(1);
      expect(axial.r).toBe(1);
    });

    it('creates from offset coordinates (odd-q)', () => {
      const offset = { col: 2, row: 3 };
      const axial = Axial.fromOffset(offset, true);
      expect(axial.q).toBe(2);
    });

    it('creates from offset coordinates (even-q)', () => {
      const offset = { col: 2, row: 3 };
      const axial = Axial.fromOffset(offset, false);
      expect(axial.q).toBe(2);
    });

    it('creates from pixel position (flat top)', () => {
      const axial = Axial.fromPixel(0, 0, 10, true);
      expect(axial.q).toBe(0);
      expect(axial.r).toBe(0);
    });

    it('creates from pixel position (pointy top)', () => {
      const axial = Axial.fromPixel(0, 0, 10, false);
      expect(axial.q).toBe(0);
      expect(axial.r).toBe(0);
    });

    it('rounds fractional coordinates': unknown, (: unknown) => {
      const axial = Axial.round(0.3, 0.2);
      expect(Number.isInteger(axial.q)).toBe(true);
      expect(Number.isInteger(axial.r)).toBe(true);
    });

    it('clones axial': unknown, (: unknown) => {
      const a = new Axial(1, 2);
      const b = a.clone();
      expect(b.q).toBe(1);
      expect(b.r).toBe(2);
      expect(a).not.toBe(b);
    });

    it('checks equality': unknown, (: unknown) => {
      const a = new Axial(1, 2);
      const b = new Axial(1, 2);
      const c = new Axial(2, 1);
      expect(a.equals(b)).toBe(true);
      expect(a.equals(c)).toBe(false);
    });

    it('adds axial coordinates': unknown, (: unknown) => {
      const a = new Axial(1, 2);
      const b = new Axial(3, 4);
      const result = a.add(b);
      expect(result.q).toBe(4);
      expect(result.r).toBe(6);
    });

    it('subtracts axial coordinates': unknown, (: unknown) => {
      const a = new Axial(5, 6);
      const b = new Axial(2, 3);
      const result = a.subtract(b);
      expect(result.q).toBe(3);
      expect(result.r).toBe(3);
    });

    it('scales axial coordinates': unknown, (: unknown) => {
      const a = new Axial(2, 3);
      const result = a.scale(2);
      expect(result.q).toBe(4);
      expect(result.r).toBe(6);
    });

    it('calculates implicit s coordinate': unknown, (: unknown) => {
      const a = new Axial(2, 3);
      expect(a.s).toBe(-5); // s = -q - r
    });

    it('converts to cube coordinates': unknown, (: unknown) => {
      const a = new Axial(1, 2);
      const cube = a.toCube();
      expect(cube.x).toBe(1);
      expect(cube.z).toBe(2);
      expect(cube.x + cube.y + cube.z).toBe(0);
    });

    it('converts to offset coordinates': unknown, (: unknown) => {
      const a = new Axial(0, 0);
      const offset = a.toOffset();
      expect(offset.col).toBe(0);
      expect(offset.row).toBe(0);
    });

    it('converts to offset coordinates (even-q)', () => {
      const a = new Axial(2, 3);
      const offset = a.toOffset(false);
      expect(offset.col).toBe(2);
    });

    it('converts to pixel position (flat top)', () => {
      const a = new Axial(0, 0);
      const pixel = a.toPixel(10, true);
      expect(pixel.x).toBeCloseTo(0);
      expect(pixel.y).toBeCloseTo(0);
    });

    it('converts to pixel position (pointy top)', () => {
      const a = new Axial(0, 0);
      const pixel = a.toPixel(10, false);
      expect(pixel.x).toBeCloseTo(0);
      expect(pixel.y).toBeCloseTo(0);
    });

    it('converts to pixel and back (flat top)', () => {
      const a = new Axial(2, 3);
      const pixel = a.toPixel(10, true);
      const back = Axial.fromPixel(pixel.x, pixel.y, 10, true);
      expect(back.q).toBe(a.q);
      expect(back.r).toBe(a.r);
    });

    it('converts to pixel and back (pointy top)', () => {
      const a = new Axial(2, 3);
      const pixel = a.toPixel(10, false);
      const back = Axial.fromPixel(pixel.x, pixel.y, 10, false);
      expect(back.q).toBe(a.q);
      expect(back.r).toBe(a.r);
    });

    it('calculates distance to another axial': unknown, (: unknown) => {
      const a = new Axial(0, 0);
      const b = new Axial(2, -1);
      expect(a.distanceTo(b)).toBe(2);
    });

    it('gets neighbors': unknown, (: unknown) => {
      const a = new Axial(0, 0);
      const neighbors = a.neighbors();
      expect(neighbors.length).toBe(6);
    });

    it('gets specific neighbor': unknown, (: unknown) => {
      const a = new Axial(0, 0);
      const neighbor = a.neighbor(0);
      expect(neighbor).toBeDefined();
    });

    it('gets range of hexes': unknown, (: unknown) => {
      const a = new Axial(0, 0);
      const range = a.range(1);
      expect(range.length).toBe(7); // center + 6 neighbors
    });

    it('gets ring of hexes': unknown, (: unknown) => {
      const a = new Axial(0, 0);
      const ring = a.ring(1);
      expect(ring.length).toBe(6);
    });

    it('gets ring at radius 0': unknown, (: unknown) => {
      const a = new Axial(0, 0);
      const ring = a.ring(0);
      expect(ring.length).toBe(1);
      expect(ring[0].equals(a)).toBe(true);
    });

    it('gets spiral of hexes': unknown, (: unknown) => {
      const a = new Axial(0, 0);
      const spiral = a.spiral(2);
      expect(spiral.length).toBe(1 + 6 + 12); // radius 0 + radius 1 + radius 2
    });

    it('draws line to another hex': unknown, (: unknown) => {
      const a = new Axial(0, 0);
      const b = new Axial(3, 0);
      const line = a.lineTo(b);
      expect(line.length).toBe(4); // 0, 1, 2, 3
      expect(line[0].equals(a)).toBe(true);
      expect(line[line.length - 1].equals(b)).toBe(true);
    });

    it('handles line to same hex': unknown, (: unknown) => {
      const a = new Axial(2, 3);
      const line = a.lineTo(a);
      expect(line.length).toBe(1);
    });

    it('rotates clockwise': unknown, (: unknown) => {
      const a = new Axial(1, 0);
      const rotated = a.rotateCW();
      expect(rotated).toBeDefined();
    });

    it('rotates counter-clockwise': unknown, (: unknown) => {
      const a = new Axial(1, 0);
      const rotated = a.rotateCCW();
      expect(rotated).toBeDefined();
    });

    it('rotates around point clockwise': unknown, (: unknown) => {
      const a = new Axial(2, 0);
      const center = new Axial(1, 0);
      const rotated = a.rotateAroundCW(center);
      expect(rotated).toBeDefined();
    });

    it('rotates around point counter-clockwise': unknown, (: unknown) => {
      const a = new Axial(2, 0);
      const center = new Axial(1, 0);
      const rotated = a.rotateAroundCCW(center);
      expect(rotated).toBeDefined();
    });

    it('reflects across q axis': unknown, (: unknown) => {
      const a = new Axial(1, 2);
      const reflected = a.reflectQ();
      expect(reflected.q).toBe(1);
      expect(reflected.r).toBe(a.s);
    });

    it('reflects across r axis': unknown, (: unknown) => {
      const a = new Axial(1, 2);
      const reflected = a.reflectR();
      expect(reflected.r).toBe(2);
    });

    it('reflects across s axis': unknown, (: unknown) => {
      const a = new Axial(1, 2);
      const reflected = a.reflectS();
      expect(reflected.q).toBe(2);
      expect(reflected.r).toBe(1);
    });

    it('converts to string': unknown, (: unknown) => {
      const a = new Axial(1, 2);
      expect(a.toString()).toBe('Axial(1, 2)');
    });

    it('converts to key': unknown, (: unknown) => {
      const a = new Axial(1, 2);
      expect(a.toKey()).toBe('1,2');
    });

    it('creates from key': unknown, (: unknown) => {
      const a = Axial.fromKey('3,4');
      expect(a.q).toBe(3);
      expect(a.r).toBe(4);
    });

    it('round-trips through key': unknown, (: unknown) => {
      const a = new Axial(5, -3);
      const key = a.toKey();
      const back = Axial.fromKey(key);
      expect(back.equals(a)).toBe(true);
    });
  });

  describe('Cube Coordinates': unknown, (: unknown) => {
    it('creates zero cube', () => {
      const c = Cube.zero();
      expect(c.x).toBe(0);
      expect(c.y).toBe(0);
      expect(c.z).toBe(0);
    });

    it('creates from axial': unknown, (: unknown) => {
      const axial = new Axial(1, 2);
      const cube = Cube.fromAxial(axial);
      expect(cube.x).toBe(1);
      expect(cube.z).toBe(2);
      expect(cube.x + cube.y + cube.z).toBe(0);
    });

    it('rounds fractional cube coordinates': unknown, (: unknown) => {
      const cube = Cube.round(0.3, 0.5, -0.8);
      expect(Number.isInteger(cube.x)).toBe(true);
      expect(Number.isInteger(cube.y)).toBe(true);
      expect(Number.isInteger(cube.z)).toBe(true);
      expect(cube.x + cube.y + cube.z).toBe(0);
    });

    it('clones cube': unknown, (: unknown) => {
      const c1 = new Cube(1, -3, 2);
      const c2 = c1.clone();
      expect(c2.x).toBe(1);
      expect(c2.y).toBe(-3);
      expect(c2.z).toBe(2);
      expect(c1).not.toBe(c2);
    });

    it('checks equality': unknown, (: unknown) => {
      const c1 = new Cube(1, -2, 1);
      const c2 = new Cube(1, -2, 1);
      const c3 = new Cube(2, -2, 0);
      expect(c1.equals(c2)).toBe(true);
      expect(c1.equals(c3)).toBe(false);
    });

    it('adds cube coordinates': unknown, (: unknown) => {
      const c1 = new Cube(1, -2, 1);
      const c2 = new Cube(2, 0, -2);
      const result = c1.add(c2);
      expect(result.x).toBe(3);
      expect(result.y).toBe(-2);
      expect(result.z).toBe(-1);
    });

    it('subtracts cube coordinates': unknown, (: unknown) => {
      const c1 = new Cube(3, -2, -1);
      const c2 = new Cube(1, 0, -1);
      const result = c1.subtract(c2);
      expect(result.x).toBe(2);
      expect(result.y).toBe(-2);
      expect(result.z).toBe(0);
    });

    it('scales cube coordinates': unknown, (: unknown) => {
      const c = new Cube(1, -2, 1);
      const result = c.scale(2);
      expect(result.x).toBe(2);
      expect(result.y).toBe(-4);
      expect(result.z).toBe(2);
    });

    it('calculates distance between cubes': unknown, (: unknown) => {
      const c1 = new Cube(0, 0, 0);
      const c2 = new Cube(2, -2, 0);
      expect(c1.distanceTo(c2)).toBe(2);
    });

    it('converts to axial': unknown, (: unknown) => {
      const c = new Cube(1, -3, 2);
      const axial = c.toAxial();
      expect(axial.q).toBe(1);
      expect(axial.r).toBe(2);
    });

    it('gets neighbors': unknown, (: unknown) => {
      const c = new Cube(0, 0, 0);
      const neighbors = c.neighbors();
      expect(neighbors.length).toBe(6);
      neighbors.forEach((n) => {
        expect(c.distanceTo(n)).toBe(1);
      });
    });

    it('lerps between cubes': unknown, (: unknown) => {
      const c1 = new Cube(0, 0, 0);
      const c2 = new Cube(4, -4, 0);
      const mid = c1.lerp(c2, 0.5);
      expect(mid.x).toBeCloseTo(2);
      expect(mid.y).toBeCloseTo(-2);
    });

    it('draws line between cubes': unknown, (: unknown) => {
      const c1 = new Cube(0, 0, 0);
      const c2 = new Cube(3, -3, 0);
      const line = c1.lineTo(c2);
      expect(line.length).toBe(4); // includes both endpoints
      expect(line[0].equals(c1)).toBe(true);
      expect(line[line.length - 1].equals(c2)).toBe(true);
    });

    it('handles line to same cube': unknown, (: unknown) => {
      const c = new Cube(1, -2, 1);
      const line = c.lineTo(c);
      expect(line.length).toBe(1);
      expect(line[0].equals(c)).toBe(true);
    });

    it('gets specific neighbor': unknown, (: unknown) => {
      const c = new Cube(0, 0, 0);
      const neighbor = c.neighbor(0);
      expect(c.distanceTo(neighbor)).toBe(1);
    });

    it('rotates clockwise': unknown, (: unknown) => {
      const c = new Cube(1, -1, 0);
      const rotated = c.rotateCW();
      expect(rotated.x + rotated.y + rotated.z).toBe(0);
    });

    it('rotates counter-clockwise': unknown, (: unknown) => {
      const c = new Cube(1, -1, 0);
      const rotated = c.rotateCCW();
      expect(rotated.x + rotated.y + rotated.z).toBe(0);
    });

    it('rotates by steps': unknown, (: unknown) => {
      const c = new Cube(1, -1, 0);
      const rotated = c.rotate(2);
      expect(rotated.x + rotated.y + rotated.z).toBe(0);
    });

    it('rotates by negative steps': unknown, (: unknown) => {
      const c = new Cube(1, -1, 0);
      const rotated = c.rotate(-1);
      expect(rotated.x + rotated.y + rotated.z).toBe(0);
    });

    it('reflects through origin': unknown, (: unknown) => {
      const c = new Cube(1, -2, 1);
      const reflected = c.reflect();
      expect(reflected.x).toBe(-1);
      expect(reflected.y).toBe(2);
      expect(reflected.z).toBe(-1);
    });

    it('converts to string': unknown, (: unknown) => {
      const c = new Cube(1, -2, 1);
      expect(c.toString()).toBe('Cube(1, -2, 1)');
    });

    it('converts to key': unknown, (: unknown) => {
      const c = new Cube(1, -2, 1);
      expect(c.toKey()).toBe('1,-2,1');
    });

    it('rounds with x having largest diff': unknown, (: unknown) => {
      const rounded = Cube.round(0.6, 0.1, -0.7);
      expect(rounded.x + rounded.y + rounded.z).toBe(0);
    });

    it('rounds with y having largest diff': unknown, (: unknown) => {
      const rounded = Cube.round(0.1, 0.6, -0.7);
      expect(rounded.x + rounded.y + rounded.z).toBe(0);
    });

    it('rounds with z having largest diff': unknown, (: unknown) => {
      const rounded = Cube.round(0.1, -0.7, 0.6);
      expect(rounded.x + rounded.y + rounded.z).toBe(0);
    });
  });

  describe('Direction Constants': unknown, (: unknown) => {
    it('has 6 axial directions', () => {
      expect(AXIAL_DIRECTIONS.length).toBe(6);
    });

    it('has 6 cube directions': unknown, (: unknown) => {
      expect(CUBE_DIRECTIONS.length).toBe(6);
    });

    it('all cube directions maintain x+y+z=0 constraint': unknown, (: unknown) => {
      CUBE_DIRECTIONS.forEach((d) => {
        expect(d.x + d.y + d.z).toBe(0);
      });
    });
  });

  describe('GeodesicHexGrid': unknown, (: unknown) => {
    it('creates geodesic grid with default subdivisions', () => {
      const grid = new GeodesicHexGrid();
      expect(grid.subdivisions).toBe(3);
      expect(grid.vertices.length).toBeGreaterThan(0);
    });

    it('creates geodesic grid with custom subdivisions': unknown, (: unknown) => {
      const grid = new GeodesicHexGrid(2);
      expect(grid.subdivisions).toBe(2);
    });

    it('generates hex centers': unknown, (: unknown) => {
      const grid = new GeodesicHexGrid(1);
      expect(grid.hexCenters.length).toBeGreaterThan(0);
    });

    it('generates neighbors for each hex': unknown, (: unknown) => {
      const grid = new GeodesicHexGrid(1);
      expect(grid.neighbors.length).toBe(grid.hexCenters.length);
    });

    it('finds hex for a point': unknown, (: unknown) => {
      const grid = new GeodesicHexGrid(1);
      const hexIndex = grid.findHex(grid.hexCenters[0]);
      expect(hexIndex).toBe(0);
    });

    it('converts lat/lng to hex': unknown, (: unknown) => {
      const grid = new GeodesicHexGrid(1);
      const hexIndex = grid.latLngToHex(0, 0);
      expect(hexIndex).toBeGreaterThanOrEqual(0);
    });

    it('converts hex to lat/lng': unknown, (: unknown) => {
      const grid = new GeodesicHexGrid(1);
      const latlng = grid.hexToLatLng(0);
      expect(typeof latlng.lat).toBe('number');
      expect(typeof latlng.lng).toBe('number');
    });

    it('gets hex sides count': unknown, (: unknown) => {
      const grid = new GeodesicHexGrid(1);
      const sides = grid.getHexSides(0);
      expect(sides).toBeGreaterThanOrEqual(5);
      expect(sides).toBeLessThanOrEqual(6);
    });

    it('identifies pentagons': unknown, (: unknown) => {
      const grid = new GeodesicHexGrid(1);
      // Icosahedron has 12 pentagons at vertices
      let pentagonCount = 0;
      for (let i = 0; i < grid.hexCenters.length; i++: unknown) {
        if (grid.isPentagon(i)) pentagonCount++;
      }
      expect(pentagonCount).toBe(12);
    });

    it('gets hexes in range': unknown, (: unknown) => {
      const grid = new GeodesicHexGrid(1);
      const hexes = grid.getHexesInRange(0, 1);
      expect(hexes.length).toBeGreaterThan(1);
      expect(hexes).toContain(0);
    });

    it('calculates distance between hexes': unknown, (: unknown) => {
      const grid = new GeodesicHexGrid(1);
      const dist = grid.distanceBetweenHexes(0, 1);
      expect(dist).toBeGreaterThan(0);
    });
  });

  describe('HEALPixGrid': unknown, (: unknown) => {
    it('creates HEALPix grid with default nside', () => {
      const grid = new HEALPixGrid();
      expect(grid.nside).toBe(4);
    });

    it('creates HEALPix grid with custom nside': unknown, (: unknown) => {
      const grid = new HEALPixGrid(8);
      expect(grid.nside).toBe(8);
    });

    it('calculates correct npix (12 * nside^2)', () => {
      const grid = new HEALPixGrid(4);
      expect(grid.npix).toBe(12 * 4 * 4);
    });

    it('calculates pixel area': unknown, (: unknown) => {
      const grid = new HEALPixGrid(4);
      expect(grid.pixelArea).toBeCloseTo((4 * Math.PI) / grid.npix);
    });

    it('converts pixel index to angular coordinates (north cap)', () => {
      const grid = new HEALPixGrid(4);
      const ang = grid.pixToAng(0);
      expect(ang.theta).toBeGreaterThanOrEqual(0);
      expect(ang.theta).toBeLessThanOrEqual(Math.PI);
    });

    it('converts pixel index to angular coordinates (equatorial)', () => {
      const grid = new HEALPixGrid(4);
      const ncap = 2 * grid.nside * (grid.nside - 1);
      const ang = grid.pixToAng(ncap + 1);
      expect(ang.theta).toBeGreaterThanOrEqual(0);
      expect(ang.theta).toBeLessThanOrEqual(Math.PI);
    });

    it('converts pixel index to angular coordinates (south cap)', () => {
      const grid = new HEALPixGrid(4);
      const ncap = 2 * grid.nside * (grid.nside - 1);
      const southCapStart = grid.npix - ncap;
      const ang = grid.pixToAng(southCapStart + 1);
      expect(ang.theta).toBeGreaterThanOrEqual(0);
      expect(ang.theta).toBeLessThanOrEqual(Math.PI);
    });

    it('converts angular to pixel (north region)', () => {
      const grid = new HEALPixGrid(4);
      const pix = grid.angToPix(0.5, 1.0);
      expect(pix).toBeGreaterThanOrEqual(0);
      expect(pix).toBeLessThan(grid.npix);
    });

    it('converts angular to pixel (equatorial region)', () => {
      const grid = new HEALPixGrid(4);
      const pix = grid.angToPix(Math.PI / 2, 1.0);
      expect(pix).toBeGreaterThanOrEqual(0);
      expect(pix).toBeLessThan(grid.npix);
    });

    it('converts angular to pixel (south region)', () => {
      const grid = new HEALPixGrid(4);
      const pix = grid.angToPix(2.5, 1.0);
      expect(pix).toBeGreaterThanOrEqual(0);
      expect(pix).toBeLessThan(grid.npix);
    });

    it('converts lat/lng to pixel': unknown, (: unknown) => {
      const grid = new HEALPixGrid(4);
      const pix = grid.latLngToPix(0, 0);
      expect(pix).toBeGreaterThanOrEqual(0);
      expect(pix).toBeLessThan(grid.npix);
    });

    it('converts pixel to lat/lng': unknown, (: unknown) => {
      const grid = new HEALPixGrid(4);
      const coords = grid.pixToLatLng(0);
      expect(typeof coords.lat).toBe('number');
      expect(typeof coords.lng).toBe('number');
    });

    it('gets pixel neighbors': unknown, (: unknown) => {
      const grid = new HEALPixGrid(4);
      const neighbors = grid.getNeighbors(grid.npix / 2);
      expect(neighbors.length).toBeGreaterThan(0);
    });

    it('has correct pixel count for nside=8': unknown, (: unknown) => {
      const grid = new HEALPixGrid(8);
      expect(grid.npix).toBe(12 * 8 * 8);
    });
  });

  describe('generateFlatHexGrid': unknown, (: unknown) => {
    it('generates a flat hex grid with correct dimensions', () => {
      const result = generateFlatHexGrid({
        radius: 10,
        width: 5,
        height: 4,
      });
      expect(result.positions.length).toBe(20);
      expect(result.axialCoords.length).toBe(20);
      expect(result.neighbors.length).toBe(20);
    });

    it('generates positions as Vector2': unknown, (: unknown) => {
      const result = generateFlatHexGrid({
        radius: 10,
        width: 3,
        height: 3,
      });
      expect(result.positions[0]).toBeDefined();
      expect(typeof result.positions[0].x).toBe('number');
      expect(typeof result.positions[0].y).toBe('number');
    });

    it('generates correct axial coordinates': unknown, (: unknown) => {
      const result = generateFlatHexGrid({
        radius: 10,
        width: 2,
        height: 2,
      });
      result.axialCoords.forEach((coord: unknown) => {
        expect(coord).toBeInstanceOf(Axial);
      });
    });

    it('generates neighbor relationships': unknown, (: unknown) => {
      const result = generateFlatHexGrid({
        radius: 10,
        width: 3,
        height: 3,
      });
      // Center hex should have neighbors
      const centerIndex = 4;
      expect(result.neighbors[centerIndex].length).toBeGreaterThan(0);
    });

    it('supports flat-top hexes': unknown, (: unknown) => {
      const result = generateFlatHexGrid({
        radius: 10,
        width: 3,
        height: 3,
        flatTop: true,
      });
      expect(result.positions.length).toBe(9);
    });

    it('supports pointy-top hexes': unknown, (: unknown) => {
      const result = generateFlatHexGrid({
        radius: 10,
        width: 3,
        height: 3,
        flatTop: false,
      });
      expect(result.positions.length).toBe(9);
    });
  });

  describe('generateSphericalHexGrid': unknown, (: unknown) => {
    it('generates a spherical hex grid', () => {
      const result = generateSphericalHexGrid({
        hexRadius: 0.1,
        sphereRadius: 1,
      });
      expect(result.positions.length).toBeGreaterThan(0);
      expect(result.geoCoords.length).toBe(result.positions.length);
      expect(result.neighbors.length).toBe(result.positions.length);
    });

    it('generates Vector3 positions': unknown, (: unknown) => {
      const result = generateSphericalHexGrid({
        hexRadius: 0.2,
        sphereRadius: 1,
      });
      expect(result.positions[0]).toBeDefined();
      expect(typeof result.positions[0].x).toBe('number');
      expect(typeof result.positions[0].y).toBe('number');
      expect(typeof result.positions[0].z).toBe('number');
    });

    it('generates geographic coordinates': unknown, (: unknown) => {
      const result = generateSphericalHexGrid({
        hexRadius: 0.2,
        sphereRadius: 1,
      });
      result.geoCoords.forEach((coord: unknown) => {
        expect(typeof coord.lat).toBe('number');
        expect(typeof coord.lng).toBe('number');
      });
    });

    it('respects custom lat/lng ranges': unknown, (: unknown) => {
      const result = generateSphericalHexGrid({
        hexRadius: 0.3,
        sphereRadius: 1,
        latRange: [0, 45],
        lngRange: [-90, 0],
      });
      result.geoCoords.forEach((coord: unknown) => {
        expect(coord.lat).toBeGreaterThanOrEqual(0);
        expect(coord.lat).toBeLessThanOrEqual(45);
        expect(coord.lng).toBeGreaterThanOrEqual(-90);
        expect(coord.lng).toBeLessThanOrEqual(0);
      });
    });

    it('generates neighbor relationships': unknown, (: unknown) => {
      const result = generateSphericalHexGrid({
        hexRadius: 0.2,
        sphereRadius: 1,
      });
      // Most hexes should have neighbors (up to 6)
      const withNeighbors = result.neighbors.filter((n) => n.length > 0);
      expect(withNeighbors.length).toBeGreaterThan(0);
    });
  });
});

describe('HEALPixGrid Additional Methods': unknown, (: unknown) => {
  it('converts pixel to Vector3', () => {
    const grid = new HEALPixGrid(4);
    const vec = grid.pixToVector(0);
    expect(vec).toBeInstanceOf(Vector3);
    expect(vec.magnitude()).toBeCloseTo(1, 2);
  });

  it('converts multiple pixels to vectors': unknown, (: unknown) => {
    const grid = new HEALPixGrid(2);
    for (let i = 0; i < 5; i++: unknown) {
      const vec = grid.pixToVector(i);
      expect(vec).toBeInstanceOf(Vector3);
      expect(vec.magnitude()).toBeCloseTo(1, 2);
    }
  });

  it('gets all centers as Vector3 array': unknown, (: unknown) => {
    const grid = new HEALPixGrid(2);
    const centers = grid.getAllCenters();
    expect(Array.isArray(centers)).toBe(true);
    expect(centers.length).toBe(grid.npix);
    centers.forEach((center) => {
      expect(center).toBeInstanceOf(Vector3);
      expect(center.magnitude()).toBeCloseTo(1, 2);
    });
  });
});
