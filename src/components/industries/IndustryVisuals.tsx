"use client";

import React from "react";
// Re-export top 3 visuals from the home industry visual system
export {
  Healthcare3DVisual,
  Finance3DVisual,
  Education3DVisual,
} from "../home/industries/Industry3DVisuals";

/**
 * 4. E-Commerce & Retail 3D Visual
 * 3D Isometric Emerald Shopping Tote & Conversion Radar on Glass Pedestal
 */
export function Ecommerce3DVisual({ className = "w-full h-48 sm:h-52" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none pointer-events-none`}>
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-56 overflow-visible drop-shadow-[0_12px_24px_rgba(0,143,83,0.12)]"
      >
        <defs>
          <radialGradient id="ecPlatShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="ecGlassTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#F3FFF7" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#D5F9E6" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="ecGlassEdgeL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BCE8CF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9BD8B6" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="ecGlassEdgeR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A3DAC0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#81C8A4" stopOpacity="0.65" />
          </linearGradient>

          <linearGradient id="ecBagFront" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="40%" stopColor="#00B86B" />
            <stop offset="100%" stopColor="#008F53" />
          </linearGradient>

          <linearGradient id="ecBagSide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#008F53" />
            <stop offset="100%" stopColor="#005B34" />
          </linearGradient>

          <linearGradient id="ecChromeHandle" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="160" cy="180" rx="95" ry="24" fill="url(#ecPlatShadow)" />

        {/* Glass Pedestal Base */}
        <g>
          <path d="M72 136 L160 170 L160 179 L72 145 Z" fill="url(#ecGlassEdgeL)" />
          <path d="M160 170 L248 136 L248 145 L160 179 Z" fill="url(#ecGlassEdgeR)" />
          <path d="M72 136 L160 102 L248 136 L160 170 Z" fill="url(#ecGlassTop)" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M82 135 L160 106 L238 135" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.8" fill="none" />
        </g>

        {/* 3D Shopping Tote / Bag */}
        <g transform="translate(10, 0)">
          {/* Bag Ground Shadow */}
          <ellipse cx="150" cy="155" rx="36" ry="12" fill="#008F53" fillOpacity="0.25" />

          {/* Bag Front Face */}
          <path d="M120 102 L175 120 L170 156 L115 138 Z" fill="url(#ecBagFront)" stroke="#86EFAC" strokeWidth="0.8" />

          {/* Bag Side Face */}
          <path d="M175 120 L198 108 L193 144 L170 156 Z" fill="url(#ecBagSide)" />

          {/* Bag Top Opening */}
          <path d="M120 102 L143 90 L198 108 L175 120 Z" fill="#005B34" />

          {/* White Specular Edge */}
          <line x1="120" y1="102" x2="175" y2="120" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.75" />

          {/* 3D Handle 1 (Front) */}
          <path
            d="M136 107 C136 82 158 82 158 114"
            stroke="url(#ecChromeHandle)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* 3D Handle 2 (Back) */}
          <path
            d="M148 97 C148 76 170 76 170 104"
            stroke="#94A3B8"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Floating Tag % */}
          <g transform="translate(182, 116) rotate(15)">
            <rect x="0" y="0" width="24" height="15" rx="3" fill="#E9FFF2" stroke="#008F53" strokeWidth="1" />
            <circle cx="5" cy="7.5" r="1.5" fill="#008F53" />
            <text x="10" y="11" fill="#008F53" fontSize="8" fontWeight="bold" fontFamily="sans-serif">%</text>
          </g>
        </g>

        {/* Ambient Sparkles */}
        <circle cx="218" cy="75" r="2.5" fill="#34D399" fillOpacity="0.8" />
        <circle cx="95" cy="115" r="2" fill="#00B86B" fillOpacity="0.7" />
      </svg>
    </div>
  );
}

/**
 * 5. Manufacturing & Industrial IoT 3D Visual
 * 3D Precision Robotic Joint & Laser Scanner on Glass Pedestal
 */
export function Manufacturing3DVisual({ className = "w-full h-48 sm:h-52" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none pointer-events-none`}>
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-56 overflow-visible drop-shadow-[0_12px_24px_rgba(0,143,83,0.12)]"
      >
        <defs>
          <radialGradient id="mfPlatShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="mfGlassTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#F3FFF7" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#D5F9E6" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="mfGlassEdgeL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BCE8CF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9BD8B6" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="mfGlassEdgeR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A3DAC0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#81C8A4" stopOpacity="0.65" />
          </linearGradient>

          <linearGradient id="mfArmGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#008F53" />
            <stop offset="100%" stopColor="#004D2B" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="160" cy="180" rx="95" ry="24" fill="url(#mfPlatShadow)" />

        {/* Glass Pedestal */}
        <g>
          <path d="M72 136 L160 170 L160 179 L72 145 Z" fill="url(#mfGlassEdgeL)" />
          <path d="M160 170 L248 136 L248 145 L160 179 Z" fill="url(#mfGlassEdgeR)" />
          <path d="M72 136 L160 102 L248 136 L160 170 Z" fill="url(#mfGlassTop)" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M82 135 L160 106 L238 135" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.8" fill="none" />
        </g>

        {/* Robotic Joint & Sensor Array */}
        <g>
          {/* Base Turret Cylinder */}
          <ellipse cx="160" cy="144" rx="28" ry="14" fill="#007242" />
          <ellipse cx="160" cy="138" rx="28" ry="14" fill="#008F53" stroke="#86EFAC" strokeWidth="1" />
          <circle cx="160" cy="138" r="10" fill="#34D399" />

          {/* Arm Link 1 */}
          <path d="M152 136 L130 92 L146 84 L168 128 Z" fill="url(#mfArmGrad)" stroke="#86EFAC" strokeWidth="0.8" />
          <circle cx="138" cy="88" r="9" fill="#005B34" stroke="#86EFAC" strokeWidth="1.5" />

          {/* Arm Link 2 */}
          <path d="M138 88 L185 64 L193 76 L146 100 Z" fill="url(#mfArmGrad)" />
          <circle cx="189" cy="70" r="8" fill="#34D399" />

          {/* Laser Scanner Head */}
          <path d="M189 70 L200 95 L182 95 Z" fill="#008F53" />

          {/* Laser Scanning Cone Beam */}
          <polygon points="191,95 150,146 220,135" fill="#34D399" fillOpacity="0.25" />
          <line x1="150" y1="146" x2="220" y2="135" stroke="#00B86B" strokeWidth="2" strokeDasharray="3 3" />
        </g>

        {/* Ambient Specular Particles */}
        <circle cx="218" cy="55" r="2.5" fill="#34D399" fillOpacity="0.85" />
        <circle cx="95" cy="85" r="2" fill="#00B86B" fillOpacity="0.6" />
      </svg>
    </div>
  );
}

