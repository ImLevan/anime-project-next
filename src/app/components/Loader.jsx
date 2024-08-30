function Loader() {
    return (
        <div className="flex flex-row gap-2 justify-center mt-4">
            <div className="w-4 h-4 rounded-full bg-tertiary animate-bounce [animation-delay:.7s]"></div>
            <div className="w-4 h-4 rounded-full bg-tertiary animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-tertiary animate-bounce [animation-delay:.7s]"></div>
        </div>
    );
}

export default Loader