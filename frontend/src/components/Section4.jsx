import React from "react";
import desktopImage from "../assets/bd.png";

const SectionIV = () => {
    return(
        <section
              className="relative h-[600px] md:h-[1000px] bg-cover bg-center bg-no-repeat px-6 md:px-16 lg:px-32"
              style={{ backgroundImage: `url(${desktopImage})` }}
            >
             <div className="absolute inset-0 bg-black/40 z-0" />


              <div className="absolute bottom-100 left-150 p-8 rounded-xl max-w-xl">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Wish you knew there’s a gig to enjoy three lanes back !!</h2>
                
                <button className="bg-cyan-600 hover:bg-cyan-700 left-10px text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all">
                  Find a gig nearby
                </button>
              </div>
            </section>
    )
}
export default SectionIV;