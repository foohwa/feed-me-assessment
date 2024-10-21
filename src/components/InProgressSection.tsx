import { useOrderManagementStore } from '../store/OrderManagementStore'
import { OrderWithBot } from '../store/SharedSlice'
import { OrderCard } from './OrderCard'
import { useEffect } from 'react'

export const InProgressSection = () => {
  const { orders, bots, handleCompleteOrder } = useOrderManagementStore()

  const inProgressOrders: OrderWithBot[] = orders
    .map((order) => {
      const bot = bots.find((bot) => bot.currentOrderId === order.id)
      return bot
        ? {
            ...order,
            botId: bot ? bot.id : undefined // Provide a default value if no bot is found
          }
        : order
    })
    .filter(
      (order) =>
        order.progress === 'PENDING' || order.progress === 'IN_PROGRESS'
    )

  useEffect(() => {
    let timeOut: NodeJS.Timeout | null = null

    if (inProgressOrders.length > 0) {
      const orderToProcess = inProgressOrders[0]
      timeOut = setTimeout(() => {
        if (orderToProcess.progress === 'PENDING') {
          return
        }

        handleCompleteOrder(orderToProcess.id, orderToProcess.botId!)
      }, 10000)
    }

    return () => {
      if (timeOut != null) {
        clearTimeout(timeOut)
      }
    }
  }, [inProgressOrders, handleCompleteOrder])

  return (
    <>
      <div className="rounded-md border border-gray-200 bg-white p-4">
        {!inProgressOrders.length ? (
          <div className=" text-black">No order in progress</div>
        ) : (
          <ul role="list" className="grid grid-cols-1 gap-x-4 gap-y-3">
            {inProgressOrders.map((order) => (
              <li key={order.id}>
                <OrderCard order={order} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
