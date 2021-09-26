export const uiStore = {
  error: false,
}

export const updateUiStore = (state: any, payload: any) => {
  return {
    ...state,
    uiStore: {
      ...state.uiStore,
      ...payload,
    },
  }
}
