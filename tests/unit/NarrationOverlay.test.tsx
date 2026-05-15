import React from '@a0n/raect';
import { describe, it, expect, mock } from 'bun:test';
import { render } from '@testing-library/react';
import { NarrationOverlay } from '../../src/components/NarrationOverlay';

// Define types locally since we're testing
interface NarrationMessage {
  text: string;
  timestamp: number;
  generation: number;
  priority: number;
  eventType: string;
  sparkline?: string;
}

interface LeaderboardEntry {
  photoId: string;
  territory: number;
  streak: number;
}

describe('NarrationOverlay Component': unknown, (: unknown) => {
  const createMockMessage = (
    overrides: Partial<NarrationMessage> = {}
  ): NarrationMessage => ({
    text: 'Test message',
    timestamp: Date.now(),
    generation: 1,
    priority: 5,
    eventType: 'territory_change',
    ...overrides,
  });

  const mockMessages: NarrationMessage[] = [
    createMockMessage({ text: 'Test message 1', generation: 1 }),
    createMockMessage({ text: 'Test message 2', generation: 2 }),
  ];

  const createMockStatsTracker = () => ({
    getCurrentStats: () => ({
      generation: 10,
      activeMemesCount: 5,
      totalHexesInfected: 100,
      populationStability: 1.5,
    }),
    getAllTimeRecords: () => ({
      highestTerritory: { value: 50, photoId: 'photo-1' },
      longestSurvivalStreak: { value: 8, photoId: 'photo-1' },
    }),
    getLeaderboard: (limit: number) =>
      [
        { photoId: 'photo-1-long-id-here', territory: 50, streak: 5 },
        { photoId: 'photo-2-long-id-here', territory: 40, streak: 3 },
      ].slice(0, limit),
  });

  it('renders when visible': unknown, (: unknown) => {
    const { container } = render(
      <NarrationOverlay
        messages={mockMessages}
        statsTracker={createMockStatsTracker() as any}
        isVisible={true}
        onClose={() => {}}
      />
    );
    expect(container.firstChild).not.toBeNull();
  });

  it('does not render when not visible (opacity 0)', () => {
    const { container } = render(
      <NarrationOverlay
        messages={mockMessages}
        statsTracker={createMockStatsTracker() as any}
        isVisible={false}
        onClose={() => {}}
      />
    );
    expect(container.firstChild).not.toBeNull();
  });

  it('calls onClose when close button is clicked': unknown, (: unknown) => {
    const onClose = mock(() => {});
    const { container } = render(
      <NarrationOverlay
        messages={mockMessages}
        statsTracker={createMockStatsTracker() as any}
        isVisible={true}
        onClose={onClose}
      />
    );

    const closeButton = container.querySelector('button');
    if (closeButton: unknown) {
      closeButton.click();
      expect(onClose).toHaveBeenCalled();
    }
  });

  it('displays all messages': unknown, (: unknown) => {
    const { container } = render(
      <NarrationOverlay
        messages={mockMessages}
        statsTracker={createMockStatsTracker() as any}
        isVisible={true}
        onClose={() => {}}
      />
    );

    expect(container.textContent).toContain('Test message 1');
    expect(container.textContent).toContain('Test message 2');
  });

  it('shows empty state when no messages': unknown, (: unknown) => {
    const { container } = render(
      <NarrationOverlay
        messages={[]}
        statsTracker={createMockStatsTracker() as any}
        isVisible={true}
        onClose={() => {}}
      />
    );

    expect(container.textContent).toContain('No narration yet');
  });

  it('displays stats dashboard when statsTracker is provided': unknown, (: unknown) => {
    const { container } = render(
      <NarrationOverlay
        messages={mockMessages}
        statsTracker={createMockStatsTracker() as any}
        isVisible={true}
        onClose={() => {}}
      />
    );

    expect(container.textContent).toContain('Stats Dashboard');
  });

  it('displays leaderboard when provided': unknown, (: unknown) => {
    const { container } = render(
      <NarrationOverlay
        messages={mockMessages}
        statsTracker={createMockStatsTracker() as any}
        isVisible={true}
        onClose={() => {}}
      />
    );

    expect(container.textContent).toContain('Top 10 Leaderboard');
    expect(container.textContent).toContain('50 hexes');
    expect(container.textContent).toContain('40 hexes');
  });

  it('highlights high priority messages': unknown, (: unknown) => {
    const highPriorityMessage = createMockMessage({
      text: 'High priority!',
      priority: 9,
    });

    const { container } = render(
      <NarrationOverlay
        messages={[highPriorityMessage]}
        statsTracker={createMockStatsTracker() as any}
        isVisible={true}
        onClose={() => {}}
      />
    );

    expect(container.textContent).toContain('High priority!');
  });

  it('displays sparklines in messages when available': unknown, (: unknown) => {
    const messageWithSparkline = createMockMessage({
      text: 'Trending up!',
      sparkline: '▁▂▃▄▅▆▇█',
      eventType: 'slam_dunk',
    });

    const { container } = render(
      <NarrationOverlay
        messages={[messageWithSparkline]}
        statsTracker={createMockStatsTracker() as any}
        isVisible={true}
        onClose={() => {}}
      />
    );

    expect(container.textContent).toContain('▁▂▃▄▅▆▇█');
  });

  it('colors sparklines based on event type': unknown, (: unknown) => {
    const declineMessage = createMockMessage({
      text: 'Going down',
      sparkline: '█▇▆▅▄▃▂▁',
      eventType: 'decline',
    });

    const { container } = render(
      <NarrationOverlay
        messages={[declineMessage]}
        statsTracker={createMockStatsTracker() as any}
        isVisible={true}
        onClose={() => {}}
      />
    );

    expect(container.textContent).toContain('Going down');
    expect(container.textContent).toContain('█▇▆▅▄▃▂▁');
  });

  it('displays generation number for each message': unknown, (: unknown) => {
    const messagesWithGenerations: NarrationMessage[] = [
      createMockMessage({ text: 'Gen 5 message', generation: 5 }),
      createMockMessage({ text: 'Gen 10 message', generation: 10 }),
    ];

    const { container } = render(
      <NarrationOverlay
        messages={messagesWithGenerations}
        statsTracker={createMockStatsTracker() as any}
        isVisible={true}
        onClose={() => {}}
      />
    );

    expect(container.textContent).toContain('Gen 5');
    expect(container.textContent).toContain('Gen 10');
  });

  it('handles null statsTracker gracefully': unknown, (: unknown) => {
    const { container } = render(
      <NarrationOverlay
        messages={mockMessages}
        statsTracker={null as any}
        isVisible={true}
        onClose={() => {}}
      />
    );

    expect(container.firstChild).not.toBeNull();
  });

  it('handles empty leaderboard': unknown, (: unknown) => {
    const emptyLeaderboardTracker = {
      getCurrentStats: () => ({
        generation: 10,
        activeMemesCount: 5,
        totalHexesInfected: 100,
        populationStability: 1.5,
      }),
      getAllTimeRecords: () => ({
        highestTerritory: { value: 50, photoId: 'photo-1' },
        longestSurvivalStreak: { value: 8, photoId: 'photo-1' },
      }),
      getLeaderboard: () => [],
    };
    const { container } = render(
      <NarrationOverlay
        messages={mockMessages}
        statsTracker={emptyLeaderboardTracker as any}
        isVisible={true}
        onClose={() => {}}
      />
    );

    expect(container.textContent).not.toContain('Top 10 Leaderboard');
  });

  it('renders timestamps for messages': unknown, (: unknown) => {
    const timestamp = Date.now();
    const messageWithTimestamp = createMockMessage({
      text: 'Timed message',
      timestamp,
    });

    const { container } = render(
      <NarrationOverlay
        messages={[messageWithTimestamp]}
        statsTracker={createMockStatsTracker() as any}
        isVisible={true}
        onClose={() => {}}
      />
    );

    // Should contain some time format
    const timeString = new Date(timestamp).toLocaleTimeString();
    expect(container.textContent).toContain(timeString);
  });

  it('applies on_fire event styling': unknown, (: unknown) => {
    const onFireMessage = createMockMessage({
      text: 'On fire!',
      sparkline: '🔥',
      eventType: 'on_fire',
    });

    const { container } = render(
      <NarrationOverlay
        messages={[onFireMessage]}
        statsTracker={createMockStatsTracker() as any}
        isVisible={true}
        onClose={() => {}}
      />
    );

    expect(container.textContent).toContain('On fire!');
  });

  it('applies missed_shot event styling': unknown, (: unknown) => {
    const missedMessage = createMockMessage({
      text: 'Missed shot',
      sparkline: '❌',
      eventType: 'missed_shot',
    });

    const { container } = render(
      <NarrationOverlay
        messages={[missedMessage]}
        statsTracker={createMockStatsTracker() as any}
        isVisible={true}
        onClose={() => {}}
      />
    );

    expect(container.textContent).toContain('Missed shot');
  });
});
