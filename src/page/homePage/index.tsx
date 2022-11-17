import React, { memo } from "react"
import { IhomePageContent } from "./props"
const HomePage: React.FC<IhomePageContent> = ({content}) => {
    return(
        <div>home</div>
    )
}
export default memo(HomePage)