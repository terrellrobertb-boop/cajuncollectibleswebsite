import * as React from "react";

export function WhatnotIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 7l3.5 10 2.5-6 3 6 2.5-6L18 17l3-10" />
      <circle cx="12" cy="3" r="0.6" fill="currentColor" />
    </svg>
  );
}
