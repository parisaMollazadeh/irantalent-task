export interface ICoin {
  id: string;
  name: string;
  is_active?: boolean;
  is_new?: boolean;
  rank?: number;
  symbol?: string;
  type?: string;
}
