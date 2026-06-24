import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "gold" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wide transition-all duration-200 rounded-md select-none whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none active:translate-y-px";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-orange text-cream shadow-[0_4px_0_0_rgba(0,0,0,0.25)] hover:bg-orange-bright hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_rgba(0,0,0,0.25)]",
  secondary:
    "bg-transparent text-cream border-2 border-cream/80 hover:bg-cream/10 hover:border-cream",
  gold: "bg-gold text-charcoal shadow-[0_4px_0_0_rgba(0,0,0,0.2)] hover:bg-gold-bright hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_rgba(0,0,0,0.2)]",
  ghost:
    "bg-transparent text-charcoal border-2 border-charcoal/30 hover:bg-charcoal/5 hover:border-charcoal/60",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "children" | "className">)
  | ({ href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
);

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    const external = typeof href === "string" && /^https?:\/\//.test(href);
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href as string} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
