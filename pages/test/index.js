import { useSession, signIn, signOut } from "next-auth/react"
import LoginButton from "../../components/login-btn"
import AddToSlack from "../../components/add-to-slack"

export default function Component({ myId, otherId }) {
    return (
        <>
            <LoginButton />
        <br />
            <AddToSlack />
        </>
    )
}

// export async function getServerSideProps() {
//     // Fetch data from external API
//     const myId = process.env.SLACK_CLIENT_ID;
//     const otherId = process.env.SLACK_CLIENT_SECRET;

//     // Pass data to the page via props
//     return { props: { myId, otherId } }
// }