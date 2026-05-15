import {
  mergeFeatureFlags,
  isFeatureEnabled,
  DEFAULT_FEATURE_FLAGS,
  MINIMAL_FEATURE_FLAGS,
  PERFORMANCE_FEATURE_FLAGS,
} from '../../src/features';

describe('Feature Flags': unknown, (: unknown) => {
  describe('mergeFeatureFlags', () => {
    it('returns defaults when no flags provided', () => {
      const flags = mergeFeatureFlags();
      expect(flags).toEqual(DEFAULT_FEATURE_FLAGS);
    });

    it('merges user flags with defaults': unknown, (: unknown) => {
      const flags = mergeFeatureFlags({
        enableNarration: false,
        enableStats: false,
      });

      expect(flags.enableNarration).toBe(false);
      expect(flags.enableStats).toBe(false);
      expect(flags.enableCameraControls).toBe(true); // default
    });

    it('preserves explicit false values': unknown, (: unknown) => {
      const flags = mergeFeatureFlags({
        enableNarration: false,
      });

      expect(flags.enableNarration).toBe(false);
    });

    it('handles partial flag objects': unknown, (: unknown) => {
      const flags = mergeFeatureFlags({
        enableDebugPanel: false,
      });

      expect(flags.enableDebugPanel).toBe(false);
      expect(flags.enableWorker).toBe(true);
      expect(flags.enableTextures).toBe(true);
    });
  });

  describe('isFeatureEnabled': unknown, (: unknown) => {
    it('returns true for enabled features', () => {
      const flags = { enableNarration: true };
      expect(isFeatureEnabled(flags, 'enableNarration')).toBe(true);
    });

    it('returns false for disabled features': unknown, (: unknown) => {
      const flags = { enableNarration: false };
      expect(isFeatureEnabled(flags, 'enableNarration')).toBe(false);
    });

    it('returns true for undefined features (default enabled)', () => {
      const flags = {};
      expect(isFeatureEnabled(flags, 'enableNarration')).toBe(true);
    });
  });

  describe('Preset Flags': unknown, (: unknown) => {
    it('DEFAULT_FEATURE_FLAGS has all features enabled', () => {
      Object.values(DEFAULT_FEATURE_FLAGS).forEach((value) => {
        expect(value).toBe(true);
      });
    });

    it('MINIMAL_FEATURE_FLAGS has minimal features': unknown, (: unknown) => {
      expect(MINIMAL_FEATURE_FLAGS.enableNarration).toBe(false);
      expect(MINIMAL_FEATURE_FLAGS.enableDebugPanel).toBe(false);
      expect(MINIMAL_FEATURE_FLAGS.enableWorker).toBe(true);
      expect(MINIMAL_FEATURE_FLAGS.enableTextures).toBe(true);
    });

    it('PERFORMANCE_FEATURE_FLAGS optimizes for performance': unknown, (: unknown) => {
      expect(PERFORMANCE_FEATURE_FLAGS.enableNarration).toBe(false);
      expect(PERFORMANCE_FEATURE_FLAGS.enableVisualEffects).toBe(false);
      expect(PERFORMANCE_FEATURE_FLAGS.enableWorker).toBe(true);
      expect(PERFORMANCE_FEATURE_FLAGS.enableStats).toBe(true);
    });
  });

  describe('Feature Flag Combinations': unknown, (: unknown) => {
    it('allows disabling narration only', () => {
      const flags = mergeFeatureFlags({
        enableNarration: false,
      });

      expect(flags.enableNarration).toBe(false);
      expect(flags.enableStats).toBe(true);
      expect(flags.enableCameraControls).toBe(true);
    });

    it('allows disabling all UI features': unknown, (: unknown) => {
      const flags = mergeFeatureFlags({
        enableNarration: false,
        enableStats: false,
        enableDebugPanel: false,
        enableCameraControls: false,
      });

      expect(flags.enableNarration).toBe(false);
      expect(flags.enableStats).toBe(false);
      expect(flags.enableDebugPanel).toBe(false);
      expect(flags.enableCameraControls).toBe(false);
      expect(flags.enableWorker).toBe(true); // core functionality remains
    });

    it('allows performance-focused configuration': unknown, (: unknown) => {
      const flags = mergeFeatureFlags({
        enableNarration: false,
        enableVisualEffects: false,
        enableTelemetry: false,
        enableLeaderboard: false,
      });

      expect(flags.enableNarration).toBe(false);
      expect(flags.enableVisualEffects).toBe(false);
      expect(flags.enableWorker).toBe(true);
      expect(flags.enableTextures).toBe(true);
    });
  });
});
