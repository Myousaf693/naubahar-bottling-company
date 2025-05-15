import { IconType } from "react-icons";

export interface ConsumptionCardPropsType{
   period: string;
  icon: IconType;
  value: string;
  unit: string;
  updated: string;
  direction: string;
  percentage: string;
  iconcolor:string;
}

export type EnergyDetailType = {
  name: string;
  voltageValue: number;
  voltageUnit: string;
  currentValue: number;
  currentUnit: string;
  powerValue: number;
  powerUnit: string;
  icon:IconType;
};
