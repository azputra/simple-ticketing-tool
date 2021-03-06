import {FC, useContext, useState, FormEvent, useEffect} from 'react';
import { TicketContext } from '../context/ticketContext';
import { TicketContextType, ITicket } from '../@types/ticket';

import Form from './Form';

type Props = {
    ticketDetail:any;
    setAlertActive:any;
  };

const EditTicket : FC<Props> = ({ticketDetail, setAlertActive}) => {
  const { updateTicket, setupLoading } = useContext(TicketContext) as TicketContextType;
  const [formData, setFormData] = useState({
    id: ticketDetail.id,
    title: ticketDetail.title,
    description: ticketDetail.description,
    status: ticketDetail.status
  });

  const handleForm = (e:any): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleEditTikcet = (e: FormEvent, formData: ITicket | any) => {
    e.preventDefault();
    setupLoading()
    setTimeout(() => {
      if (ticketDetail.status === 'completed' && formData.status === 'in progress') {
          setAlertActive('competed to progress')
      } else {
          if (formData.title !== '') updateTicket(formData);
          setAlertActive('success')
      }
    }, 2000);
    resetForm()
  };

  const resetForm = () => {
    setFormData({
        id: ticketDetail.id,
        title: ticketDetail.title,
        description: ticketDetail.description,
        status: ticketDetail.status
    })
  }

  useEffect(()=>{
    setFormData({
        id: ticketDetail.id,
        title: ticketDetail.title,
        description: ticketDetail.description,
        status: ticketDetail.status
    })
  },[ticketDetail])
  return (
    <>
      <Form idForm={'editTicket'} resetForm={resetForm} handleTikcet={handleEditTikcet} formData={formData} handleForm={handleForm} nameForm={'Form Edit Ticket'}/>
    </>
  );
}

export default EditTicket;