export default function Blank({ text = "This app is yet to be defined." }) {
    return (
        <div className="pt-10 flex justify-center">
            <div className="card shadow-xl overflow-hidden">
                <div className="w-full h-80 bg-cover bg-center bg-[url('/images/karina-vorozheeva-rW-I87aPY5Y-unsplash.jpg')]" />
                <div className="card-body">
                    <h2 className="card-title justify-center">
                        Oh hai ≽^•⩊•^≼
                    </h2>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    )
}
