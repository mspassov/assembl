import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        })
    ],
    callbacks: {
        //Triggered on Sucessful Sign-In
        async signIn({profile}) {
            // To-Do
            console.log(profile);
            return true;
        },

        //Session Callback function that modifies the session
        async session({session}){
            const user = session.user.email;

            session.user.id = user;

            return session;
        }

    }
};

export default authOptions;