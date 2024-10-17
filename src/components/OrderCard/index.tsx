import { useState } from 'react'
import { OrderWithBot } from '../../store/SharedSlice'
import { CookingPot } from 'lucide-react'
import { OrderProgress } from '../../store/OrderStore'
import { classNames } from '../../utils'

const COOKING_TIME = 10000

type OrderCardProps = {
  order: OrderWithBot
  onClick: () => void
}

export const OrderCard = ({ order, onClick }: OrderCardProps) => {
  const [progress, setProgress] = useState(0)

  console.log('recreated')

  return (
    <>
      <div
        className="divide-y divide-gray-200 overflow-hidden rounded-md border border-gray-300 bg-white"
        onClick={onClick}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center justify-start gap-2">
            <div className="rounded-md border border-gray-300 p-2.5">
              <CookingPot className="stroke-gray-700" />
            </div>
            <span className="text-sm font-normal text-gray-700">
              # {order.id}
            </span>
            {order.type === 'VIP' ? (
              <span className="inline-flex items-center gap-x-1.5 rounded-md bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                <span>👑</span> {order.type}
              </span>
            ) : null}
          </div>
          <div>
            <ProgressBadge progress={order.progress} />
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
}

const ProgressBadge = ({ progress }: ProgressBadgeProps) => {
  switch (progress) {
    case 'PENDING':
      return (
        <span className="inline-flex items-center gap-x-0.5 rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          Pending
        </span>
      )
    case 'IN_PROGRESS':
      return (
        <span className="inline-flex items-center gap-x-0.5 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-blue-600/20">
          In Progress
        </span>
      )
    case 'COMPLETED':
      return (
        <span className="inline-flex items-center gap-x-0.5 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20">
          Completed
        </span>
      )
  }
}

type OrderProgressBarProps = {
  progress: OrderProgress
}

const OrderProgressBar = ({ progress }: OrderProgressBarProps) => {
  const progressBarWidth =
    progress === 'PENDING'
      ? '0%'
      : progress === 'IN_PROGRESS'
        ? '50%'
        : progress === 'COMPLETED'
          ? '0%'
          : '0%'

  return (
    <div>
      <h4 className="sr-only">Status</h4>
      {/*<p className="text-sm font-medium text-gray-900">*/}
      {/*  Migrating MySQL database...*/}
      {/*</p>*/}
      <div aria-hidden="true">
        <div className="overflow-hidden rounded-full bg-gray-200">
          <div
            style={{ width: progressBarWidth }}
            className="h-2 rounded-full bg-green-600 transition-all duration-500 ease-in-out"
          />
        </div>
        <div className="mt-6 hidden grid-cols-3 text-sm font-medium text-gray-600 sm:grid">
          <div
            className={
              progress === 'PENDING' || progress === 'IN_PROGRESS'
                ? 'text-green-600'
                : 'text-inherit'
            }
          >
            Order created
          </div>
          <div
            className={classNames(
              'text-center',
              progress === 'IN_PROGRESS' ? 'text-green-600' : 'text-inherit'
            )}
          >
            Preparing
          </div>
          <div
            className={classNames(
              'text-right',
              progress === 'COMPLETED' ? 'text-green-600' : 'text-inherit'
            )}
          >
            Completed
          </div>
        </div>
      </div>
    </div>
  )
}
