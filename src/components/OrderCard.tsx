import { OrderWithBot } from '../store/SharedSlice'
import { CookingPot } from 'lucide-react'
import { OrderProgress } from '../store/OrderStore'
import { classNames } from '../utils'

const COOKING_TIME = 10000

type OrderCardProps = {
  order: OrderWithBot
  onClick?: () => void
}

export const OrderCard = ({ order, onClick }: OrderCardProps) => {
  return (
    <>
      <div
        className="h-full divide-y divide-gray-200 overflow-hidden rounded-md border border-gray-300 bg-white"
        onClick={onClick}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center justify-start gap-2">
            <div className="rounded-md border border-gray-300 p-1.5 md:p-2.5">
              <CookingPot className="size-5 stroke-gray-700" />
            </div>
            <div className="flex flex-wrap gap-2 md:gap-1">
              <span className="text-sm font-normal text-gray-700">
                # {order.id}
              </span>
              {order.type === 'VIP' ? (
                <span className="inline-flex items-center gap-x-1.5 rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                  <span>👑</span> {order.type}
                </span>
              ) : null}
            </div>
          </div>
          <div>
            <ProgressBadge className="shrink-0" progress={order.progress} />
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <OrderProgressBar progress={order.progress} />
        </div>
      </div>
    </>
  )
}

type ProgressBadgeProps = {
  progress: OrderProgress
  className?: string
}

const badgeStyles = {
  PENDING: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
  IN_PROGRESS: 'bg-blue-50 text-blue-800 ring-blue-600/20',
  COMPLETED: 'bg-green-50 text-green-800 ring-green-600/20'
}

const ProgressBadge = ({ progress, className }: ProgressBadgeProps) => {
  const selectedBadgeStyle = badgeStyles[progress]
  const label = progress
    .replace('_', ' ')
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase())

  return (
    <span
      className={classNames(
        `inline-flex items-center gap-x-0.5 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset`,
        selectedBadgeStyle + ' ' + className
      )}
    >
      {label}
    </span>
  )
}

type OrderProgressBarProps = {
  progress: OrderProgress
}

const progressConfig: Record<OrderProgress, { width: string; text: string }> = {
  PENDING: { width: '0%', text: 'Waiting for Bot...' },
  IN_PROGRESS: { width: '50%', text: 'Preparing food...' },
  COMPLETED: { width: '100%', text: 'Order Complete!' }
}

const OrderProgressBar = ({ progress }: OrderProgressBarProps) => {
  const { width, text } = progressConfig[progress]

  const stages: OrderProgress[] = [
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED'
  ] as const

  const isActive = (stage: OrderProgress) => {
    return stages.indexOf(progress) >= stages.indexOf(stage)
  }

  return (
    <div>
      <h4 className="sr-only">Status</h4>
      <p className="mb-2 text-sm font-medium text-gray-900">{text}</p>
      <div aria-hidden="true">
        <div className="overflow-hidden rounded-full bg-gray-200">
          <div
            style={{ width: width }}
            className="h-2 rounded-full bg-green-600 transition-all duration-500 ease-in-out"
          />
        </div>
        <div className="mt-6 hidden text-sm font-medium text-gray-600 sm:flex sm:justify-between lg:hidden">
          {stages.map((stage) => (
            <div
              key={stage}
              className={classNames(isActive(stage) ? 'text-green-600' : '')}
            >
              {stage.toLowerCase().replace('_', ' ')}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
