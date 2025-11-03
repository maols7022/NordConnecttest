import * as React from 'react'

type DialogRootProps = React.PropsWithChildren<{ open?: boolean, onOpenChange?: (open:boolean)=>void }>
export const Dialog: React.FC<DialogRootProps> = ({ children }) => <>{children}</>

export const DialogTrigger: React.FC<React.PropsWithChildren & { asChild?: boolean }> = ({ children }) => <>{children}</>

export const DialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...p }) => (
  <div className={`fixed inset-0 z-50 grid place-items-center`}>
    <div className="fixed inset-0 bg-black/30" />
    <div className={`relative z-10 w-full max-w-lg rounded-2xl border bg-white p-4 shadow-xl ${className}`} {...p} />
  </div>
)

export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...p }) => (
  <div className={`mb-2 ${className}`} {...p} />
)

export const DialogTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...p }) => (
  <div className={`text-lg font-semibold ${className}`} {...p} />
)

export const DialogDescription: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...p }) => (
  <div className={`text-sm text-slate-600 ${className}`} {...p} />
)
