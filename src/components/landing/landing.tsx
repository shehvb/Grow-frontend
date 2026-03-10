import Navbar from "../Navbar";
import Features from "./features";
import Hero from "./hero";

const LandingPage = () => {
return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800"> {/* Light base for contrast, can switch to dark */}
    <Navbar/>
    <Hero/>
    <Features/>


    {/* How It Works */}
    <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
            <h3 className="mt-4 text-xl font-semibold">Sign Up & Connect</h3>
            <p className="mt-2 text-gray-600">Students and parents create accounts and link profiles.</p>
            </div>
            <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
            <h3 className="mt-4 text-xl font-semibold">Learn & Track</h3>
            <p className="mt-2 text-gray-600">Access materials, take quizzes, view analytics.</p>
            </div>
            <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
            <h3 className="mt-4 text-xl font-semibold">Engage & Improve</h3>
            <p className="mt-2 text-gray-600">Use AI, earn rewards, get insights.</p>
            </div>
        </div>
        </div>
    </section>

    {/* Dual Value Section */}
    <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* For Students */}
        <div id="for-students" className="p-8 bg-blue-600 text-white rounded-lg flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
            <h3 className="text-2xl font-bold">For Students</h3>
            <p className="mt-4">Interactive learning hub with gamified quizzes, AI assistance, and rewards.</p>
            </div>
            <img src="/assets/student-illustration.png" alt="Student Illustration" className="md:w-1/2 mt-4 md:mt-0" /> {/* Replace path */}
        </div>
        {/* For Parents */}
        <div id="for-parents" className="p-8 bg-orange-500 text-white rounded-lg flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
            <h3 className="text-2xl font-bold">For Parents</h3>
            <p className="mt-4">Dashboard for real-time tracking, analytics, and actionable insights.</p>
            </div>
            <img src="/assets/parent-illustration.png" alt="Parent Illustration" className="md:w-1/2 mt-4 md:mt-0" /> {/* Replace path */}
        </div>
        </div>
    </section>

    {/* CTA Banner */}
    <section className="py-16 bg-navy-900 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Education Journey?</h2>
        <button className="px-8 py-3 bg-orange-500 rounded-md hover:bg-orange-600 transition">Create Account</button>
        </div>
    </section>

    {/* Footer */}
    <footer className="py-8 bg-gray-800 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
            <img src="/assets/grow-logo.svg" alt="GROW Logo" className="h-8" />
            <p className="mt-2">The Future of Personalized Education.</p>
            {/* Social icons */}
            <div className="mt-4 flex space-x-4">
            {/* Add icons: e.g., <svg> for Twitter, Facebook, etc. */}
            </div>
        </div>
        <div>
            <h4 className="font-semibold">Platform</h4>
            <ul className="mt-2 space-y-1">
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
            </ul>
        </div>
        <div>
            <h4 className="font-semibold">Support</h4>
            <ul className="mt-2 space-y-1">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact</a></li>
            </ul>
        </div>
        <div>
            <h4 className="font-semibold">Legal</h4>
            <ul className="mt-2 space-y-1">
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            </ul>
        </div>
        </div>
    </footer>
    </div>
);
};

export default LandingPage;