import { ChevronRight, ChevronLeft } from "lucide-react"

export default function Pagination() {
  return (
    <>
      {/*<!-- Component: Minimal basic pagination with icons and text --> */}
      <nav role="navigation" aria-label="Pagination Navigation">
        <ul className="flex list-none items-center justify-center text-sm text-slate-700 md:gap-1">
          <li>
            <a
              href="javascript:void(0)"
              aria-label="Goto Page 1"
              className="inline-flex h-10 items-center justify-center gap-4 rounded stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300 hover:bg-slate-50 hover:stroke-emerald-500 hover:text-emerald-500 focus:bg-emerald-50 focus:stroke-emerald-600 focus:text-emerald-600 focus-visible:outline-none"
            >
              <span className="order-2">Prev</span>
              <ChevronLeft className="h-4 w-4" />
            </a>
          </li>

          <li>
            <a
              href="javascript:void(0)"
              aria-label="Goto Page 3"
              className="inline-flex h-10 items-center justify-center gap-4 rounded stroke-slate-700 px-4 text-sm font-medium text-slate-700 transition duration-300 hover:bg-emerald-50 hover:stroke-emerald-500 hover:text-emerald-500 focus:bg-emerald-50 focus:stroke-emerald-600 focus:text-emerald-600 focus-visible:outline-none"
            >
              <span>Next </span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </li>
        </ul>
      </nav>
      {/*<!-- End Minimal basic pagination with icons and text --> */}
    </>
  )
}
