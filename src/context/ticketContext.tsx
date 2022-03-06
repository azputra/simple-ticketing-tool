import {createContext, useState, FC, ReactNode} from 'react';
import { TicketContextType, ITicket, IList } from '../@types/ticket';

export const TicketContext = createContext<TicketContextType | null>(null);

const TicketProvider: FC<ReactNode> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [list] = useState<IList[]>([{id:1, list:'open'}, {id:2, list:'in progress'}, {id:3, list:'completed'}]);

  const [tickets, setTickets] = useState<ITicket[]>([
    {
      id:1,
      title: 'title',
      description: 'deskripsi',
      status: 'open',
      created: new Date()
    },
    {
      id:2,
      title: 'title2',
      description: 'deskripsi2',
      status: 'open',
      created: new Date()
    }
  ]);

  const setupLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }

  const saveTicket = (ticket: ITicket) => {
    let IdIncrement = 0;
    if (tickets.length !== 0) IdIncrement = tickets[tickets.length-1].id;
    const newTicket: ITicket = {
      id: IdIncrement+=1,
      title: ticket.title,
      description: ticket.description,
      status: !ticket.status?'open':ticket.status,
      created: new Date()
    };
    setTickets([...tickets, newTicket]);
  };

  const updateStatusTicket = (id: number, status: string) => {
    tickets.filter((ticket: ITicket) => {
      if (ticket.id === id) {
        ticket.status = status;
        console.log(tickets);
        setTickets([...tickets]);
      }
    });
  };

  const updateTicket = (updtTicket:ITicket) => {
    tickets.filter((ticket:ITicket)=>{
      if (ticket.id === Number(updtTicket.id)) {
        ticket.title = updtTicket.title;
        ticket.description = updtTicket.description;
        ticket.status = updtTicket.status;
        setTickets([...tickets]);
      }
    })
  };

  const removeTicket = (id:number) => { 
    const index = tickets.findIndex(key => key.id === id);
    tickets.splice(index,1);
    setTickets([...tickets])
  };

  return <TicketContext.Provider value={{ tickets, saveTicket, updateStatusTicket, updateTicket, list, loading, setupLoading, removeTicket }}>{children}</TicketContext.Provider>;
};

export default TicketProvider;