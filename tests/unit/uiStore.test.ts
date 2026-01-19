import { uiStore } from '../../src/stores/uiStore'

describe('uiStore', () => {
  beforeEach(() => {
    // Reset store to initial state
    uiStore.set({
      debugOpen: false,
      showStats: false,
      cameraOpen: false,
      showNarration: false,
    })
  })

  it('initializes with default state', () => {
    const unsubscribe = uiStore.subscribe((state) => {
      expect(state.debugOpen).toBe(false)
      expect(state.showStats).toBe(false)
      expect(state.cameraOpen).toBe(false)
      expect(state.showNarration).toBe(false)
    })
    unsubscribe()
  })

  it('toggles debug state', () => {
    let currentState: any = null
    const unsubscribe = uiStore.subscribe((state) => {
      currentState = state
    })

    uiStore.toggleDebug()
    expect(currentState?.debugOpen).toBe(true)

    uiStore.toggleDebug()
    expect(currentState?.debugOpen).toBe(false)

    unsubscribe()
  })

  it('toggles stats state', () => {
    let currentState: any = null
    const unsubscribe = uiStore.subscribe((state) => {
      currentState = state
    })

    uiStore.toggleStats()
    expect(currentState?.showStats).toBe(true)

    uiStore.toggleStats()
    expect(currentState?.showStats).toBe(false)

    unsubscribe()
  })

  it('toggles camera state', () => {
    let currentState: any = null
    const unsubscribe = uiStore.subscribe((state) => {
      currentState = state
    })

    uiStore.toggleCamera()
    expect(currentState?.cameraOpen).toBe(true)

    uiStore.toggleCamera()
    expect(currentState?.cameraOpen).toBe(false)

    unsubscribe()
  })

  it('toggles narration state', () => {
    let currentState: any = null
    const unsubscribe = uiStore.subscribe((state) => {
      currentState = state
    })

    uiStore.toggleNarration()
    expect(currentState?.showNarration).toBe(true)

    uiStore.toggleNarration()
    expect(currentState?.showNarration).toBe(false)

    unsubscribe()
  })

  it('updates multiple state values at once', () => {
    let currentState: any = null
    const unsubscribe = uiStore.subscribe((state) => {
      currentState = state
    })

    uiStore.set({
      debugOpen: true,
      showStats: true,
    })

    expect(currentState?.debugOpen).toBe(true)
    expect(currentState?.showStats).toBe(true)
    expect(currentState?.cameraOpen).toBe(false)
    expect(currentState?.showNarration).toBe(false)

    unsubscribe()
  })

  it('notifies all subscribers', () => {
    const subscriber1 = jest.fn()
    const subscriber2 = jest.fn()

    const unsubscribe1 = uiStore.subscribe(subscriber1)
    const unsubscribe2 = uiStore.subscribe(subscriber2)

    // Initial call on subscribe
    expect(subscriber1).toHaveBeenCalledTimes(1)
    expect(subscriber2).toHaveBeenCalledTimes(1)

    uiStore.toggleDebug()

    expect(subscriber1).toHaveBeenCalledTimes(2)
    expect(subscriber2).toHaveBeenCalledTimes(2)

    unsubscribe1()
    unsubscribe2()
  })

  it('removes subscriber after unsubscribe', () => {
    const subscriber = jest.fn()
    const unsubscribe = uiStore.subscribe(subscriber)

    expect(subscriber).toHaveBeenCalledTimes(1)

    unsubscribe()
    uiStore.toggleDebug()

    // Should still be 1 (only initial call)
    expect(subscriber).toHaveBeenCalledTimes(1)
  })
})
