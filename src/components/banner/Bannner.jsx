import { Link } from "react-router-dom";


const Bannner = () => {
    return (
        <div>
            <div className="hero min-h-screen bg-blue-100">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src="https://i.ibb.co/jZdzMvg/2150710074.jpg" className="w-2/3 lg:w-full max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl font-bold">Stop Drowning in Deadlines</h1>
      <p className="py-6">Juggling work, school, and life? Our platform simplifies task management, giving you back precious time and peace of mind.</p>
      <button className="btn btn-primary bg-blue-900 border-none text-white"> <Link to='/dashboard'>Let's Explore</Link> </button>
    </div>
  </div>
</div>
        </div>
    );
};

export default Bannner;