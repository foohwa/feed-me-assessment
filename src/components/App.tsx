import { InProgressSection } from './InProgressSection'
import { CompletedSection } from './CompletedSection'
import { ControlPanel } from './ControlPanel'

function App() {
  return (
    <div className="relative bg-stone-50">
      <div className="mx-auto h-screen max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="col-span-2">
          <ControlPanel />
        </div>
        <div className="mx-auto grid max-w-7xl gap-2 sm:static lg:grid-cols-2">
          <div className="col-span-2 md:col-span-1">
            <h4 className="mb-2 text-lg font-semibold text-gray-900">
              In Progress
            </h4>
            <InProgressSection />
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="mb-2 text-lg font-semibold text-gray-900">
              Completed
            </h4>
            <CompletedSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
