export default function ChatBox({ title, isOnline }) {
    return (
        <>
            <div className="card w-96 h-full bg-base-100 shadow-xl m-4 border">
                <div className="card-body">
                    <h2 className="card-title">
                        {title}
                        <div
                            className={`badge ${
                                isOnline ? "badge-success" : "badge-error"
                            } text-white`}
                        >
                            {isOnline ? "Online" : "Offline"}
                        </div>
                    </h2>
                    <div className="chat chat-start">
                        <div className="chat-bubble chat-bubble-primary">
                            Hey, how&apos;s it going?
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-bubble chat-bubble-secondary">
                            Pretty good, you?
                        </div>
                    </div>
                    <div className="chat chat-start">
                        <div className="chat-bubble chat-bubble-primary">
                            Not too bad, just learning some react stuff.
                        </div>
                    </div>

                    <input
                        type="text"
                        placeholder={
                            isOnline
                                ? "Ready for chat"
                                : "Reconnect to internet..."
                        }
                        className="input input-bordered mt-4"
                        disabled={!isOnline}
                    />
                </div>
            </div>
        </>
    )
}
