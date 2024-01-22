import UseEffectChatIndicator from "./UseEffectChat"
import UseHookChatIndicator from "./UseHookChat"

export default function App() {
    return (
        <div className="w-full h-screen bg-base-200 p-4">
            <UseEffectChatIndicator />
            <UseHookChatIndicator />
        </div>
    )
}
