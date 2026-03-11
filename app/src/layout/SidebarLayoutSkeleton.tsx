export default function SidebarLayoutSkeleton() {
  return (
    <div className="flex h-screen w-screen bg-background gap-1 overflow-hidden animate-pulse">
      {/* Sidebar */}
      <aside className="shrink-0 bg-card w-48 overflow-hidden">
        <div className="w-48 h-full p-4 flex flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center px-6 border-b border-sidebar-border/50 gap-2">
            <div className="h-8 w-8 rounded bg-muted" />
            <div className="h-4 w-24 rounded bg-muted" />
          </div>

          {/* Nav group 1 */}
          <div className="mt-4 px-2 space-y-1">
            <div className="h-3 w-28 rounded bg-muted mb-2" />
            <div className="h-8 w-full rounded bg-muted" />
            <div className="h-8 w-full rounded bg-muted" />
            <div className="h-8 w-full rounded bg-muted" />
          </div>

          {/* Nav group 2 */}
          <div className="mt-4 px-2 space-y-1">
            <div className="h-3 w-32 rounded bg-muted mb-2" />
            <div className="h-8 w-full rounded bg-muted" />
            <div className="h-8 w-full rounded bg-muted" />
          </div>

          {/* Footer */}
          <div className="mt-auto mb-5 p-4 border-t border-sidebar-border/50">
            <div className="h-8 w-full rounded bg-muted" />
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <div className="h-6 w-6 rounded bg-muted" />
          <div className="h-4 w-40 rounded bg-muted" />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 bg-background space-y-4">
          <div className="h-8 w-48 rounded bg-muted" />
          <div className="h-32 w-full rounded bg-muted" />
          <div className="h-32 w-full rounded bg-muted" />
        </main>
      </div>
    </div>
  );
}
