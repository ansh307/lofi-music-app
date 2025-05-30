import Link from 'next/link'
import React from 'react'
// import { connectionLinks } from "./SocialLinks"

const SocialLinksComponent = ({name , link , icon}) => {
    return (
        <Link
            href={link}
            target="_blank"
            aria-label={`Switch to ${name} mode`}
            className="text-slate-400 hover:text-indigo-500 transition duration-300"
            
        >
            {icon}
        </Link>
    )
}

export default SocialLinksComponent