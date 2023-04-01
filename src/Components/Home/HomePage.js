import Footer from "../Auth/Footer";
import Banner from "./ContentHompage/Banner";
import Clinic from "./ContentHompage/Clinic";
import Doctor from "./ContentHompage/Doctor";
import Specialty from "./ContentHompage/Specialty";


const HomePage = (props) => {
    return (
        <div className="homepage-container" >
            <Banner />
            <Specialty />
            <Doctor />
            <Clinic />
            <Footer />
        </div>
    );
}

export default HomePage;