/**
 * 6. Real Estate & PropTech 3D Visual
 * 3D Isometric Architectural Glass Building on Glass Pedestal
 */
export function RealEstate3DVisual({ className = "w-full h-48 sm:h-52" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none pointer-events-none`}>
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-56 overflow-visible drop-shadow-[0_12px_24px_rgba(0,143,83,0.12)]"
      >
        <defs>
          <radialGradient id="rePlatShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="reGlassTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#F3FFF7" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#D5F9E6" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="reGlassEdgeL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BCE8CF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9BD8B6" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="reGlassEdgeR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A3DAC0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#81C8A4" stopOpacity="0.65" />
          </linearGradient>

          <linearGradient id="reBldgLeft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="60%" stopColor="#008F53" />
            <stop offset="100%" stopColor="#005B34" />
          </linearGradient>

          <linearGradient id="reBldgRight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="50%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#008F53" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="160" cy="180" rx="95" ry="24" fill="url(#rePlatShadow)" />

        {/* Glass Pedestal */}
        <g>
          <path d="M72 136 L160 170 L160 179 L72 145 Z" fill="url(#reGlassEdgeL)" />
          <path d="M160 170 L248 136 L248 145 L160 179 Z" fill="url(#reGlassEdgeR)" />
          <path d="M72 136 L160 102 L248 136 L160 170 Z" fill="url(#reGlassTop)" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M82 135 L160 106 L238 135" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.8" fill="none" />
        </g>

        {/* 3D Modern Architectural Tower */}
        <g>
          {/* Building Left Facade */}
          <path d="M132 80 L160 96 L160 156 L132 140 Z" fill="url(#reBldgLeft)" stroke="#004D2B" strokeWidth="0.8" />

          {/* Building Right Facade */}
          <path d="M160 96 L195 78 L195 138 L160 156 Z" fill="url(#reBldgRight)" stroke="#34D399" strokeWidth="0.8" />

          {/* Rooftop Terrace Slab */}
          <path d="M132 80 L167 62 L195 78 L160 96 Z" fill="#86EFAC" stroke="#FFFFFF" strokeWidth="1" />

          {/* Architectural Floor Dividers & Windows */}
          <line x1="132" y1="95" x2="160" y2="111" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.75" />
          <line x1="132" y1="110" x2="160" y2="126" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.75" />
          <line x1="132" y1="125" x2="160" y2="141" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.75" />

          <line x1="160" y1="111" x2="195" y2="93" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.75" />
          <line x1="160" y1="126" x2="195" y2="108" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.75" />
          <line x1="160" y1="141" x2="195" y2="123" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.75" />

          {/* Floating Location Marker Node */}
          <g transform="translate(167, 44)">
            <circle cx="0" cy="0" r="5" fill="#00B86B" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="0" y1="5" x2="0" y2="18" stroke="#00B86B" strokeWidth="1.5" strokeDasharray="2 2" />
          </g>
        </g>

        {/* Ambient Specular Particles */}
        <circle cx="218" cy="65" r="2.5" fill="#34D399" fillOpacity="0.85" />
        <circle cx="95" cy="110" r="1.8" fill="#00B86B" fillOpacity="0.6" />
      </svg>
    </div>
  );
}

/**
 * 7. Logistics & Transportation 3D Visual
 * 3D Isometric Transport Container & GPS Waypoints on Glass Pedestal
 */
export function Logistics3DVisual({ className = "w-full h-48 sm:h-52" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none pointer-events-none`}>
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-56 overflow-visible drop-shadow-[0_12px_24px_rgba(0,143,83,0.12)]"
      >
        <defs>
          <radialGradient id="lgPlatShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="lgGlassTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#F3FFF7" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#D5F9E6" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="lgGlassEdgeL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BCE8CF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9BD8B6" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="lgGlassEdgeR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A3DAC0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#81C8A4" stopOpacity="0.65" />
          </linearGradient>

          <linearGradient id="lgCargoFront" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#008F53" />
            <stop offset="100%" stopColor="#005B34" />
          </linearGradient>

          <linearGradient id="lgCargoTop" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#86EFAC" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="160" cy="180" rx="95" ry="24" fill="url(#lgPlatShadow)" />

        {/* Glass Pedestal */}
        <g>
          <path d="M72 136 L160 170 L160 179 L72 145 Z" fill="url(#lgGlassEdgeL)" />
          <path d="M160 170 L248 136 L248 145 L160 179 Z" fill="url(#lgGlassEdgeR)" />
          <path d="M72 136 L160 102 L248 136 L160 170 Z" fill="url(#lgGlassTop)" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M82 135 L160 106 L238 135" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.8" fill="none" />
        </g>

        {/* 3D Cargo / Freight Container Block */}
        <g transform="translate(10, 0)">
          {/* Container Left Face */}
          <path d="M108 112 L155 136 L155 160 L108 136 Z" fill="url(#lgCargoFront)" stroke="#86EFAC" strokeWidth="0.8" />
          {/* Corrugation ribs */}
          <line x1="120" y1="118" x2="120" y2="142" stroke="#004D2B" strokeWidth="1.2" />
          <line x1="132" y1="124" x2="132" y2="148" stroke="#004D2B" strokeWidth="1.2" />
          <line x1="144" y1="130" x2="144" y2="154" stroke="#004D2B" strokeWidth="1.2" />

          {/* Container Right Face */}
          <path d="M155 136 L202 112 L202 136 L155 160 Z" fill="#005B34" />
          <line x1="170" y1="128" x2="170" y2="152" stroke="#004728" strokeWidth="1.2" />
          <line x1="185" y1="120" x2="185" y2="144" stroke="#004728" strokeWidth="1.2" />

          {/* Container Top Lid */}
          <path d="M108 112 L155 88 L202 112 L155 136 Z" fill="url(#lgCargoTop)" stroke="#FFFFFF" strokeWidth="1" />

          {/* Curving Transit GPS Route Vector */}
          <path
            d="M90 148 C115 170 175 165 210 135"
            stroke="#00B86B"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="4 3"
            fill="none"
          />
          <circle cx="90" cy="148" r="4" fill="#008F53" stroke="#FFFFFF" strokeWidth="1.5" />
          <circle cx="210" cy="135" r="4" fill="#00B86B" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* Ambient Specular Particles */}
        <circle cx="225" cy="75" r="2.5" fill="#34D399" fillOpacity="0.8" />
        <circle cx="95" cy="95" r="2" fill="#008F53" fillOpacity="0.6" />
      </svg>
    </div>
  );
}

