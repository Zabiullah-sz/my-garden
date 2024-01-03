import { Variete } from "./Variete";
export interface Rang {
  id: number;
  estEnJachere: boolean;
  dateMiseEnJachere: string;
  longitude: number;
  latitude: number;
  varietePlante: Variete;
}
