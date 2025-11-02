import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function JobDetails() {
	const { guid } = useParams();
	const [job, setJob] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		fetch(`/jobs/${encodeURIComponent(guid)}`)
			.then((res) => {
				if (!res.ok) throw new Error("Job not found");
				return res.json();
			})
			.then((data) => {
				setJob(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Error fetching job details:", err);
				setError(true);
				setLoading(false);
			});
	}, [guid]);

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center">
				<div className="bg-white rounded-xl shadow-lg p-12 text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading job details...</p>
				</div>
			</div>
		);
	}

	if (error || !job) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
				<div className="bg-white rounded-xl shadow-lg p-12 text-center max-w-md">
					<svg
						className="mx-auto h-16 w-16 text-red-400 mb-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						Job Not Found
					</h2>
					<p className="text-gray-600 mb-6">
						The job you're looking for doesn't exist or has been removed.
					</p>
					<Link
						to="/"
						className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
					>
						← Back to Job Listings
					</Link>
				</div>
			</div>
		);
	}

	const formatDate = (dateString) => {
		if (!dateString) return "Date not available";
		const date = new Date(dateString);
		return date.toLocaleDateString(undefined, {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8">
			<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
				{/* Back Button */}
				<Link
					to="/"
					className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6 font-medium"
				>
					<svg
						className="w-5 h-5 mr-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					Back to Job Listings
				</Link>

				{/* Job Card */}
				<div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
					{/* Header Section */}
					<div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-8 text-white">
						{job.company && (
							<div className="mb-4">
								<span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
									{job.company}
								</span>
							</div>
						)}
						<h1 className="text-3xl md:text-4xl font-bold mb-4">
							{job.title || "Job Position"}
						</h1>
						<div className="flex items-center text-indigo-100 text-sm">
							<svg
								className="w-5 h-5 mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
							Published {formatDate(job.publishedAt)}
						</div>
					</div>

					{/* Content Section */}
					<div className="px-8 py-8">
						{/* Description */}
						<div className="mb-8">
							<h2 className="text-xl font-semibold text-gray-900 mb-4">
								Job Description
							</h2>
							<div
								className="prose max-w-none text-gray-700 leading-relaxed"
								dangerouslySetInnerHTML={{ __html: job.description }}
							/>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
							{job.link && (
								<a
									href={job.link}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
								>
									<svg
										className="w-5 h-5 mr-2"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
									View Original Posting
								</a>
							)}
							<Link
								to="/"
								className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
							>
								Browse More Jobs
							</Link>
						</div>
					</div>
				</div>

				{/* Additional Info Card */}
				{job.raw && (
					<div className="mt-6 bg-white rounded-xl shadow-md p-6 border border-gray-100">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Additional Information
						</h3>
						<div className="bg-gray-50 rounded-lg p-4">
							<pre className="text-xs text-gray-600 overflow-x-auto">
								{typeof job.raw === "string"
									? job.raw
									: JSON.stringify(job.raw, null, 2)}
							</pre>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
