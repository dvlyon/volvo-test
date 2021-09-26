export const mainStore = {
  equipments: [],
  vehicles: [],
}

export const updateMainStore = (state: any, payload: any) => {
  return {
    ...state,
    mainStore: {
      ...state.mainStore,
      ...payload,
    },
  }
}
