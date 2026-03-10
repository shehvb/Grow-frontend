function Features(){
    return(
        <>
            <section id="features" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Core Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-blue-500">AI Tutor</h3>
                            <p className="mt-2 text-gray-600">Personalized chatbot for homework help and concept explanations.</p>
                        </div>
                        <div className="p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-blue-500">Performance Analytics</h3>
                            <p className="mt-2 text-gray-600">Visual charts for GPA trends and subject performance.</p>
                        </div>
                        <div className="p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-blue-500">Parent Dashboard</h3>
                            <p className="mt-2 text-gray-600">Real-time progress tracking and insights.</p>
                        </div>
                        <div className="p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-blue-500">Goals & Rewards</h3>
                            <p className="mt-2 text-gray-600">Gamified system with points, leaderboards, and perks.</p>
                    </div>
                </div>
            </div>
        </section>

        </>
    );
}
export default Features;