interface revalidateSSGProps {
    path: string
}

export function revalidateSSG({ path }: revalidateSSGProps): void {
    console.log('path', path)
    fetch(
        `${process.env.NEXT_PUBLIC_APP_ENDPOINT}/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}&path=${path}`
    )
}