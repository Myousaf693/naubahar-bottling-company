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
export type PowerMonitoringData = {
  timestamp: string;
  V1: number;
  V2: number;
  V3: number;
  V12: number;
  V23: number;
  V31: number;
  I1: number;
  I2: number;
  I3: number;
  In: number;
  P1: number;
  P2: number;
  P3: number;
  P: number;
  Q1: number;
  Q2: number;
  Q3: number;
  Q: number;
  S1: number;
  S2: number;
  S3: number;
  S: number;
  PF1: number;
  PF2: number;
  PF3: number;
  PF: number;
  F: number;
  "Import Active Energy": number;
  "Export Active Energy": number;
  "Import Reactive Energy": number;
  "Export Reactive Energy": number;
  "Apparent Energy": number;
  "1st Quadrant Reactive Energy - EQL+": number;
  "2nd Quadrant Reactive Energy - EQC+": number;
  "3rd Quadrant Reactive Energy - EQL-": number;
  "4th Quadrant Reactive Energy - EQC-": number;
  "Fundamental Import Active Energy": number;
  "Fundamental Export Active Energy": number;
  "Fundamental Import Reactive Energy": number;
};
