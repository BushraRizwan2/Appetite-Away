import React from 'react';

const SplashScreen: React.FC = () => {
    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-rose-500 overflow-hidden pt-8">
            <style>{`
                @keyframes text-scale-up {
                    from { opacity: 0; transform: scale(0.5); }
                    to { opacity: 1; transform: scale(1); }
                }

                @keyframes fly-from-top-right {
                    from { opacity: 0; transform: translate(200px, -200px) scale(0.3) rotate(45deg); }
                    to { opacity: 1; transform: translate(0, 0) scale(1) rotate(0deg); }
                }
                @keyframes fly-from-bottom-right {
                    from { opacity: 0; transform: translate(200px, 200px) scale(0.3) rotate(-30deg); }
                    to { opacity: 1; transform: translate(0, 0) scale(1) rotate(0deg); }
                }
                @keyframes fly-from-top-left {
                    from { opacity: 0; transform: translate(-200px, -200px) scale(0.3) rotate(-45deg); }
                    to { opacity: 1; transform: translate(0, 0) scale(1) rotate(0deg); }
                }
                @keyframes fly-from-left {
                    from { opacity: 0; transform: translate(-300px, 0px) scale(0.3) rotate(20deg); }
                    to { opacity: 1; transform: translate(0, 0) scale(1) rotate(0deg); }
                }
                @keyframes fly-from-bottom-left {
                    from { opacity: 0; transform: translate(-200px, 200px) scale(0.3) rotate(30deg); }
                    to { opacity: 1; transform: translate(0, 0) scale(1) rotate(0deg); }
                }
                @keyframes fly-from-bottom {
                    from { opacity: 0; transform: translate(0, 300px) scale(0.3) rotate(-15deg); }
                    to { opacity: 1; transform: translate(0, 0) scale(1) rotate(0deg); }
                }

                .animate-text-scale-up {
                    animation: text-scale-up 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                    animation-delay: 0.2s;
                }
                
                .animate-fly {
                    animation-duration: 1.2s;
                    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    animation-fill-mode: forwards;
                }

                .animate-fly.fly-from-top-right { animation-name: fly-from-top-right; }
                .animate-fly.fly-from-bottom-right { animation-name: fly-from-bottom-right; }
                .animate-fly.fly-from-top-left { animation-name: fly-from-top-left; }
                .animate-fly.fly-from-left { animation-name: fly-from-left; }
                .animate-fly.fly-from-bottom-left { animation-name: fly-from-bottom-left; }
                .animate-fly.fly-from-bottom { animation-name: fly-from-bottom; }
            `}</style>

            <div className="relative w-full h-full flex items-center justify-center">
                {/* Burger: Top Right */}
                <img src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=300" alt="" className="animate-fly fly-from-top-right opacity-0 absolute w-48 h-auto" style={{ top: '15%', right: '10%', animationDelay: '0.6s' }}/>
                {/* Drink 1: Bottom Right */}
                <img src="https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&w=300" alt="" className="animate-fly fly-from-bottom-right opacity-0 absolute w-32 h-auto" style={{ bottom: '15%', right: '15%', animationDelay: '0.7s' }}/>
                {/* Pizza Slice: Top Left */}
                <img src="https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=300" alt="" className="animate-fly fly-from-top-left opacity-0 absolute w-32 h-auto" style={{ top: '10%', left: '15%', animationDelay: '0.8s' }}/>
                {/* Fries: Middle Left */}
                <img src="https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=300" alt="" className="animate-fly fly-from-left opacity-0 absolute w-40 h-auto" style={{ top: '40%', left: '5%', animationDelay: '0.9s' }}/>
                {/* Taco: Bottom Left */}
                <img src="https://images.pexels.com/photos/2092916/pexels-photo-2092916.jpeg?auto=compress&cs=tinysrgb&w=300" alt="" className="animate-fly fly-from-bottom-left opacity-0 absolute w-36 h-auto" style={{ bottom: '10%', left: '10%', animationDelay: '1s' }}/>
                {/* Sundae: Bottom */}
                <img src="https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg?auto=compress&cs=tinysrgb&w=300" alt="" className="animate-fly fly-from-bottom opacity-0 absolute w-32 h-auto" style={{ bottom: '5%', left: '45%', animationDelay: '1.1s' }}/>


                <div
                    className="text-6xl font-extrabold text-white opacity-0 animate-text-scale-up relative text-center leading-tight"
                    style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.3)' }}
                >
                    <div>Appetite</div>
                    <div>Away</div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;