import { Semencier } from "./Semencier";
import { Sol } from "./sol";
export interface Variete {
  id:number;
  nom: string;
  anneeMiseEnMarche: string;
  semis: string;
  plantation: string;
  entretien: string;
  recolte: string;
  periodeMiseEnPlace: string;
  periodeRecolte: string;
  commentaireGeneral: string;
  semencier: Semencier;
  estBiologique: boolean;
  solsAdaptes: Sol[];
}
