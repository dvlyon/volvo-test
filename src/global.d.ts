import "little-state-machine"

import { IVehicle, IEquipment } from './types/types'

declare module "little-state-machine" {
  interface GlobalState {
    mainStore: {
      equipments: IEquipment[],
      vehicles: IVehicle[],
    }
  }
}
