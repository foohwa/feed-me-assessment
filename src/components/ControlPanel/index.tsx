import { usePosStore } from '../../store/PosStore'
import { OrderType } from '../../store/OrderStore'

export const ControlPanel = () => {
  const { handleNewOrder, handleBotIncrease, handleBotDecrease } = usePosStore()
  const totalBots = usePosStore((state) => state.totalBots())

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
            Increase 🤖
          </button>
          <button
            type="button"
            className="w-full rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => handleDecreaseBot()}
          >
            Decrease 🤖
          </button>
        </div>
      </div>

      <div className="text-end font-normal">
        Active Bots 🤖: <span className="text-gray-600">{totalBots}</span>
      </div>
    </>
  )
}
