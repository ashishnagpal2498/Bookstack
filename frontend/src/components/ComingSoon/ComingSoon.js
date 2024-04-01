// Author - Abhinav Acharya Tirumala Vinjamuri
function ComingSoon() {
    return (
        <div class="relative h-100 w-full flex items-center justify-center bg-cover bg-center text-center px-5">

            <div className="flex flex-col justify-center text-black w-full">
                <h1>Coming Soon!!!</h1>
                <p className="text-xl">We are <b>Almost</b> there!</p>

                <div className="mt-10 mb-5">
                    <div className="shadow w-full bg-white mt-2 max-w-2xl mx-auto rounded-full">
                        <div className="rounded-full bg-[#c08a5f] text-xs leading-none h-6 text-center text-white py-1.5 w-75">
                            <span className="text-center text-white ml-[10rem]">75%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ComingSoon;