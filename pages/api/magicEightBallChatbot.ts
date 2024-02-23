import type { NextApiRequest, NextApiResponse } from "next"

type MagicEightBallResponse = { id: number; text: string }

const REPLIES: Array<MagicEightBallResponse> = [
    { id: 0, text: "It is certain" },
    { id: 1, text: "Reply hazy, try again" },
    { id: 2, text: "Don’t count on it" },
    { id: 3, text: "It is decidedly so" },
    { id: 4, text: "Ask again later" },
    { id: 5, text: "My reply is no" },
    { id: 6, text: "Without a doubt" },
    { id: 7, text: "Better not tell you now" },
    { id: 8, text: "My sources say no" },
    { id: 9, text: "Yes definitely" },
    { id: 10, text: "Cannot predict now" },
    { id: 11, text: "Outlook not so good" },
    { id: 12, text: "You may rely on it" },
    { id: 13, text: "Concentrate and ask again" },
    { id: 14, text: "Very doubtful" },
    { id: 15, text: "As I see it, yes" },
    { id: 16, text: "Most likely" },
    { id: 17, text: "Outlook good" },
    { id: 18, text: "Yes" },
    { id: 19, text: "Signs point to yes" },
]

const getRandomElement = (arr: any[]) =>
    arr[Math.floor(Math.random() * arr.length)]

function getRandomReply() {
    return getRandomElement(REPLIES)
}
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<MagicEightBallResponse>
) {
    res.status(200).json(getRandomReply())
}
