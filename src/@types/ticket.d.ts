export interface ITicket {
  id: number;
  title: string;
  description: string;
  status: string;
  created: Date;
}
export interface IList {
  id: number;
  list: string;
}
export type TicketContextType = {
  tickets: ITicket[];
  saveTicket: (ticket: ITicket) => void;
  updateStatusTicket: (id: number, status: string) => void;
  updateTicket: (ticket:ITicket) => void;
  list: IList[];
  loading: boolean;
  setupLoading: () => void;
  removeTicket: (id:number) => void;
};