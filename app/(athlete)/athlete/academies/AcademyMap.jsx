"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

const SPORT_COLORS = {
  Football: "#FF5722",
  Cricket: "#22C55E",
  Swimming: "#3B82F6",
  Athletics: "#F59E0B",
  Badminton: "#A855F7",
  Basketball: "#14B8A6",
  Tennis: "#EC4899",
  Boxing: "#EF4444",
};

export default function AcademyMap({ academies, onMarkerClick, searchLocation }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const tileLayerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    import("leaflet").then((L) => {
      // Fix default icon paths
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapInstanceRef.current && mapRef.current) {
        const map = L.map(mapRef.current, {
          center: [20.5937, 78.9629],
          zoom: 5,
          zoomControl: false,
          scrollWheelZoom: false,
        });

        // Stadia Alidade Smooth Dark — visible dark-grey style
        tileLayerRef.current = L.tileLayer(
          "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
          {
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>',
            maxZoom: 20,
          }
        ).addTo(map);

        // Custom zoom control bottom-right
        L.control.zoom({ position: "bottomright" }).addTo(map);

        mapInstanceRef.current = map;
      }

      // Clear old markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      const map = mapInstanceRef.current;

      academies.forEach((aca) => {
        if (!aca.coords) return;
        const color = SPORT_COLORS[aca.sport] || "#FF5722";

        const icon = L.divIcon({
          className: "",
          html: `
            <div style="
              width:36px;height:36px;
              background:${color};
              border:2px solid rgba(255,255,255,0.3);
              border-radius:50% 50% 50% 0;
              transform:rotate(-45deg);
              box-shadow:0 4px 14px ${color}88;
              display:flex;align-items:center;justify-content:center;
            ">
              <span style="transform:rotate(45deg);font-size:14px;">${aca.emoji}</span>
            </div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -38],
        });

        const marker = L.marker(aca.coords, { icon })
          .addTo(map)
          .bindPopup(
            `<div style="background:#0f0f0f;color:#fff;border-radius:10px;padding:10px 14px;min-width:180px;border:1px solid #222;">
              <div style="font-size:11px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:1px;">${aca.sport}</div>
              <div style="font-size:13px;font-weight:700;margin:4px 0 2px;">${aca.name}</div>
              <div style="font-size:11px;color:#808080;">${aca.location}</div>
              <div style="font-size:12px;color:${color};font-weight:600;margin-top:6px;">${aca.fees}</div>
            </div>`,
            { className: "athlixir-popup" }
          );

        marker.on("click", () => onMarkerClick && onMarkerClick(aca.id));
        markersRef.current.push(marker);
      });

      // Fit bounds to visible markers
      if (academies.length > 0 && academies.some((a) => a.coords)) {
        const coords = academies.filter((a) => a.coords).map((a) => a.coords);
        if (coords.length === 1) {
          map.setView(coords[0], 12);
        } else {
          map.fitBounds(coords, { padding: [40, 40] });
        }
      }
    });
  }, [academies]);

  // Pan to searched location
  useEffect(() => {
    if (!searchLocation || !mapInstanceRef.current) return;
    import("leaflet").then((L) => {
      mapInstanceRef.current.setView(searchLocation, 12);
    });
  }, [searchLocation]);

  return (
    <>
      <style>{`
        .athlixir-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .athlixir-popup .leaflet-popup-tip { display: none; }
        .athlixir-popup .leaflet-popup-content { margin: 0 !important; }
        .leaflet-container { background: #1a1a2e; z-index: 0 !important; }
        .leaflet-pane { z-index: 0 !important; }
        .leaflet-top, .leaflet-bottom { z-index: 1 !important; }
        .leaflet-control-zoom a {
          background: #0f0f0f !important;
          color: #fff !important;
          border-color: #222 !important;
        }
        .leaflet-control-zoom a:hover { background: #FF5722 !important; }
        .leaflet-control-attribution {
          background: rgba(0,0,0,0.6) !important;
          color: #555 !important;
          font-size: 9px !important;
        }
        .leaflet-control-attribution a { color: #777 !important; }
      `}</style>
      <div ref={mapRef} style={{ width: "100%", height: "100%", minHeight: "320px" }} />
    </>
  );
}
