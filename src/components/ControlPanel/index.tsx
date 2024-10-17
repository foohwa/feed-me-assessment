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
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap gap-2">
        <button
          className="bg-yellow-500 px-3 py-2 text-black hover:bg-yellow-600"
          onClick={() => handleAddNewOrder('NORMAL')}
        >
          New Normal Order
        </button>
        <button
          className="bg-red-500  px-3 py-2 text-white hover:bg-red-600"
          onClick={() => handleAddNewOrder('VIP')}
        >
          New VIP Order
        </button>
        <button
          className="border-yellow-500 px-3 py-2 text-yellow-500 hover:bg-yellow-500 hover:text-black"
          onClick={() => handleIncreaseBot()}
        >
          + Bot
        </button>
        <button
          className="border-red-500 px-3 py-2 text-red-500 hover:bg-red-500 hover:text-white"
          onClick={() => handleDecreaseBot()}
        >
          - Bot
        </button>
      </div>
      <div className="text-lg font-semibold">
        Active Bots: <span className="text-red-600">{totalBots}</span>
      </div>
    </div>
  )
}
