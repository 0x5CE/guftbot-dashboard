import { useSession, signIn, signOut } from "next-auth/react"

export default function Component({myId, otherId}) {
    const { data: session } = useSession()

    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            <div>{myId}</div>
            <div>{otherId}</div>
            <div>Not signed in</div>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}

export async function getServerSideProps() {
    // Fetch data from external API
    const myId = process.env.SLACK_CLIENT_ID;
    const otherId = process.env.SLACK_CLIENT_SECRET;

    // Pass data to the page via props
    return { props: { myId, otherId } }
}