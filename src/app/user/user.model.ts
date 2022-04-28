import { Car } from '../cars/car.model';

export interface User{
  id:string;
  username:string;
  email:string;
  cars:Car[]
}
