export default function QueryBar({ query, setQuery, onSearch }) {
	return (
		<div className="bg-white rounded-xl shadow-lg p-4 mb-6">
			<div className="flex gap-3">
				<div className="flex-1 relative">
					<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
						<svg
							className="h-5 w-5 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && onSearch()}
						placeholder="Search jobs by title, company, or keywords..."
						className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
					/>
				</div>
				<button
					onClick={onSearch}
					className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
				>
					Search
				</button>
			</div>
			{query && (
				<div className="mt-3 flex items-center gap-2">
					<span className="text-xs text-gray-500">
						Press Enter or click Search to find jobs matching "{query}"
					</span>
				</div>
			)}
		</div>
	);
}
