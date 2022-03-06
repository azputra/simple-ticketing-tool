import {FC} from 'react';

type Props = {
    deleteTicket:any;
  };

const DeleteTicket : FC<Props> = ({deleteTicket}) => {
  return (
    <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id='removeTicket'  aria-labelledby="removeTicketLabel" aria-hidden="true">
        <div className="modal-dialog relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <h5 className="text-xl font-medium leading-normal text-gray-800" id="removeTicketLabel">Delete Ticket</h5>
                <button type="button" className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                <div className="modal-body relative p-4">
                <div className='text-center font-semibold text-2xl text-red-700'>Are you sure?</div>
                <div className='text-center font-semibold text-1xl text-red-700'>You want to delete this!</div>
                <iframe title='warning' className='w-full' src="https://embed.lottiefiles.com/animation/8750"></iframe>
                </div>
                <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button type="button" className="px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">No</button>
                <button onClick={()=>deleteTicket()} type="submit" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1" data-bs-dismiss="modal">Yes, delete it!</button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default DeleteTicket;