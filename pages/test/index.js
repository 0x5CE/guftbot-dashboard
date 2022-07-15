import { useSession, signIn, signOut } from "next-auth/react"
import LoginButton from "../../components/login-btn"

export default function Component({myId, otherId}) {
    return (
        <LoginButton />
    )
}

// export async function getServerSideProps() {
//     // Fetch data from external API
//     const myId = process.env.SLACK_CLIENT_ID;
//     const otherId = process.env.SLACK_CLIENT_SECRET;

//     // Pass data to the page via props
//     return { props: { myId, otherId } }
// }