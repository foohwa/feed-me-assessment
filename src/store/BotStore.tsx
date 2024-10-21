import { StateCreator } from 'zustand/index'
import { OrderSlice } from './OrderStore'

export interface Bot {
  id: string
  currentOrderId?: string | null
}

export interface BotSlice {
  bots: Bot[]
  increaseBot: () => Bot
  decreaseBot: () => Bot | undefined
  assignOrderToBot: (orderId: string, botId?: string) => void
  removeOrderFromBot: (orderId: string, botId: string) => void
  totalIdleBots: () => number
  totalActiveBots: () => number
}

export const createBotSlice: StateCreator<
  OrderSlice & BotSlice,
  [],
  [],
  BotSlice
> = (set, get) => ({
  bots: [],
  increaseBot: () => {
    const newBot = createNewBot()
    set((state) => ({ bots: [...state.bots, newBot] }))
    return newBot
  },
  decreaseBot: () => {
    if (get().bots.length === 0) {
      console.warn('No bots exist')
      return
    }

    // Separate idle and active bots
    const idleBots = get().bots.filter((bot) => !bot.currentOrderId)
    const activeBots = get().bots.filter((bot) => bot.currentOrderId)

    if (idleBots.length > 0) {
      const botToRemove = idleBots[idleBots.length - 1]
      set((state) => ({
        bots: state.bots.filter((bot) => bot !== botToRemove) // remove idle bot
      }))
      return
    }

    const botToRemove = activeBots[activeBots.length - 1]
    if (!botToRemove) return // no active bots to remove
    set((state) => ({
      bots: state.bots.filter((bot) => bot !== botToRemove) // remove active bot
    }))

    return botToRemove
  },
  assignOrderToBot: (orderId: string, botId?: string) =>
    set((state) => {
      const availableBots = state.bots.filter((bot) => !bot.currentOrderId)

      if (!availableBots.length) {
        console.warn('No bots available')
        return {
          bots: state.bots
        }
      }

      const latestBot = botId
        ? availableBots.find((bot) => bot.id === botId)
        : availableBots[availableBots.length - 1]

      return {
        bots: state.bots.map((bot) =>
          bot.id === latestBot?.id
            ? {
                ...bot,
                currentOrderId: orderId
              }
            : bot
        )
      }
    }),
  removeOrderFromBot: (orderId: string, botId: string) =>
    set((state) => {
      const isBotExist = get().bots.some(
        (bot) => bot.id === botId && bot.currentOrderId === orderId
      )

      if (!isBotExist) {
        console.warn('No such bot')
        return {
          bots: state.bots
        }
      }

      return {
        bots: state.bots.map((bot) =>
          bot.id === botId
            ? {
                ...bot,
                currentOrderId: null
              }
            : bot
        )
      }
    }),
  totalIdleBots: () => {
    return get().bots.filter((bot) => !bot.currentOrderId).length
  },
  totalActiveBots: () => {
    return get().bots.filter((bot) => bot.currentOrderId).length
  }
})

const createNewBot = (): Bot => {
  return {
    id: crypto.randomUUID()
  }
}
