import NavBar from "~/components/NavBar";
import ResumeCard from "~/components/ResumeCard";
import { resumes } from "~/constants";
import type { Route } from "./+types/home";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Ai Resume Analyzer" },
		{ name: "description", content: "Welcome to Ai Resume Analyzer!" },
	];
}

export default function Home() {
	const { auth } = usePuterStore();
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.isAuthenticated) navigate("/auth?next=/");
	}, []);

	return (
		<main className="bg-[url('/images/bg-main.svg')] bg-cover">
			<NavBar />

			<section className="main-section">
				<div className="page-heading py-16">
					<h1>Track Your Applications & Resume Ratings</h1>
					<h2>Review your submissions and check AI-powered feedback.</h2>
				</div>
			</section>

			{!!resumes?.length && (
				<div className="resumes-section">
					{resumes?.map((item) => (
						<ResumeCard key={item.id} resume={item} />
					))}
				</div>
			)}
		</main>
	);
}
