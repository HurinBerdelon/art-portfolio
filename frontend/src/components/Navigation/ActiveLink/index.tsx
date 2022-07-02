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

    const classNameActive = asPath === props.href
        ? activeClassName
        : ''

    return (
        <Link {...props}>
            {cloneElement(children, {
                className,
                classNameActive
            })}
        </Link>
    )
}