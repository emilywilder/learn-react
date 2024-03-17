import { AiOutlineExperiment } from "react-icons/ai"

import HeroPage from "@/components/HeroPage"

export default function Experimental() {
    return (
        <HeroPage
            backgroundImage={
                "/images/thisisengineering-raeng-64YrPKiguAE-unsplash.jpg"
            }
        >
            <HeroPage.Title>Not ready yet!</HeroPage.Title>
            <HeroPage.Content>
                This lesson requires a version of React that is currently
                experimental.
                <AiOutlineExperiment size={70} />
            </HeroPage.Content>
        </HeroPage>
    )
}
