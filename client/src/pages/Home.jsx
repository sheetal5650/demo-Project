import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QueryBar from "../components/QueryBar";

export default function Home() {
	const PAGE_SIZE = 20;

	const [jobs, setJobs] = useState([]);
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [skip, setSkip] = useState(0);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState("");
	const [stats, setStats] = useState({ total: 0, showing: 0 });

	const fetchJobs = async (reset = false) => {
		setLoading(true);
		setError("");
		try {
			const res = await fetch(
				`/jobs?limit=${PAGE_SIZE}&skip=${
					reset ? 0 : skip
				}&q=${encodeURIComponent(query)}`
			);
			if (!res.ok) throw new Error(res.statusText);
			const data = await res.json();

			/* update state */
			if (reset) {
				setJobs(data);
				setSkip(PAGE_SIZE);
				setStats({ total: data.length, showing: data.length });
			} else {
				setJobs((prev) => [...prev, ...data]);
				setSkip((prev) => prev + PAGE_SIZE);
				setStats((prev) => ({ 
					total: prev.total, 
					showing: prev.showing + data.length 
				}));
			}
			setHasMore(data.length === PAGE_SIZE);
		} catch (e) {
			setError("Could not fetch jobs. Is the backend running?");
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	/* first load */
	useEffect(() => {
		fetchJobs(true);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleSearch = () => fetchJobs(true);

	const formatDate = (dateString) => {
		if (!dateString) return "Date not available";
		const date = new Date(dateString);
		const now = new Date();
		const diffTime = Math.abs(now - date);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 0) return "Today";
		if (diffDays === 1) return "Yesterday";
		if (diffDays < 7) return `${diffDays} days ago`;
		
		return date.toLocaleDateString(undefined, {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	const truncateDescription = (text, maxLength = 150) => {
		if (!text) return "No description available";
		if (text.length <= maxLength) return text;
		return text.substring(0, maxLength).trim() + "...";
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
				{/* Header Section */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">
						Job Opportunities
					</h1>
					<p className="text-gray-600">
						Discover your next career opportunity from top companies
					</p>
					{stats.total > 0 && (
						<p className="text-sm text-gray-500 mt-2">
							Showing {stats.showing} {stats.showing === 1 ? 'job' : 'jobs'}
						</p>
					)}
				</div>

				{/* Search Bar */}
				<div className="mb-8">
					<QueryBar query={query} setQuery={setQuery} onSearch={handleSearch} />
				</div>

				{/* Error State */}
				{error && (
					<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
						<p className="font-medium">Error</p>
						<p className="text-sm">{error}</p>
					</div>
				)}

				{/* Loading State */}
				{loading && jobs.length === 0 && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[...Array(6)].map((_, i) => (
							<div
								key={i}
								className="bg-white rounded-xl shadow-md p-6 animate-pulse"
							>
								<div className="h-6 bg-gray-200 rounded mb-4"></div>
								<div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
								<div className="h-4 bg-gray-200 rounded mb-2"></div>
								<div className="h-4 bg-gray-200 rounded w-5/6"></div>
							</div>
						))}
					</div>
				)}

				{/* Empty State */}
				{!loading && !error && jobs.length === 0 && (
					<div className="bg-white rounded-xl shadow-md p-12 text-center">
						<svg
							className="mx-auto h-12 w-12 text-gray-400 mb-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							No jobs found
						</h3>
						<p className="text-gray-500">
							{query
								? "Try adjusting your search terms"
								: "No jobs are available at the moment"}
						</p>
					</div>
				)}

				{/* Jobs Grid */}
				{!loading && jobs.length > 0 && (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
						{jobs.map((job) => (
							<Link
								key={job.guid}
								to={`/jobs/${encodeURIComponent(job.guid)}`}
								className="group"
							>
								<div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col border border-gray-100 hover:border-indigo-300 hover:-translate-y-1">
									{/* Company Badge */}
									{job.company && (
										<div className="mb-3">
											<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
												{job.company}
											</span>
										</div>
									)}

									{/* Job Title */}
									<h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
										{job.title || "Untitled Position"}
									</h3>

									{/* Description */}
									<p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">
										{truncateDescription(job.description)}
									</p>

									{/* Footer */}
									<div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
										<span className="text-xs text-gray-500">
											{formatDate(job.publishedAt)}
										</span>
										<span className="text-xs text-indigo-600 font-medium group-hover:underline">
											View Details →
										</span>
									</div>
								</div>
							</Link>
						))}
					</div>
				)}

				{/* Load More Button */}
				{!loading && hasMore && !error && jobs.length > 0 && (
					<div className="flex justify-center mt-8">
						<button
							onClick={() => fetchJobs(false)}
							className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
						>
							Load More Jobs
						</button>
					</div>
				)}

				{/* End Message */}
				{!hasMore && !loading && !error && jobs.length > 0 && (
					<div className="text-center mt-8 py-4">
						<p className="text-gray-500">
							You've reached the end of the job listings
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
