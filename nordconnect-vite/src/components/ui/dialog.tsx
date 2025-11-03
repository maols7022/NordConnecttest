import * as React from "react";

type DialogCtx = { open: boolean; setOpen: (v: boolean) => void };
const Ctx = React.createContext<DialogCtx | null>(null);

type RootProps = React.PropsWithChildren<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>;

/** Dialog-root: funker både kontrollert (open/onOpenChange) og ukontrollert. */
export const Dialog: React.FC<RootProps> = ({ open, onOpenChange, children }) => {
  const controlled = typeof open === "boolean";
  const [internal, setInternal] = React.useState(false);
  const isOpen = controlled ? (open as boolean) : internal;

  const setOpen = (v: boolean) => {
    if (!controlled) setInternal(v);
    onOpenChange?.(v);
  };

  // Lukk på Escape
  React.useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return <Ctx.Provider value={{ open: isOpen, setOpen }}>{children}</Ctx.Provider>;
};

type TriggerProps = React.PropsWithChildren<{ asChild?: boolean }>;
export const DialogTrigger: React.FC<TriggerProps> = ({ asChild = false, children }) => {
  const ctx = React.useContext(Ctx);
  if (!ctx) return <>{children}</>;

  const handleClick = (e: any) => {
    if (React.isValidElement(children) && (children as any).props?.onClick) {
      (children as any).props.onClick(e);
    }
    ctx.setOpen(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, { onClick: handleClick });
  }
  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
};

export const DialogContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...p
}) => {
  const ctx = React.useContext(Ctx);
  if (!ctx || !ctx.open) return null;

  const stop: React.MouseEventHandler<HTMLDivElement> = (e) => e.stopPropagation();

  return (
    <div className="fixed inset-0 z-50" onClick={() => ctx.setOpen(false)}>
      {/* Bakgrunn */}
      <div className="fixed inset-0 bg-black/30" />
      {/* Panel */}
      <div
        className={`relative z-10 mx-auto mt-24 w-[min(90vw,48rem)] rounded-2xl border bg-white p-4 shadow-xl ${className}`}
        onClick={stop}
        {...p}
      />
    </div>
  );
};

export const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...p
}) => <div className={`mb-2 ${className}`} {...p} />;

export const DialogTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...p
}) => <div className={`text-lg font-semibold ${className}`} {...p} />;

export const DialogDescription: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...p
}) => <div className={`text-sm text-slate-600 ${className}`} {...p} />;
