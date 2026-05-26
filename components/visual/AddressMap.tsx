"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface AddressMapProps {
  address: string;
  className?: string;
}

function AddressMap({ address, className }: AddressMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ref.current || !address) return;

    let cancelled = false;

    async function init() {
      const geocodeRes = await fetch(
        `https://api-adresse.data.gouv.fr/search?q=${encodeURIComponent(address)}&limit=1`,
      );
      if (cancelled) return;
      const geo = await geocodeRes.json();
      const coords = geo.features?.[0]?.geometry?.coordinates as [number, number] | undefined;
      if (!coords || cancelled) return;

      const [lng, lat] = coords;
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      if (cancelled || !ref.current) return;

      if (mapRef.current) {
        mapRef.current.setView([lat, lng], 15);
        return;
      }

      const map = L.map(ref.current, {
        center: [lat, lng],
        zoom: 15,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        html: `<div style="width:12px;height:12px;background:#ff6b00;border-radius:50%;border:2px solid #0a0a0a;box-shadow:0 0 12px rgba(255,107,0,0.4)"></div>`,
        className: "",
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });

      L.marker([lat, lng], { icon }).addTo(map);
      mapRef.current = map;
      setReady(true);
    }

    init();

    return () => {
      cancelled = true;
    };
  }, [address]);

  return (
    <div
      ref={ref}
      className={cn("h-full w-full bg-surface", className)}
      style={{ minHeight: 200 }}
    />
  );
}

export { AddressMap };
