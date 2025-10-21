/* eslint-disable no-empty-pattern */
import NavBar from "~/components/NavBar";
import ResumeCard from "~/components/ResumeCard";
import type { Route } from "./+types/home";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Ai Resume Analyzer" },
		{ name: "description", content: "Welcome to Ai Resume Analyzer!" },
	];
}

export default function Home() {
	const { auth, kv } = usePuterStore();
	const navigate = useNavigate();
	const [resumes, setResumes] = useState<Resume[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!auth.isAuthenticated) navigate("/auth?next=/");
	}, []);

	useEffect(() => {
		const loadResume = async () => {
			setIsLoading(true);
			const resumes = (await kv.list("resume:*", true)) as KVItem[];

			const parsedResumes = resumes?.map((resumeItem) => JSON.parse(resumeItem.value) as Resume);
			setResumes(parsedResumes || []);
			setIsLoading(false);
		};

		loadResume();
	}, []);
	return (
		<main className="bg-[url('/images/bg-main.svg')] bg-cover">
			<NavBar />

			<section className="main-section">
				<div className="page-heading py-16">
					<h1>Track Your Applications & Resume Ratings</h1>
					{!isLoading && !resumes.length ? (
						<h2>No resumes found. Upload your first resume to get feedback.</h2>
					) : (
						<h2>Review your submissions and check AI-powered feedback.</h2>
					)}
				</div>
				{isLoading && (
					<div className="flex flex-col item-cent justify-center">
						<img src="/image/scan-2.gif" className="w-[200px]" alt="" />
					</div>
				)}
			</section>

			{!isLoading && !!resumes?.length && (
				<div className="resumes-section">
					{resumes?.map((item) => (
						<ResumeCard key={item.id} resume={item} />
					))}
				</div>
			)}

			{!isLoading && !resumes.length && (
				<div className="flex flex-col items-center justify-center gap4 mt-10">
					<Link to="/upload" className="primary-button w-fit text-xl font-semibold">
						Upload resume
					</Link>
				</div>
			)}
		</main>
	);
}
