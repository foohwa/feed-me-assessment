import { create } from 'zustand/react'
import { createOrderSlice, OrderSlice } from './OrderStore'
import { BotSlice, createBotSlice } from './BotStore'
import { createSharedSlice, SharedSlice } from './SharedSlice'

export const useOrderManagementStore = create<
  OrderSlice & BotSlice & SharedSlice
>()((...a) => ({
  ...createOrderSlice(...a),
  ...createBotSlice(...a),
  ...createSharedSlice(...a)
}))
