# HexGrid 3D Test Documentation

## Test Structure

The test suite is organized into three main categories:

### Unit Tests (`tests/unit/`)

Tests for individual components and utilities in isolation.

**Coverage:**
- `HexGrid.test.tsx` - Core grid component
- `NarrationOverlay.test.tsx` - Narration overlay component
- `uiStore.test.ts` - UI state management

**Running:**
```bash
npm test tests/unit
```

### Integration Tests (`tests/integration/`)

Tests for component interactions and data flow.

**Coverage:**
- `HexGrid.integration.test.tsx` - Full component integration
- Store and component coordination
- Props and callbacks

**Running:**
```bash
npm test tests/integration
```

### E2E Tests (`tests/e2e/`)

End-to-end tests using Playwright for full user workflows.

**Coverage:**
- `hexgrid.spec.ts` - Complete user interactions
- Mouse and touch gestures
- Keyboard shortcuts
- Performance benchmarks
- Accessibility checks

**Running:**
```bash
npm run test:e2e
```

## Writing Tests

### Unit Test Example

```typescript
import { render, screen } from '@testing-library/react'
import { HexGrid } from '../../src/components/HexGrid'

describe('HexGrid', () => {
  it('renders without crashing', () => {
    render(<HexGrid photos={[]} />)
    expect(screen.getByRole('canvas')).toBeInTheDocument()
  })
})
```

### Integration Test Example

```typescript
import { render, waitFor } from '@testing-library/react'
import { HexGrid } from '../../src/components/HexGrid'
import { uiStore } from '../../src/stores/uiStore'

describe('HexGrid Integration', () => {
  it('integrates with uiStore', async () => {
    render(<HexGrid photos={mockPhotos} />)
    uiStore.toggleDebug()
    await waitFor(() => {
      // Verify debug panel appears
    })
  })
})
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test'

test('loads and displays canvas', async ({ page }) => {
  await page.goto('/')
  const canvas = page.locator('canvas')
  await expect(canvas).toBeVisible()
})
```

## Test Coverage

Current coverage requirements:
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

Generate coverage report:
```bash
npm run test:coverage
```

## CI/CD Integration

Tests run automatically on:
- Pull requests
- Commits to main branch
- Before releases

## Debugging Tests

### Jest Tests
```bash
npm test -- --watch          # Watch mode
npm test -- --verbose        # Verbose output
npm test -- --detectOpenHandles  # Find open handles
```

### Playwright Tests
```bash
npm run test:e2e -- --debug  # Debug mode
npm run test:e2e -- --headed # Show browser
```

## Best Practices

1. **Arrange-Act-Assert** - Structure tests clearly
2. **Test Behavior** - Not implementation details
3. **Mock External Dependencies** - Keep tests isolated
4. **Descriptive Names** - Make test purpose clear
5. **Keep Tests Fast** - Aim for <1s per test
6. **One Assertion** - Focus on single behavior
7. **Clean Up** - Reset state after each test

## Common Patterns

### Mocking Canvas
```typescript
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  // ...
}))
```

### Mocking Workers
```typescript
global.Worker = class Worker {
  postMessage(msg: any) {}
  terminate() {}
} as any
```

### Testing Async Operations
```typescript
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument()
})
```

## Troubleshooting

### Canvas Tests Failing
- Ensure canvas mock is set up in `tests/setup.ts`
- Check that getContext is properly mocked

### E2E Tests Timing Out
- Increase timeout in playwright.config.ts
- Add explicit waits for elements

### Coverage Not Meeting Threshold
- Add tests for uncovered branches
- Check coverage report in `coverage/lcov-report/index.html`
