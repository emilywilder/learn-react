export default function ChatBox({ title, isOnline }) {
    return (
        <>
            <div className="card w-96 bg-base-100 shadow-xl m-4">
                <div className="card-body">
                    <h2 className="card-title">
                        {title}
                        <div
                            className={`badge ${
                                isOnline ? "badge-success" : "badge-error"
                            }`}
                        >
                            {isOnline ? "Online" : "Offline"}
                        </div>
                    </h2>
                    <input
                        type="text"
                        placeholder={
                            isOnline
                                ? "Ready for chat"
                                : "Reconnect to internet..."
                        }
                        className="input input-bordered"
                        disabled={!isOnline}
                    />
                </div>
            </div>
        </>
    )
}
