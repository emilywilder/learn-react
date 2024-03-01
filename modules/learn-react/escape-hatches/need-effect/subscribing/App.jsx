import UseEffectChatIndicator from "./UseEffectChat"
import UseHookChatIndicator from "./UseHookChat"

export default function App() {
    return (
        <div className="w-full p-4 flex">
            <UseEffectChatIndicator />
            <UseHookChatIndicator />
        </div>
    )
}
