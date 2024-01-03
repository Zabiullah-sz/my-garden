import { Rang } from "./Rang";
export interface Parcelle {
    longitude: number,
    latitude: number,
    dimensions: number,
    rangs:Rang[],
}