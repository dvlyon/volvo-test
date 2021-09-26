export interface IVehicle {
  id: string
  name: string
  driver: string
  status: 'active' | 'inactive' | string
  fuelType: 'LNG' | 'Diesel' | 'CNG' | 'Electrical' | string
  equipments: number[]
}

export interface IEquipment {
  id: number
  name: string
}
