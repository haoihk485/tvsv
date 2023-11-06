import React, { useState } from "react";

function Test() {
    const [isShow, setIsShow] = useState(false);

    const toggleDiv = () => {
        setIsShow(!isShow);
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={toggleDiv}>
                Toggle Div
            </button>

            {isShow && (
                <div className="fixed top-0 left-0 right-0 bottom-0 transition-transform transform -translate-x-0 duration-[2000ms] bg-green-500">
                    <div className="text-white text-3xl font-bold text-center mt-5">
                        Slide from left
                    </div>
                </div>
            )}
        </div>
    );
}

export default Test;
