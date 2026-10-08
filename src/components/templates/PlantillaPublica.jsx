import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import { useNavigate } from 'react-router-dom';

function PlantillaPublica(props) {
  const clasesExtra = props.className || "";
  const navigate = useNavigate();

  return (
    <div className={`d-flex flex-column min-vh-100 ${clasesExtra}`}>
      <Navbar onNavegar={navigate} />
      <main className="flex-grow-1">
        {props.children}
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}

export default PlantillaPublica;