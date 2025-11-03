import React from "react";
import { createPortal } from "react-dom";

type DialogCtx = { open: boolean; setOpen: (v: boolean) => void };
const Ctx = React.createContext<DialogCtx | null>(null);

type RootProps = React.PropsWithChildren<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}>;

/** Dialog-root: kan brukes kontrollert (open/onOpenChange) eller ukontrollert. */
export const Dialog: React.FC<RootProps> = ({ open, onOpenChange, children }) => {
  const controlled = typeof open === "boolean";
  const [internal, setInternal] = React.useState(false);
  const isOpen = controlled ? (open as boolean) : internal;

  const setOpen = (v: boolean) => {
    if (!controlled) setInternal(v);
    onOpenChange?.(v);
  };

  // Lås body-scroll når åpen
  React.useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

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

type ContentProps = React.HTMLAttributes<HTMLDivElement>;

/** Innholdet rendres i portal og er sentrert på skjermen. Klikk utenfor eller Esc lukker. */
export const DialogContent: React.FC<ContentProps> = ({ className = "", children, ...rest }) => {
  const ctx = React.useContext(Ctx);
  if (!ctx || !ctx.open) return null;

  const stop: React.MouseEventHandler<HTMLDivElement> = (e) => e.stopPropagation();

  const node = (
    <div
      className="fixed inset-0 z-50 pointer-events-auto"
      onClick={() => ctx.setOpen(false)}
      aria-modal="true"
      role="dialog"
    >
      {/* Bakgrunn */}
      <div className="fixed inset-0 bg-black/40" />
      {/* Sentralisert panel */}
      <div className="fixed inset-0 flex items-center justify-center z-10" onClick={stop}>
        <div
          className={`w-[min(90vw,48rem)] rounded-2xl border bg-white p-6 shadow-xl ${className}`}
          {...rest}
        >
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
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