/**
 * 8. Professional Services & Legal 3D Visual
 * 3D Isometric Cryptographic Smart Document & Verification Shield on Glass Pedestal
 */
export function LegalServices3DVisual({ className = "w-full h-48 sm:h-52" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none pointer-events-none`}>
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-56 overflow-visible drop-shadow-[0_12px_24px_rgba(0,143,83,0.12)]"
      >
        <defs>
          <radialGradient id="legPlatShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="legGlassTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#F3FFF7" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#D5F9E6" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="legGlassEdgeL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BCE8CF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9BD8B6" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="legGlassEdgeR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A3DAC0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#81C8A4" stopOpacity="0.65" />
          </linearGradient>

          <linearGradient id="legShieldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="45%" stopColor="#00B86B" />
            <stop offset="100%" stopColor="#006C3E" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="160" cy="180" rx="95" ry="24" fill="url(#legPlatShadow)" />

        {/* Glass Pedestal */}
        <g>
          <path d="M72 136 L160 170 L160 179 L72 145 Z" fill="url(#legGlassEdgeL)" />
          <path d="M160 170 L248 136 L248 145 L160 179 Z" fill="url(#legGlassEdgeR)" />
          <path d="M72 136 L160 102 L248 136 L160 170 Z" fill="url(#legGlassTop)" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M82 135 L160 106 L238 135" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.8" fill="none" />
        </g>

        {/* 3D Smart Contract Document Slab */}
        <g transform="translate(10, 0)">
          {/* Document Sheet */}
          <path d="M115 118 L160 142 L198 122 L153 98 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
          {/* Text line representations */}
          <line x1="130" y1="120" x2="155" y2="133" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="135" y1="126" x2="165" y2="142" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="150" y1="114" x2="185" y2="132" stroke="#00B86B" strokeWidth="1.5" strokeLinecap="round" />

          {/* Floating 3D Cryptographic Shield */}
          <g transform="translate(156, 75)">
            <path
              d="M0 -22 C14 -22 24 -14 24 2 C24 22 4 36 0 40 C-4 36 -24 22 -24 2 C-24 -14 -14 -22 0 -22 Z"
              fill="url(#legShieldGrad)"
              stroke="#86EFAC"
              strokeWidth="1.5"
            />
            {/* Shield Checkmark Stamp */}
            <path
              d="M-8 4 L-2 10 L10 -4"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>
        </g>

        {/* Ambient Specular Particles */}
        <circle cx="218" cy="62" r="2.5" fill="#34D399" fillOpacity="0.85" />
        <circle cx="95" cy="115" r="2" fill="#008F53" fillOpacity="0.6" />
      </svg>
    </div>
  );
}

/**
 * 9. Hospitality & Restaurants 3D Visual
 * 3D Isometric Dining Cloche, POS Order Slip & Guest Telemetry
 */
export function Hospitality3DVisual({ className = "w-full h-48 sm:h-52" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none pointer-events-none`}>
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-56 overflow-visible drop-shadow-[0_12px_24px_rgba(0,143,83,0.12)]"
      >
        <defs>
          <radialGradient id="hospPlatShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008F53" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#008F53" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#008F53" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="hospGlassTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#F3FFF7" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#D5F9E6" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="hospGlassEdgeL" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BCE8CF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9BD8B6" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="hospGlassEdgeR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A3DAC0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#81C8A4" stopOpacity="0.65" />
          </linearGradient>

          <linearGradient id="hospCloche" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#00B86B" />
            <stop offset="100%" stopColor="#008F53" />
          </linearGradient>

          <linearGradient id="hospGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="160" cy="180" rx="95" ry="24" fill="url(#hospPlatShadow)" />

        {/* Glass Pedestal */}
        <g>
          <path d="M72 136 L160 170 L160 179 L72 145 Z" fill="url(#hospGlassEdgeL)" />
          <path d="M160 170 L248 136 L248 145 L160 179 Z" fill="url(#hospGlassEdgeR)" />
          <path d="M72 136 L160 102 L248 136 L160 170 Z" fill="url(#hospGlassTop)" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M82 135 L160 106 L238 135" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.8" fill="none" />
        </g>

        {/* Center Stage: 3D Dining Cloche / Serving Platter */}
        <g transform="translate(160, 118)">
          {/* Base Serving Platter Rim */}
          <ellipse cx="0" cy="16" rx="42" ry="16" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1.2" />
          <ellipse cx="0" cy="14" rx="36" ry="13" fill="#E9FFF2" stroke="#00B86B" strokeWidth="1" />

          {/* Dome Cloche */}
          <path
            d="M-30 12 C-30 -16 -18 -32 0 -32 C18 -32 30 -16 30 12 Z"
            fill="url(#hospCloche)"
            stroke="#FFFFFF"
            strokeWidth="1.2"
          />

          {/* Cloche Knob Handle */}
          <circle cx="0" cy="-35" r="4.5" fill="url(#hospGold)" stroke="#FFFFFF" strokeWidth="0.8" />

          {/* Cloche Accent Shimmer */}
          <path
            d="M-18 6 C-18 -8 -10 -22 0 -24"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeOpacity="0.8"
            fill="none"
          />
        </g>

        {/* Left Side: Digital KDS Order Slip */}
        <g transform="translate(48, 70)">
          <path d="M0 0 L46 -12 L54 36 L8 48 Z" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" />
          <line x1="10" y1="8" x2="38" y2="0" stroke="#008F53" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="12" y1="16" x2="42" y2="8" stroke="#64736F" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="14" y1="24" x2="40" y2="17" stroke="#64736F" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="22" cy="36" r="3" fill="#00B86B" />
          <text x="29" y="38" fill="#142A27" fontSize="7" fontWeight="bold">KDS Ready</text>
        </g>

        {/* Right Side: 5-Star Rating & Turnover Telemetry Badge */}
        <g transform="translate(188, 48)">
          <rect x="0" y="0" width="118" height="32" rx="16" fill="#FFFFFF" stroke="#DFEDE5" strokeWidth="1" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.06))" />
          <circle cx="16" cy="16" r="4.5" fill="#00B86B" />
          <text x="28" y="20" fill="#142A27" fontSize="10" fontFamily="monospace" fontWeight="bold">+40% Turnover</text>
        </g>

        {/* Ambient Specular Lighting */}
        <circle cx="228" cy="74" r="2.5" fill="#34D399" fillOpacity="0.85" />
        <circle cx="85" cy="120" r="2" fill="#008F53" fillOpacity="0.6" />
      </svg>
    </div>
  );
}

