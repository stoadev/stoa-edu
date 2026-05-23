import { forwardRef, type ComponentProps, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends ComponentProps<'input'> {
  icon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className, ...props }, ref) => (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 [&_svg]:h-4 [&_svg]:w-4">
          {icon}
        </span>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-gray-50 text-sm',
          icon ? 'pl-10 pr-3' : 'px-3',
          className,
        )}
        {...props}
      />
    </div>
  ),
)
Input.displayName = 'Input'
