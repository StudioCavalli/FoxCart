"use client";

import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface MapProps {
  className?: string;
}

function Map({ className }: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current || !ref.current) return;
    initialized.current = true;

    const el = ref.current;

    async function init() {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");

      const map = L.map(el, {
        center: [SITE.address.lat, SITE.address.lng],
        zoom: 15,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
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

      L.marker([SITE.address.lat, SITE.address.lng], { icon }).addTo(map);

      L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);
      map.attributionControl.addAttribution("OpenStreetMap");
    }

    init();
  }, []);

  return <div ref={ref} className={cn("h-full w-full", className)} style={{ minHeight: 300 }} />;
}

export { Map };
