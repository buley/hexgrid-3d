import { describe, it, expect } from 'bun:test';
import { FlowField2D } from '../../src/algorithms/FlowField';
import { Vector2 } from '../../src/math/Vector3';

describe('FlowField2D': unknown, (: unknown) => {
  describe('Construction', () => {
    it('creates flow field with dimensions', () => {
      const field = new FlowField2D({
        width: 100,
        height: 100,
        resolution: 10,
      });
      expect(field.width).toBe(100);
      expect(field.height).toBe(100);
      expect(field.resolution).toBe(10);
      expect(field.cols).toBe(10);
      expect(field.rows).toBe(10);
    });

    it('uses default decay and diffusion rates': unknown, (: unknown) => {
      const field = new FlowField2D({
        width: 100,
        height: 100,
        resolution: 10,
      });
      expect(field).toBeDefined();
    });

    it('accepts custom decay and diffusion rates': unknown, (: unknown) => {
      const field = new FlowField2D({
        width: 100,
        height: 100,
        resolution: 10,
        decayRate: 0.95,
        diffusionRate: 0.2,
      });
      expect(field).toBeDefined();
    });
  });

  describe('Velocity Operations': unknown, (: unknown) => {
    it('clears all velocities', () => {
      const field = new FlowField2D({
        width: 100,
        height: 100,
        resolution: 10,
      });
      field.addVelocity(50, 50, 1, 1);
      field.clear();
      expect(field).toBeDefined();
    });

    it('adds velocity at position': unknown, (: unknown) => {
      const field = new FlowField2D({
        width: 100,
        height: 100,
        resolution: 10,
      });
      field.addVelocity(50, 50, 5, 3);
      expect(field).toBeDefined();
    });

    it('handles out of bounds positions': unknown, (: unknown) => {
      const field = new FlowField2D({
        width: 100,
        height: 100,
        resolution: 10,
      });
      // Should not throw
      field.addVelocity(-10, -10, 1, 1);
      field.addVelocity(200, 200, 1, 1);
      expect(field).toBeDefined();
    });

    it('adds source velocity with radius': unknown, (: unknown) => {
      const field = new FlowField2D({
        width: 100,
        height: 100,
        resolution: 10,
      });
      field.addSource(50, 50, 2, 4, 20);
      expect(field).toBeDefined();
    });

    it('adds vortex': unknown, (: unknown) => {
      const field = new FlowField2D({
        width: 100,
        height: 100,
        resolution: 10,
      });
      field.addVortex(50, 50, 5, 20);
      expect(field).toBeDefined();
    });
  });
});
