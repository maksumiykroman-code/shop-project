"use client";

import * as React from "react";
import Image from "next/image";

export type ProductImage = {
  src: string;
  alt?: string;
};

export type BronzeSculptureProduct = {
  id: string;
  slug?: string;
  name: string;
  tagline?: string;
  description: string;
  price: number;
  currency?: string; // e.g. "USD", "EUR", "UAH"
  images?: ProductImage[];
  sku?: string;
  artist?: string;
  origin?: string;
  year?: string;
  finish?: string; // e.g. "Hand-patinated"
  edition?: string; // e.g. "1 of 12"
  availability?: "in_stock" | "made_to_order" | "sold_out";
  dimensions?: {
    heightCm?: number;
    widthCm?: number;
    depthCm?: number;
    weightKg?: number;
  };
  care?: string;
  shipping?: string;
};

export type ProductPageContentProps = {
  product: BronzeSculptureProduct;
  className?: string;
  primaryCta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCta?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
};

function cx(...values: Array<string | undefined | null | false>) {
  return values.filter(Boolean).join(" ");
}

function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString()} ${currency}`;
  }
}

function specRow(label: string, value?: string) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-6 py-2">
      <dt className="text-sm text-white/60">{label}</dt>
      <dd className="text-sm text-white/90">{value}</dd>
    </div>
  );
}

function dimValue(dim?: BronzeSculptureProduct["dimensions"]) {
  if (!dim) return undefined;
  const parts: string[] = [];
  if (typeof dim.heightCm === "number") parts.push(`H ${dim.heightCm} cm`);
  if (typeof dim.widthCm === "number") parts.push(`W ${dim.widthCm} cm`);
  if (typeof dim.depthCm === "number") parts.push(`D ${dim.depthCm} cm`);
  return parts.length ? parts.join(" · ") : undefined;
}

function weightValue(dim?: BronzeSculptureProduct["dimensions"]) {
  if (!dim || typeof dim.weightKg !== "number") return undefined;
  return `${dim.weightKg} kg`;
}

function availabilityLabel(
  availability?: BronzeSculptureProduct["availability"],
) {
  switch (availability) {
    case "in_stock":
      return { label: "Available", tone: "text-emerald-300" as const };
    case "made_to_order":
      return { label: "Made to order", tone: "text-amber-300" as const };
    case "sold_out":
      return { label: "Sold out", tone: "text-rose-300" as const };
    default:
      return undefined;
  }
}

export function ProductPageContent({
  product,
  className,
  primaryCta,
  secondaryCta,
}: ProductPageContentProps) {
  const images = (product.images ?? []).filter((i) => i?.src);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const safeActiveIndex = Math.min(
    Math.max(activeIndex, 0),
    Math.max(images.length - 1, 0),
  );
  const active = images[safeActiveIndex];

  const currency = product.currency ?? "USD";
  const price = formatMoney(product.price, currency);

  const availability = availabilityLabel(product.availability);
  const dimensions = dimValue(product.dimensions);
  const weight = weightValue(product.dimensions);

  const effectivePrimaryCta =
    primaryCta ??
    (product.availability === "sold_out"
      ? { label: "Join waitlist", href: "#inquire" }
      : { label: "Inquire to purchase", href: "#inquire" });

  const effectiveSecondaryCta =
    secondaryCta ?? { label: "View details", href: "#details" };

  return (
    <section
      className={cx(
        "w-full bg-neutral-950 text-neutral-50",
        "border border-white/10",
        "rounded-lg",
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-10 p-6 md:grid-cols-2 md:gap-12 md:p-10">
        <div className="md:sticky md:top-24">
          <div className="relative overflow-hidden rounded-md border border-white/10 bg-neutral-900">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-white/5" />
            <div className="relative aspect-[4/5] w-full">
              {active ? (
                <Image
                  src={active.src}
                  alt={active.alt ?? product.name}
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-white/50">
                  Image coming soon
                </div>
              )}
            </div>
          </div>

          {images.length > 1 ? (
            <div className="mt-4 grid grid-cols-5 gap-2">
              {images.slice(0, 10).map((img, idx) => {
                const isActive = idx === safeActiveIndex;
                return (
                  <button
                    key={`${img.src}-${idx}`}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`View image ${idx + 1}`}
                    className={cx(
                      "relative aspect-square overflow-hidden rounded-md border bg-neutral-900",
                      isActive
                        ? "border-amber-400/60 ring-2 ring-amber-400/30"
                        : "border-white/10 hover:border-white/20",
                      "transition",
                    )}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt ?? product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="min-w-0">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <p className="text-xs tracking-[0.22em] text-white/60">
                  BRONZE SCULPTURE
                </p>
                <h1 className="mt-2 text-balance text-3xl font-semibold leading-tight md:text-4xl">
                  {product.name}
                </h1>
                {product.tagline ? (
                  <p className="mt-2 text-pretty text-sm text-white/70">
                    {product.tagline}
                  </p>
                ) : null}
              </div>

              <div className="shrink-0 text-right">
                <p className="text-sm text-white/60">Price</p>
                <p className="mt-1 text-lg font-semibold text-white">{price}</p>
                {availability ? (
                  <p className={cx("mt-2 text-xs", availability.tone)}>
                    {availability.label}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {effectivePrimaryCta.href ? (
                <a
                  href={effectivePrimaryCta.href}
                  className={cx(
                    "inline-flex items-center justify-center rounded-md",
                    "bg-amber-400 px-4 py-2.5 text-sm font-semibold text-neutral-950",
                    "hover:bg-amber-300",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300",
                    "transition",
                  )}
                >
                  {effectivePrimaryCta.label}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={effectivePrimaryCta.onClick}
                  className={cx(
                    "inline-flex items-center justify-center rounded-md",
                    "bg-amber-400 px-4 py-2.5 text-sm font-semibold text-neutral-950",
                    "hover:bg-amber-300",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300",
                    "transition",
                  )}
                >
                  {effectivePrimaryCta.label}
                </button>
              )}

              {effectiveSecondaryCta.href ? (
                <a
                  href={effectiveSecondaryCta.href}
                  className={cx(
                    "inline-flex items-center justify-center rounded-md",
                    "border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white",
                    "hover:bg-white/10 hover:border-white/25",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40",
                    "transition",
                  )}
                >
                  {effectiveSecondaryCta.label}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={effectiveSecondaryCta.onClick}
                  className={cx(
                    "inline-flex items-center justify-center rounded-md",
                    "border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white",
                    "hover:bg-white/10 hover:border-white/25",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40",
                    "transition",
                  )}
                >
                  {effectiveSecondaryCta.label}
                </button>
              )}
            </div>

            <div className="mt-7 rounded-md border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm leading-relaxed text-white/80">
                {product.description}
              </p>
            </div>
          </div>

          <div id="details" className="mt-10">
            <h2 className="text-sm font-semibold tracking-wide text-white">
              Details
            </h2>
            <div className="mt-4 rounded-md border border-white/10 bg-neutral-950">
              <dl className="divide-y divide-white/10 px-4 py-2">
                {specRow("SKU", product.sku)}
                {specRow("Artist", product.artist)}
                {specRow("Origin", product.origin)}
                {specRow("Year", product.year)}
                {specRow("Material", "Cast bronze")}
                {specRow("Finish", product.finish)}
                {specRow("Edition", product.edition)}
                {specRow("Dimensions", dimensions)}
                {specRow("Weight", weight)}
              </dl>
            </div>
          </div>

          {(product.care || product.shipping) && (
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {product.care ? (
                <div className="rounded-md border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="text-sm font-semibold text-white">Care</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {product.care}
                  </p>
                </div>
              ) : null}
              {product.shipping ? (
                <div className="rounded-md border border-white/10 bg-white/[0.03] p-4">
                  <h3 className="text-sm font-semibold text-white">Shipping</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {product.shipping}
                  </p>
                </div>
              ) : null}
            </div>
          )}

          <div
            id="inquire"
            className="mt-10 rounded-md border border-white/10 bg-gradient-to-br from-amber-400/10 via-transparent to-white/5 p-5"
          >
            <h3 className="text-sm font-semibold text-white">Inquiry</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Request availability, shipping quote, or patina options. We respond
              within 1 business day.
            </p>
            <div className="mt-4">
              <a
                href="mailto:studio@example.com"
                className={cx(
                  "inline-flex items-center justify-center rounded-md",
                  "border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-200",
                  "hover:bg-amber-400/15 hover:border-amber-400/45",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300",
                  "transition",
                )}
              >
                Email studio@example.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductPageContent;
