import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import ImportLogs from "./pages/ImportLogs";

export default function App() {
	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<Link
							to="/"
							className="flex items-center space-x-2 group"
						>
							<div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
								<svg
									className="w-6 h-6 text-white"
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
							</div>
							<span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
								Job Importer
							</span>
						</Link>
						<nav className="flex items-center space-x-1">
							<Link
								to="/"
								className="px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
							>
								Jobs
							</Link>
							<Link
								to="/logs"
								className="px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
							>
								Import Logs
							</Link>
						</nav>
					</div>
				</div>
			</header>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/jobs/:guid" element={<JobDetails />} />
				<Route path="/logs" element={<ImportLogs />} />
			</Routes>
		</div>
	);
}
