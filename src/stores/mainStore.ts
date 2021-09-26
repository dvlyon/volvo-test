export const mainStore = {
  equipments: [],
  vehicles: [],
  favoriteEquipments: [],
  favoriteVehicles: [],
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
