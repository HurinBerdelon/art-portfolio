import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"
import { cloneElement, ReactElement } from "react"

interface ActiveLinkProps extends LinkProps {
    activeClassName: string
    className?: string
    children: ReactElement
}

export function ActiveLink({ activeClassName, className = '', children, ...props }: ActiveLinkProps): JSX.Element {

    const { asPath } = useRouter()
    // TODO: fix => Not showing highlight on active link

    const classNameActive = asPath === props.href
        ? `${activeClassName} ${className}`
        : `${className}`

    return (
        <Link {...props}>
            {cloneElement(children, {
                className: classNameActive
            })}
        </Link>
    )
}