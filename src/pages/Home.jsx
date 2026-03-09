import { Link } from "react-router-dom";
import ImportanceCards from "../components/ImportanceCard";

const Home = () => {
    return (
        <div>
            <div className="bg-white">
            <section className="h-[70vh] flex items-center justify-center bg-gradient-to-r from-red-600 to-red-800 text-white text-center px-4">
                <div className="max-w-3xl">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Donate Blood, Save Lives.</h1>
                    <p className="text-lg md:text-xl mb-8 opacity-90">
                        Every drop counts. Your small contribution can bring back a smile. Join our community of lifesavers today.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/register" className="bg-white text-red-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 shadow-lg transition">
                            Become a Donor
                        </Link>
                        <Link to="/request-blood" className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-red-600 shadow-lg transition">
                            Request Blood
                        </Link>
                    </div>
                </div>
            </section>
        </div>
        <ImportanceCards />
        </div>
    );
};

export default Home;