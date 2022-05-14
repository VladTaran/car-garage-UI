import { Car } from '../cars/car.model';

export interface User{
  id:string;
  nickname:string;
  name:string;
  surname:string;
  email:string;
  phone:string;
  gender:GenderEnum;
  dateOfBirths: Date;
  addressInfo: Address;
  photoId:string;
  description:string;
  driverExperience:number;
}

export interface UserGarage{
  userData: User;
  cars:Car[]
}

export interface Address{
  country:string;
  city:string;
}

export enum GenderEnum{
  'male',
  'female',
}

