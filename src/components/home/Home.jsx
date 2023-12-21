import Navbar from "../Navbar";
import Testimonials from "../Testimonials/Testimonials";
import Bannner from "../banner/Bannner";
import Footer from "../footer/Footer";


const Home = () => {
    return (
        <div>
           <Navbar></Navbar> 
           <Bannner></Bannner>
           <Testimonials></Testimonials>
           <Footer></Footer>
        </div>
    );
};

export default Home;