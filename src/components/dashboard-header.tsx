import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, ArrowRight } from 'lucide-react'

interface DashboardHeaderProps {
  title: string
  description: string
  currentDate: Date
  onTodayClick: () => void
  onDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  formatCurrentWeek: (date: Date) => string
  formatDateForInput: (date: Date) => string
  jobFilter: string
  buFilter: string
  jobSuggestions: string[]
  buSuggestions: string[]
  onJobFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onJobSuggestionClick: (suggestion: string) => void
  onJobInputFocus: () => void
  onBUFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBUSuggestionClick: (suggestion: string) => void
  onBUInputFocus: () => void
}

export function DashboardHeader({
  title,
  description,
  currentDate,
  onTodayClick,
  onDateChange,
  formatCurrentWeek,
  formatDateForInput,
  jobFilter,
  buFilter,
  jobSuggestions,
  buSuggestions,
  onJobFilterChange,
  onJobSuggestionClick,
  onJobInputFocus,
  onBUFilterChange,
  onBUSuggestionClick,
  onBUInputFocus
}: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <CalendarIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 mt-3">
          <Clock className="h-4 w-4 text-teal-700" />
          <p className="text-lg font-semibold text-foreground">
            Week of {formatCurrentWeek(currentDate)}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Filter inputs on the left of Today button */}
         <div className="relative">
        <input
          type="text"
          value={jobFilter}
          onChange={onJobFilterChange}
          placeholder="Filter by job position"
          className="border border-input rounded-md px-2 py-1 text-sm bg-background"
          autoComplete="off"
          onFocus={onJobInputFocus}
        />
        {jobFilter && jobSuggestions.length > 0 && (
          <div className="absolute z-10 left-0 right-0 bg-white border rounded shadow mt-1 max-h-40 overflow-y-auto">
            {jobSuggestions.map(pos => (
              <div
                key={pos}
                className="px-3 py-2 cursor-pointer hover:bg-muted"
                onClick={() => onJobSuggestionClick(pos)}
              >
                {pos}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* BU Filter */}
      <div className="relative">
        <input
          type="text"
          value={buFilter}
          onChange={onBUFilterChange}
          placeholder="Filter by BU"
          className="border border-input rounded-md px-2 py-1 text-sm bg-background"
          autoComplete="off"
          onFocus={onBUInputFocus}
        />
        {buFilter && buSuggestions.length > 0 && (
          <div className="absolute z-10 left-0 right-0 bg-white border rounded shadow mt-1 max-h-40 overflow-y-auto">
            {buSuggestions.map(bu => (
              <div
                key={bu}
                className="px-3 py-2 cursor-pointer hover:bg-muted"
                onClick={() => onBUSuggestionClick(bu)}
              >
                {bu}
              </div>
            ))}
          </div>
        )}
      </div>
        <Button 
          onClick={onTodayClick}
          variant="outline"
          className="bg-background hover:bg-accent"
        >
          <Clock className="h-4 w-4 mr-2" />
          Today
        </Button>
        <div className="flex items-center gap-2 bg-background border border-input rounded-md px-3 py-2">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <input
            type="date"
            value={formatDateForInput(currentDate)}
            onChange={onDateChange}
            className="border-none outline-none bg-transparent text-sm cursor-pointer"
          />
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
        </div>
      </div>
    </div>
  )
}