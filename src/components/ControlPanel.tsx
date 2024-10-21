import { useOrderManagementStore } from '../store/OrderManagementStore'
import { OrderType } from '../store/OrderStore'

export const ControlPanel = () => {
  const { handleNewOrder, handleBotIncrease, handleBotDecrease } =
    useOrderManagementStore()
  const totalIdleBots = useOrderManagementStore((state) =>
    state.totalIdleBots()
  )
  const totalActiveBots = useOrderManagementStore((state) =>
    state.totalActiveBots()
  )

  const handleAddNewOrder = (type: OrderType) => {
    handleNewOrder(type)
  }

  const handleIncreaseBot = () => {
    handleBotIncrease()
  }

  const handleDecreaseBot = () => {
    handleBotDecrease()
  }

  return (
    <>
      <div className="my-4 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="grid w-full grid-cols-2 grid-rows-2 gap-2 md:grid-cols-4 md:grid-rows-1">
          <button
            type="button"
            className="w-full rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => handleAddNewOrder('NORMAL')}
          >
            New Normal Order
          </button>
          <button
            type="button"
            className="w-full rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => handleAddNewOrder('VIP')}
          >
            New VIP Order 👑
          </button>
          <button
            type="button"
            className="w-full rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => handleIncreaseBot()}
          >
            Increase Bot 🤖
          </button>
          <button
            type="button"
            className="w-full rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => handleDecreaseBot()}
          >
            Decrease Bot 🤖
          </button>
        </div>
      </div>

      <div className="my-5 flex flex-row justify-end gap-2">
        <div className="size-full overflow-hidden rounded-md border bg-white px-3 py-1 md:w-40 md:p-3">
          <dt className=" truncate text-sm font-medium text-gray-500">
            Active Bots 🟢
          </dt>
          <dd className="mt-1 font-semibold tracking-tight text-gray-900 md:text-3xl">
            🤖 {totalActiveBots}
          </dd>
        </div>
        <div className="size-full overflow-hidden rounded-md border bg-stone-100 px-3 py-1 md:w-40 md:p-3">
          <dt className="truncate text-sm font-medium text-gray-500">
            Idle Bots 💤
          </dt>
          <dd className="mt-1 font-semibold tracking-tight text-gray-900 md:text-3xl">
            🤖 {totalIdleBots}
          </dd>
        </div>
      </div>
    </>
  )
}
