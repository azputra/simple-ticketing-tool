import {FC} from 'react';
import { ITicket } from '../@types/ticket';
import {useNavigate} from 'react-router-dom';
import { Draggable} from "react-beautiful-dnd";

type Props = {
  ticket: ITicket;
  updateStatusTicket: (id: number, status:string) => void;
};

const Ticket: FC<Props> = ({ ticket, updateStatusTicket }) => {
  const navigate = useNavigate()
  return (
    <Draggable draggableId={`${ticket.id}`} index={ticket.id}>
      {(provided:any, snapshot:any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="animate__animated animate__bounce rounded-md shadow-xl px-4 py-1 bg-white my-4">
            <h1 className='text-slate-800 break-words w-11/12'>{ticket.title}</h1>
            <div className='dropdown'>
              <button className='dropdown-toggle rounded-md bg-white mr-2 absolute top-3 right-0' onClick={()=>navigate(`/ticket/${ticket.id}`)}>
                <svg className='w-4 top-1/3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z"/></svg>
              </button>
              <ul className="dropdown-menu absolute hidden text-white pt-1 top-7 right-0">
                  <li><div className="rounded bg-slate-900 py-2 px-4 block whitespace-no-wrap" >Detail</div></li>
              </ul>
            </div>
            {
              ticket.status === 'open' ? 
              <div className='flex justify-between mt-2'>
                <button onClick={() => updateStatusTicket(ticket.id, 'in progress')} type="button" className="inline-block px-6 py-1 border-2 border-yellow-500 text-yellow-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">In Progress</button>
                <button onClick={() => updateStatusTicket(ticket.id, 'completed')} type="button" className="inline-block px-6 py-1 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Completed</button>
              </div>
              :
              ticket.status === 'in progress' ? 
              <div className='flex justify-between mt-2'>
                <button onClick={() => updateStatusTicket(ticket.id, 'open')} type="button" className="inline-block px-6 py-1 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Open</button>
                <button onClick={() => updateStatusTicket(ticket.id, 'completed')} type="button" className="inline-block px-6 py-1 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Completed</button>
              </div>
              :
              <button onClick={() => updateStatusTicket(ticket.id, 'open')} type="button" className="inline-block px-6 py-1 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mt-2">Open</button>
            }
        </div>
      </div>
      )}
    </Draggable>
  );
};
export default Ticket;