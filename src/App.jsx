import {Outlet, Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import SettingsNavbar from "./pages/MyPage/SettingsNavbar.jsx";
import Logout from "./components/LogOut/Logout.jsx";

function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            const dropdown = dropdownRef.current;
            const rect = dropdown.getBoundingClientRect();

            // Adjust position if it overflows the viewport
            if (rect.right > window.innerWidth) {
                dropdown.style.left = `${window.innerWidth - rect.width}px`;
            } else if (rect.left < 0) {
                dropdown.style.left = "0px";
            }

            if (rect.bottom > window.innerHeight) {
                dropdown.style.top = `${window.innerHeight - rect.height}px`;
            } else {
                dropdown.style.top = "calc(100% + 20px)";
            }
        }
    }, [isOpen]);

    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown navbar-item" onClick={handleDropdownClick}>
            <span className="dropdown-toggle" aria-haspopup="true" aria-expanded={isOpen}>
                User
            </span>
            {isOpen && (
                <div
                    ref={dropdownRef}
                    id="dropdown-user-menu"
                >
                    <SettingsNavbar />
                </div>
            )}
        </div>
    );
}


function LoginSignup() {
  if (localStorage.getItem("jwt") === null) {
    return <div className="navbar">
      <Link className="navbar-item" to="/login">Login</Link>
      <Link className="navbar-item" to="/signup">Sign up</Link>
    </div>
  }
  else {
    return <div className="navbar">
      <UserDropdown />
    </div>
  }

}

//TODO: DO THIS https://www.youtube.com/watch?v=oTIJunBa6MA&t=1334s
function App() {
  return (
    <>
       <header>
           <div id="title">
             <Link to="/">
               <img id="logo" src="src/static/svg/roulette.png" alt="Logo of the company" />
             </Link>
           </div>
           <div className="navbar">
             <Link className="navbar-item" to="/">Home</Link>
             <Link className="navbar-item" to="/cars">Cars</Link>
             <Link className="navbar-item" to="/about">About</Link>
           </div>
           <LoginSignup/>
       </header>
       <main>
           <Outlet/>
       </main>
      <footer>
        <div id="footer-content">
          <div className="row">
            <h3 id="contactHeading">Contact Us</h3>
            <Link to="mailto:clarkson@rentalroulette.fr">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="footer-icon">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </Link>
            <Link to="tel:12345678">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="footer-icon">
               <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
             </svg>
            </Link>
          </div>
        </div>
          <div className="row" id="disclaimer">
            <p>This website is a result of a university group project, performed in the course IDATA2301 Web technologies, at NTNU. All the information provided here is a result of imagination. Any resemblance with real companies or products is a coincidence.</p>
          </div>
      </footer>
    </>
  )
}

export default App
