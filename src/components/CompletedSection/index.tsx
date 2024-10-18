import { usePosStore } from '../../store/PosStore'
import { OrderCard } from '../OrderCard'

export const CompletedSection = () => {
  const { orders } = usePosStore()

  return (
    <>
      <div className="rounded-md border border-gray-200 bg-white">
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-4 gap-y-3 p-4 lg:grid-cols-2"
        >
          {orders
            .filter((order) => order.progress === 'COMPLETED')
            .sort((firstOrder, secondOrder) => {
              const firstCompleted = new Date(firstOrder.completedAt!)
              const secondCompleted = new Date(secondOrder.completedAt!)
              return Number(secondCompleted) - Number(firstCompleted)
            })
            .map((order) => (
              <li key={order.id}>
                <OrderCard order={order} />
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}
