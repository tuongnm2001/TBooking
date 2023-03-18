import Banner from "./ContentHompage/Banner";
import Doctor from "./ContentHompage/Doctor";


const HomePage = (props) => {
    return (
        <div className="homepage-container">
            <Banner />
            <Doctor />
            <div style={{ height: '300px' }}></div>
        </div>
    );
}

export default HomePage;