import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        })
    ], 
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email })
            if(sessionUser){
                session.user.id = sessionUser._id.toString();
            }
            return session;
        },

        async signIn({ profile }) {

            try {
                await connectToDB()
                const userExist = await User.findOne({ email: profile.email });
        
                if (!userExist) {
                    const userCreate = {
                        email: profile.email,
                        username: profile.given_name,
                        image: profile.picture,
                    }
                    
                    await User.create(userCreate)     
                }
            

                return true;
            } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false;
            }
        }

    }
})

export { handler as GET, handler as POST };