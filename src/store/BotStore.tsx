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
  totalBots: () => number
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
    console.log([...get().bots])
    if (get().bots.length === 0) {
      console.warn('No bots exist')
      return
    }

    const idleBots = get().bots.filter((bot) => !bot.currentOrderId)
    const activeBots = get().bots.filter((bot) => bot.currentOrderId)

    if (idleBots.length > 0) {
      set((state) => ({ bots: state.bots.slice(1) }))
      return
    }

    const firstBot = activeBots.at(0)
    if (!firstBot) return
    set((state) => ({ bots: state.bots.slice(1) }))
    return firstBot
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

      console.log(latestBot)

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

      console.log(isBotExist)

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
  totalBots: () => {
    return get().bots.length
  }
})

const createNewBot = (): Bot => {
  return {
    id: crypto.randomUUID()
  }
}
