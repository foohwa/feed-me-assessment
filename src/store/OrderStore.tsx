import { formatISO } from 'date-fns'
import { StateCreator } from 'zustand'
import { BotSlice } from './BotStore'

export type ISODateTime = string

export type OrderType = 'VIP' | 'NORMAL'

export type OrderProgress = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'

export interface Order {
  id: string
  type: OrderType
  progress: OrderProgress
  completedAt?: ISODateTime
  startedAt?: ISODateTime
}

export interface OrderSlice {
  orders: Order[]
  addOrder: (type: OrderType) => Order
  startOrder: (orderId: string) => void
  restoreOrder: (orderId: string) => void
  completeOrder: (orderId: string) => void
}

export const createOrderSlice: StateCreator<
  OrderSlice & BotSlice,
  [],
  [],
  OrderSlice
> = (set, get) => ({
  orders: [],
  addOrder: (type: OrderType) => {
    const newOrder: Order = createNewOrder(type, get().orders.length)

    set((state) => {
      const updatedOrders = [...state.orders]

      if (newOrder.type === 'NORMAL') {
        updatedOrders.push(newOrder)

        return {
          orders: updatedOrders
        }
      }

      const lastVIPOrderIndex = updatedOrders.findLastIndex(
        (order) => order.type === 'VIP'
      )

      if (lastVIPOrderIndex >= 0) {
        updatedOrders.splice(lastVIPOrderIndex + 1, 0, newOrder)
      } else {
        updatedOrders.unshift(newOrder)
      }

      return {
        orders: updatedOrders
      }
    })

    return newOrder
  },
  startOrder: (orderId: string) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              progress: 'IN_PROGRESS',
              startedAt: formatISO(new Date())
            }
          : order
      )
    }))
  },
  restoreOrder: (orderId: string) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              progress: 'PENDING',
              startedAt: undefined
            }
          : order
      )
    }))
  },
  completeOrder: (orderId: string) => {
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              progress: 'COMPLETED',
              completedAt: formatISO(new Date())
            }
          : order
      )
    }))
  }
})

const createNewOrder = (type: OrderType, length: number = 0): Order => {
  const prefix = 'ORD'
  const randomNum = length.toString().padStart(4, '0')
  const orderId = `${prefix}-${randomNum}`

  return {
    id: orderId,
    type: type,
    progress: 'PENDING'
  }
}
