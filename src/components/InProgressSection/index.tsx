import { usePosStore } from '../../store/PosStore'
import { OrderWithBot } from '../../store/SharedSlice'
import { OrderCard } from '../OrderCard'

export const InProgressSection = () => {
  const { orders, bots, handleCompleteOrder } = usePosStore()
  // const order = usePosStore((state) => state.allOrders())

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
  // .sort((firstOrder, secondOrder) => {
  //   return secondOrder.progress === 'IN_PROGRESS' ? 1 : -1
  // })

  const onOrderComplete = (order: OrderWithBot) => {
    if (order.progress === 'PENDING') {
      return
    }

    handleCompleteOrder(order.id, order.botId!)
  }

  return (
    <>
      <div className="rounded-md border border-gray-200 bg-white p-4">
        {!inProgressOrders.length ? (
          <div className=" text-black">No order in progress</div>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-4 gap-y-3  lg:grid-cols-2"
          >
            {inProgressOrders.map((order) => (
              <li key={order.id}>
                <OrderCard
                  order={order}
                  onClick={() => onOrderComplete(order)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
