import {FC} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import logo from '../assets/logo.png'

const Navbar : FC = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("user")
    }

    return (
        <nav style={{backgroundColor: '#65584e'}} className="fixed w-full z-10">
            <div className="mx-auto">
                <div style={{minHeight: "52px"}} className="flex justify-between items-center py-3 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1 px-6">
                        <img
                        onClick={()=>navigate('/')}
                        className="w-auto h-7 cursor-pointer"
                        src={logo}
                        alt=""
                        />
                    </div>
                    <div className="md:flex items-center justify-end md:flex-1 lg:w-0 px-6">
                        <div className="dropdown inline-block relative">
                            <button id="dropdownMenuButton2" data-bs-toggle="dropdown" className="dropdown-toggle whitespace-nowrap inline-flex items-center justify-center px-1 py-1 border-2 rounded-full shadow-sm text-base font-medium">
                                <img src="https://mdbootstrap.com/img/new/avatars/2.jpg" className="rounded-full"
                                style={{height: "25px", width: "25px"}} alt="" loading="lazy" />
                            </button>
                            <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 -ml-10" aria-labelledby="dropdownMenuButton2">
                                <li onClick={()=>logout()}><Link to="/login" className="rounded bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" >Logout</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;