    import { type LucideIcon } from 'lucide-react'

interface DashboardSectionProps {
  title: string
  description: string
  icon: LucideIcon
  children: React.ReactNode
}

export function DashboardSection({ title, description, icon: Icon, children }: DashboardSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  )
}
