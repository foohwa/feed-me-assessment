import { useOrderManagementStore } from '../store/OrderManagementStore'
import { OrderCard } from './OrderCard'

export const CompletedSection = () => {
  const { orders } = useOrderManagementStore()

  const completedOrders = orders
    .filter((order) => order.progress === 'COMPLETED')
    .sort((firstOrder, secondOrder) => {
      const firstCompleted = new Date(firstOrder.completedAt!)
      const secondCompleted = new Date(secondOrder.completedAt!)
      return Number(secondCompleted) - Number(firstCompleted)
    })

  return (
    <>
      <div className="rounded-md border border-gray-200 bg-white p-4">
        {!completedOrders.length ? (
          <div className=" text-black">No completed order yet</div>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 gap-x-4 gap-y-3  lg:grid-cols-2"
          >
            {completedOrders.map((order) => (
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
