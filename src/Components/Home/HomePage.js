import Banner from "./ContentHompage/Banner";
import Doctor from "./ContentHompage/Doctor";
import Specialty from "./ContentHompage/Specialty";


const HomePage = (props) => {
    return (
        <div className="homepage-container" >
            <Banner />
            <Specialty />
            <Doctor />
            <div style={{ height: '300px' }}></div>
        </div>
    );
}

export default HomePage;