# Territory

Deterministic globe topology, territory-aware 3D rendering, and frontier narration helpers for paid-root Hexwar-style simulations.

## Parent
- [Package README](../README.md)

## Files
- `globe.ts`: canonical wrapped-globe generation, stable cell IDs, row-safe tile sizing, and alliance/rally territory types.
- `HexTerritoryGlobe.tsx`: React Three Fiber territory renderer with claim tinting, alliance halos, and rally marker overlays.
- `narration.ts`: frontier narration adapter for claims, Nexus events, rallies, allied-border events, and hourly tick spectacle.
