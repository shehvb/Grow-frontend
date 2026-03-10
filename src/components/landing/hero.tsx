function Hero(){
    return(
        <>
        <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            The Future of <span className="text-blue-500">Personalized</span> Education
            </h1>
            <p className="mt-4 text-lg text-gray-600">
            A Smart Learning & Parental Engagement Platform. Bridge students and parents with real-time insights and AI-powered support.
            </p>
            <div className="mt-8 flex space-x-4">
            <button className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">Get Started</button>
            <button className="px-6 py-3 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition">Sign Up</button>
            </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <img src="/assets/grow-mark.svg" alt="GROW Mark" className="h-64" /> {/* Large logo mark or illustration */}
        </div>
        </div>
    </section>
        </>
    );
}
export default Hero;