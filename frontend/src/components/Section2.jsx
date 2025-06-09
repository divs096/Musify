import React from "react";
import desk from "../assets/guitar-bg.png";

const SectionII = () => {
    return(
        <section
            className="relative h-[600px] md:h-[1000px] bg-cover bg-center bg-no-repeat px-6 md:px-16 lg:px-32"
            style={{ backgroundImage: `url(${desk})` }}
        >
            <div className="absolute bottom-10 right-10 bg-white/30 p-8 rounded-xl max-w-xl">
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                    Fuel Your Passion
                </h2>
                <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                    Whether you're a solo artist, a beatmaker in the basement, or a band looking to break out,{" "}
                    <span className="text-cyan-600 font-medium">musify</span> gives you the tools to connect,
                    collaborate, and thrive.
                </p>
                <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all">
                    Join the Movement
                </button>
            </div>
        </section>
    )
}
export default SectionII;
