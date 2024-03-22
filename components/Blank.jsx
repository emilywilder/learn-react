export default function Blank({ text = "This app is yet to be defined." }) {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="basis-3/4">
                <div className="flex h-full items-center justify-center">
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
            </div>
        </div>
    )
}
