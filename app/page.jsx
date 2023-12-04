import Feed from "@components/Feed";

const Home = () => {
	return (
		<section className="w-full flex-center flex-col">
			<h1 className="head_text text-center">
				Discover & share <br className="max-md:hidden" />
				<span className="orange_gradient text-center">AI-powered Prompts</span>
			</h1>
			<p className="desc text-center">
				Promptoia is an open-source platform for discovering and sharing AI-powered prompts. Create and share creative prompts for your favorite AI models, or use prompts created by others to generate
				your own content.
			</p>

			{/* Feed */}
			<Feed />
		</section>
	);
};

export default Home;
