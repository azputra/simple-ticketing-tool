import {FC, useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import { TicketContextType } from '../@types/ticket';
import { TicketContext } from '../context/ticketContext';

const Login : FC = () => {
    const { setupLoading } = useContext(TicketContext) as TicketContextType;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(true);
    const [alertMessage, setAllertMEssage] = useState("");
    const [alert, setAlert] = useState(false);
    const navigate = useNavigate();
    
    const submitForm = (e:any) =>{
        e.preventDefault();
        setupLoading()
        if (email === "test@vroom.com.au" && password === "frontendtest2022") {
          localStorage.setItem('user', JSON.stringify(email))
          navigate('/');
        } else {
            setAlert(true);
            if (email === "") {
              setAllertMEssage("Please Input Email");
            } else if (password === "") {
              setAllertMEssage("Please Input Password");
            } else {
              setAllertMEssage("Email or Password Wrong");
            }
            setTimeout(() => {
                setAlert(false);
            }, 2000);
        }
    }

  return (
      <div className='flex items-center justify-center p-3'>
        {
            alert ? 
            <div className="bg-red-100 top-10 rounded-lg animate__animated animate__tada py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center z-10 absolute justify-center" role="alert">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
            </svg>
            {alertMessage}
          </div>
          : ''
        }
        <div className='w-full max-w-lg px-10 py-8 mx-auto my-32 bg-white rounded-lg shadow-xl'>
          <div className='max-w-md mx-auto space-y-6'>
            <form onSubmit={e=>submitForm(e)}>
              <h2 className="text-2xl font-bold ">Login</h2>
              <hr className="my-6"/>
              <label className="uppercase text-sm font-bold opacity-70">Email</label>
              <input onChange={e=>setEmail(e.target.value)} type="email" className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"/>
              <label className="uppercase text-sm font-bold opacity-70">Password</label>
              <div className='relative flex'>
                <input onChange={e=>setPassword(e.target.value)} type={show?"password":"text"} className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded"/>
                {
                    show ?
                    <svg onClick={()=>setShow(!show)} className='absolute right-2 cursor-pointer w-5 top-1/3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z"/></svg>
                    :
                    <svg onClick={()=>setShow(!show)} className='absolute right-2 cursor-pointer w-5 top-1/3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"/></svg>
                }
              </div>
              <input type="submit" className="mt-3 text-lg font-semibold bg-gray-800 w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black cursor-pointer" value="Login"/>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Login;