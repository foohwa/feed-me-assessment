import { BotSlice } from './BotStore'
import { Order, OrderSlice, OrderType } from './OrderStore'
import { StateCreator } from 'zustand'

export type OrderWithBot = Order & { botId?: string }

export interface SharedSlice {
  handleNewOrder: (type: OrderType) => void
  handleCompleteOrder: (orderId: string, botId: string) => void
  handleBotIncrease: () => void
  handleBotDecrease: () => void
}

export const createSharedSlice: StateCreator<
  OrderSlice & BotSlice,
  [],
  [],
  SharedSlice
> = (set, get) => ({
  handleNewOrder: (type: OrderType) => {
    const newOrder = get().addOrder(type)
    console.log(newOrder)

    const availableBots = get().bots.filter((bot) => !bot.currentOrderId)

    if (availableBots.length) {
      get().startOrder(newOrder.id)
      get().assignOrderToBot(newOrder.id)
    }
  },
  handleCompleteOrder: (orderId: string, botId: string) => {
    get().removeOrderFromBot(orderId, botId)
    get().completeOrder(orderId)

    const orders = get().orders

    const pendingOrders = orders.filter((order) => order.progress === 'PENDING')

    if (pendingOrders.length) {
      const firstPendingOrder = pendingOrders[0]

      get().startOrder(firstPendingOrder.id)
      get().assignOrderToBot(firstPendingOrder.id)
    }
  },
  handleBotIncrease: () => {
    const newBot = get().increaseBot()
    const orders = get().orders

    const pendingOrders = orders.filter((order) => order.progress === 'PENDING')

    if (pendingOrders.length) {
      const prioritizeOrder = pendingOrders.findIndex(
        (order) => order.type === 'VIP'
      )

      const firstPendingOrder =
        prioritizeOrder !== -1
          ? pendingOrders[prioritizeOrder]
          : pendingOrders[0]

      get().startOrder(firstPendingOrder.id)
      get().assignOrderToBot(firstPendingOrder.id, newBot.id)
    }
  },
  handleBotDecrease: () => {
    get().decreaseBot()

    // do we wait until the bot finish the order only then we remove it
    // or we immediately stop the progress and set back to pending

    // when decrease bot, we must start from normal instead of VIP (unfair world)
  }
})
