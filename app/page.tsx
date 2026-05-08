export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero */}
      <header className="bg-gray-900 text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <svg viewBox="0 0 16 16" className="w-16 h-16 fill-white" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">About GitHub and Git</h1>
          <p className="text-lg text-gray-300">
            Learn how GitHub and Git work together to help you collaborate, track changes, and build software.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-14">
        {/* About GitHub */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-500 rounded inline-block"></span>
            About GitHub
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            GitHub is a cloud-based platform where you can store, share, and work together with others to write code.
            It is home to a large community of developers and powers millions of projects worldwide.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "📂", title: "Store & Share", desc: "Host your code in repositories and share your work with anyone." },
              { icon: "🔍", title: "Track Changes", desc: "See a full history of every change made to your codebase." },
              { icon: "💬", title: "Code Review", desc: "Request feedback and suggestions from teammates or the community." },
              { icon: "🤝", title: "Collaborate", desc: "Work on shared projects without worrying about overwriting others." },
            ].map((card) => (
              <div key={card.title} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{card.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-1">{card.title}</h3>
                <p className="text-sm text-gray-500">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About Git */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-green-500 rounded inline-block"></span>
            About Git
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Git is a version control system that intelligently tracks changes in files.
            It lets multiple people collaborate on a project simultaneously, each working independently without disrupting each other.
          </p>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-4">Typical Git Workflow</h3>
            <ol className="space-y-3">
              {[
                "Create a branch — a copy of the main codebase to work on safely.",
                "Make edits on your personal branch without affecting others.",
                "Open a Pull Request to share your changes for review.",
                "Merge your changes back into the main branch once approved.",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-gray-600 text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* How They Work Together */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-purple-500 rounded inline-block"></span>
            How Git and GitHub Work Together
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Git runs locally on your computer to track changes, while GitHub hosts your repository in the cloud so
            your team can access it from anywhere. They work in sync: you pull the latest changes from GitHub,
            make your edits locally with Git, then push your updates back to GitHub.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="text-center px-6 py-4 bg-gray-50 rounded-lg w-full sm:w-auto">
              <div className="text-2xl mb-1">💻</div>
              <div className="font-semibold text-gray-700">Your Computer</div>
              <div className="text-xs text-gray-400 mt-1">Local Git</div>
            </div>
            <div className="flex flex-col items-center text-gray-400 text-sm gap-1">
              <span>⬆ push</span>
              <span className="text-gray-300">⇅</span>
              <span>⬇ pull</span>
            </div>
            <div className="text-center px-6 py-4 bg-gray-900 text-white rounded-lg w-full sm:w-auto">
              <div className="text-2xl mb-1">☁️</div>
              <div className="font-semibold">GitHub</div>
              <div className="text-xs text-gray-400 mt-1">Remote Repository</div>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-orange-400 rounded inline-block"></span>
            Getting Started
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            New to GitHub? Follow these steps to begin your journey:
          </p>
          <ul className="space-y-2">
            {[
              "Create a free GitHub account at github.com",
              "Learn the GitHub Flow: branch → commit → pull request → merge",
              "Customize your profile and explore open-source projects",
              "Upload your first repository and start collaborating",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                <span className="text-orange-400 font-bold mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 text-sm mt-12">
        <p>
          Content based on{" "}
          <a
            href="https://docs.github.com/en/get-started/start-your-journey/about-github-and-git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            GitHub Docs — About GitHub and Git
          </a>
        </p>
      </footer>
    </main>
  );
}
