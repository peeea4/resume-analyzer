import React, { useState, type FormEvent } from "react";
import FileUploader from "~/components/FileUploader";
import NavBar from "~/components/NavBar";

const upload = () => {
	const [isProcessing, setIsProcessing] = useState(false);
	const [statusText, setStatusText] = useState("");

	const [file, setFile] = useState<File | null>(null);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget.closest("form");

		if (!form) return;

		const formdata = new FormData(form);
		const companyName = formdata.get("company-name");
		const jobTitle = formdata.get("job-title");
		const jobDescription = formdata.get("job-description");
	};

	const handleFileSelect = (file: File | null) => {
		setFile(file);
	};

	return (
		<main className="bg-[url('/images/bg-main.svg')] bg-cover">
			<NavBar />

			<section className="main-section">
				<div className="page-heading py-16">
					<h1>Smart feedback for your dream job</h1>
					{isProcessing ? (
						<>
							<h2>{statusText}</h2>
							<img src="/images/resume-scan.gif" className="w-full" />
						</>
					) : (
						<h2>Drop your resume for an ATS score and improvement tips</h2>
					)}
					{!isProcessing && (
						<form is="upload-form" onSubmit={handleSubmit} className="flex lex-col gap-4 mt-8">
							<div className="form-div">
								<label htmlFor="company-name">Company Name</label>
								<input
									type="text"
									name="company-name"
									id="company-name"
									placeholder="Company Name"
								/>
							</div>
							<div className="form-div">
								<label htmlFor="job-title">Job Title</label>
								<input type="text" name="job-title" id="job-title" placeholder="Job Title" />
							</div>
							<div className="form-div">
								<label htmlFor="job-description">Job Description</label>
								<textarea
									rows={5}
									name="job-description"
									id="job-description"
									placeholder="Job Description"
								/>
							</div>
							<div className="form-div">
								<label htmlFor="uploader">Upload Resume</label>
								<FileUploader onFileSelect={handleFileSelect} />
							</div>
							<button className="primary-button" type="submit">
								Analyze Resume
							</button>
						</form>
					)}
				</div>
			</section>
		</main>
	);
};

export default upload;
