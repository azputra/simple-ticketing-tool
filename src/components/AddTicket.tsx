import {FC, useContext, useState, FormEvent} from 'react';
import { TicketContext } from '../context/ticketContext';
import { TicketContextType, ITicket } from '../@types/ticket';

import Form from './Form';

const AddTikcet : FC = () => {
  const { saveTicket, setupLoading, setupAlert } = useContext(TicketContext) as TicketContextType;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open'
  });

  const handleForm = (e:any): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSaveTikcet = (e: FormEvent, formData: ITicket | any) => {
    e.preventDefault();
    setupLoading()
    setTimeout(() => {
      if (formData.title !== '') saveTicket(formData);
      else setupAlert('Please input Title');
    }, 2000);
    resetForm()
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      status: 'open'
    })
  }
  return (
    <>
      <button type="button" className="whitespace-nowrap inline-flex items-center justify-center px-4 py-1 border-2 rounded-full shadow-sm text-base font-medium bg-white hover:bg-slate-300 absolute top-2 left-4 transition duration-150 ease-in-out z-20" data-bs-toggle="modal" data-bs-target="#addTicket">
        Add Ticket
      </button>

      <Form idForm={'addTicket'} resetForm={resetForm} handleTikcet={handleSaveTikcet} formData={formData} handleForm={handleForm} nameForm={'Form Add Ticket'}/>
    </>
  );
}

export default AddTikcet;