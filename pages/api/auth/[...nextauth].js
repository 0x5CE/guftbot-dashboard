import NextAuth from 'next-auth'
import SlackProvider from 'next-auth/providers/slack'

export default NextAuth({
    providers: [
        SlackProvider({
            clientId: process.env.SLACK_CLIENT_ID,
            clientSecret: process.env.SLACK_CLIENT_SECRET,
        })
    ],
    secret: "ThOEoi+rhCOHVhDuwL7YktewkhcqQL9IH8TuMxY5tjo="
});
