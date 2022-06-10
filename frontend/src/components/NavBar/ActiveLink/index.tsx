import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"
import { cloneElement, ReactElement } from "react"

interface ActiveLinkProps extends LinkProps {
    activeClassName: string
    children: ReactElement
}

export function ActiveLink({ activeClassName, children, ...props }: ActiveLinkProps): JSX.Element {

    const { asPath } = useRouter()

    const className = asPath === props.href
        ? activeClassName
        : ''

    return (
        <Link {...props}>
            {cloneElement(children, {
                className
            })}
        </Link>
    )
}