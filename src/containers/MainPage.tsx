import {FC, useContext} from 'react';
import { TicketContextType, ITicket, IList } from '../@types/ticket';
import { TicketContext } from '../context/ticketContext';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Ticket from '../components/Ticket';
import AddTikcet from '../components/AddTicket';

const Tickets : FC = () => {
  const { tickets, updateStatusTicket, list, loading } = useContext(TicketContext) as TicketContextType;

  const onDragEnd = (e:any) => {
    if (e.source.droppableId === '1' || e.source.droppableId === '2') {
      if (e.destination.droppableId === '1') {
        updateStatusTicket(Number(e.draggableId), 'open')
      } else if (e.destination.droppableId === '2'){
        updateStatusTicket(Number(e.draggableId), 'in progress')
      } else {
        updateStatusTicket(Number(e.draggableId), 'completed')
      }
    } else {
      if (e.destination.droppableId === '1') {
        updateStatusTicket(Number(e.draggableId), 'open')
      } else if (e.destination.droppableId === '3'){
        updateStatusTicket(Number(e.draggableId), 'completed')
      }
    }
  };

  return (
    <>
      <AddTikcet/>
      {
        loading? 
        <div className="flex justify-center items-center spinner-loading transition duration-150 ease-in-out focus:bg-white-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-white-800 active:shadow-lg">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div> : ''
      }
      <div className='container h-full content-container px-4'>
        <div className='w-full overflow-x-auto flex flex-1 h-full'>
          <DragDropContext onDragEnd={onDragEnd}>
          {
            list.map((list:IList, i)=>
              (
                  <Droppable droppableId={`${list.id}`}>
                      {({ droppableProps, innerRef, placeholder }) => (
                        <div key={i} className='list-status w-full min-w-px350' ref={innerRef} {...droppableProps}>
                          {console.log(list.id)}
                          <div className='px-5 bg-slate-100 h-full overflow-y-auto max-h-full rounded-lg min-h-0 min-h-70' >
                            <p className='text-lg sticky top-0 bg-slate-100 pt-3 uppercase font-semibold'>{list.list}</p>
                            {tickets.map((ticket: ITicket, j) => (
                              <>
                              {
                                ticket.status === list.list ? 
                                <Ticket key={j} updateStatusTicket={updateStatusTicket} ticket={ticket} />
                                : 
                                ''
                              }
                              </>
                            ))}
                            </div>
                        </div>
                      )}
                  </Droppable>
              )
              )
            }
            </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default Tickets;