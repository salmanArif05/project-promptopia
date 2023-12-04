import NextAuth from "next-auth/next";
import GoogleProviders from "next-auth/providers/google";
import User from "@models/user";
import { connectDB } from "@utils/database";

// console.log({
// 	clientId: process.env.GOOGLE_CLIENT_ID,
// 	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// });

const handler = NextAuth({
	providers: [
		GoogleProviders({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async session({ session }) {
			const sessionUser = await User.findOne({ email: session?.user.email });

			session.user.id = sessionUser?._id?.toString();
			return session;
		},
		async signIn({ profile }) {
			try {
				await connectDB();

				// check if a user already exists
				const userExists = await User.findOne({ email: profile.email });

				// check if not, create a new user

				if (!userExists) {
					const newUser = await User.create({
						email: profile.email,
						username: profile.name.replace(" ", "").toLowerCase(),
						image: profile.picture,
					});
				}

				return true;
			} catch (error) {
				console.error(error);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
