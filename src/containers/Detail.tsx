import {FC, useEffect, useState, useContext} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { TicketContextType, ITicket } from '../@types/ticket';
import { TicketContext } from '../context/ticketContext';

import EditTicket from '../components/EditTicket';
import DeleteTicket from '../components/DeleteTicket';

const Detail : FC = () => {
  const { tickets, removeTicket, setupLoading } = useContext(TicketContext) as TicketContextType;
  const params = useParams();
  const navigate = useNavigate();
  const [ticketDetail, setTicketDetail] = useState({
    id: '',
    title: '',
    description: '',
    status: '',
    date: '',
    timezone: ''
  })
  const [alertActive, setAlertActive] = useState('');

  const deleteTicket = () => {
    setupLoading()
    setTimeout(() => {
      removeTicket(Number(ticketDetail.id))
      navigate('/')
    }, 2000);
  }

  useEffect(() => {
    tickets.filter((ticket:ITicket)=>{
      if (ticket.id === Number(params.ticketid)) {
        const date = ticket.created.toLocaleDateString();
        const hours = ticket.created.getHours() <= 9 ? `0${ticket.created.getHours()}`:`${ticket.created.getHours()}`
        const minutes = ticket.created.getMinutes() <= 9 ? `0${ticket.created.getMinutes()}`:`${ticket.created.getMinutes()}`
        const seconds = ticket.created.getSeconds() <= 9 ? `0${ticket.created.getSeconds()}`:`${ticket.created.getSeconds()}`;
        setTicketDetail({
          id: String(ticket.id),
          title: ticket.title,
          description: ticket.description,
          status: ticket.status,
          date: date,
          timezone: `${hours}:${minutes}:${seconds}`
        })
      }
    })
  }, [tickets])
  
  return (
    <>
      <div className="flex justify-center pt-24 animate__animated animate__pulse">
        {
          alertActive === 'competed to progress' ?
          <div className="bg-red-100 rounded-lg animate__animated animate__tada py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-1/3 z-10 absolute justify-center" role="alert">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
            </svg>
            Can't Update Status From Completed To In Progress 
          </div> : 
          alertActive === 'success' ? 
          <div className="bg-green-100 rounded-lg py-5 px-6 mb-3 text-base text-green-700 inline-flex items-center animate__animated animate__tada w-1/3 z-10 justify-center absolute" role="alert">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
            </svg>
            Successfully Updated Ticket Detail
          </div>
          : ''
        }
        <div className="block rounded-lg shadow-lg bg-white max-w-sm min-w-px350 text-center w-1/3 opacity-90">
          <div className="py-3 px-6 border-b border-gray-300 relative">
            <Link to="/">
              <svg className='h-4 absolute top-4 left-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"/></svg>
            </Link>
            <p className='uppercase'>Ticket Detail</p>
            <button type="button" className="absolute right-14 top-2 inline-block px-3 py-2 bg-white-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-300 hover:shadow-lg focus:bg-white-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-white-800 active:shadow-lg transition duration-150 ease-in-out" data-tooltip-target="tooltipDelete" data-bs-toggle="modal" data-bs-target="#removeTicket">
              <svg className='w-4 top-1/3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>
            </button>
            <div id="tooltipDelete" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                Delete Ticket
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            <button type="button" className="absolute right-1 top-2 inline-block px-3 py-2 bg-white-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-300 hover:shadow-lg focus:bg-white-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-white-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#editTicket" data-tooltip-target="tooltipEdit">
              <svg className='w-4 top-1/3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"/></svg>
            </button>
            <div id="tooltipEdit" role="tooltip" className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
                Edit Ticket
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
          <div className="p-6 animate__animated animate__fadeInLeft">
            <h5 className="text-gray-900 text-xl font-medium mb-2 uppercase break-words">{ticketDetail.title}</h5>
            <p className="text-gray-700 text-base mb-2 break-words">
              {ticketDetail.description}
            </p>
            <div className="flex space-x-2 justify-center">
              {
                ticketDetail.status.toLowerCase() === 'open'? 
                <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded-full">Open</span>
                :
                ticketDetail.status.toLowerCase() === 'in progress'?
                <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-yellow-500 text-white rounded-full">In Progress</span>
                :
                <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded-full">Completed</span>
              }
            </div>
          </div>
          <div className="py-3 px-6 border-t border-gray-300 text-gray-600 animate__animated animate__fadeInRight">
            {`${ticketDetail.date} - ${ticketDetail.timezone}`}
          </div>
        </div>
      </div>
      <EditTicket ticketDetail={ticketDetail} setAlertActive={setAlertActive}/>
      <DeleteTicket deleteTicket={deleteTicket}/>
    </>
  );
}

export default Detail;