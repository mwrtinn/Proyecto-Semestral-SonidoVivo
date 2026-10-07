import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

function PlantillaPublica(props) {
  const clasesExtra = props.className || "";

  return (
    <div className={`d-flex flex-column min-vh-100 ${clasesExtra}`}>
      
      <Navbar />
      
      <main className="flex-grow-1">
        {props.children}
      </main>
      
      <Footer className="mt-auto" />
      
    </div>
  );
}

export default PlantillaPublica;