import Link from "next/link";

function Footer () {
    return (
        <footer className="flex flex-wrap bg-primary align-center justify-center py-4">
            <div className="copyright text-base">
                <p>Creado por <Link className="decoration-none text-slate-800 mb-2 hover:text-slate-950" href="https://imlevan.github.io/" target="_blank" rel="noopener noreferrer">VC</Link></p>
            </div>
        </footer>
    );
}

export default Footer