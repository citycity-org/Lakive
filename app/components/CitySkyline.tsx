'use client'
import React from 'react'

// ─── design tokens ────────────────────────────────────────────────────────────
const G   = 205                             // ground line y (canvas 900 × 220)
const FS  = 'rgba(255,255,255,0.28)'        // far building stroke
const MS  = 'rgba(255,255,255,0.40)'        // mid building stroke
const NS  = 'rgba(255,255,255,0.58)'        // near building stroke
const TLS = '#14B8A6'                       // teal landmark stroke
const TLF = 'rgba(20,184,166,0.15)'        // teal landmark thin fill
const WA  = 'rgba(20,50,120,0.18)'         // water fill
const MT  = 'rgba(255,255,255,0.20)'       // mountain/terrain stroke
const MTF = 'rgba(255,255,255,0.04)'       // mountain subtle fill
const WIN = 'rgba(255,255,255,0.10)'       // window fill

// stroke-width by layer
const SW: Record<string, number> = { [FS]: 0.7, [MS]: 0.85, [NS]: 1.0 }

// building outline from ground
function B(x: number, h: number, w: number, stroke = MS) {
  const sw = SW[stroke] ?? 0.85
  return <rect key={`${x}-${h}`} x={x} y={G - h} width={w} height={h} fill="none" stroke={stroke} strokeWidth={sw} />
}

// building with window grid (for prominent near-ground towers)
function BW(x: number, h: number, w: number, rows = 3) {
  const colCount = Math.max(1, Math.floor(w / 14))
  const colW     = Math.floor(w / colCount)
  const rowH     = Math.max(14, Math.min(Math.floor((h - 10) / (rows + 1)), 22))
  const wins: React.ReactNode[] = []
  for (let r = 1; r <= rows; r++) {
    for (let c = 0; c < colCount; c++) {
      const wy = G - h + r * rowH
      if (wy < G - 6) {
        wins.push(<rect key={`w${x}-${r}-${c}`} x={x + 4 + c * colW} y={wy} width={Math.max(2, colW - 7)} height={3} fill={WIN} />)
      }
    }
  }
  return <>
    <rect x={x} y={G - h} width={w} height={h} fill="none" stroke={NS} strokeWidth={1.0} />
    {wins}
  </>
}

// ─── city skylines ─────────────────────────────────────────────────────────────

function Vancouver() {
  return <>
    {/* North Shore mountains */}
    <polygon points="0,160 80,112 140,138 220,95 300,118 380,100 460,130 900,155 900,220 0,220" fill={MTF} stroke={MT} strokeWidth={0.8} />
    {/* Water strip */}
    <rect x={0} y={198} width={900} height={22} fill={WA} />
    {/* Far background towers */}
    {B(310,52,24,FS)} {B(345,68,28,FS)} {B(385,82,30,FS)} {B(428,58,22,FS)}
    {/* Mid-ground glass condos */}
    {B(465,95,36,MS)} {B(510,118,40,MS)} {B(562,105,38,MS)} {B(612,88,34,MS)}
    {B(658,130,42,MS)} {B(712,102,38,MS)} {B(762,82,34,MS)} {B(808,65,30,MS)}
    {/* Foreground cluster with windows */}
    {BW(480,110,18,2)} {BW(540,140,20,3)} {BW(595,122,18,2)} {BW(640,148,22,3)} {BW(700,115,20,2)}
    {/* Harbour Centre — thin shaft + observation disc */}
    <rect x={488} y={G-165} width={6} height={160} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    <ellipse cx={491} cy={G-170} rx={18} ry={8} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    <rect x={490} y={G-183} width={3} height={14} fill={TLS} />
  </>
}

function Toronto() {
  return <>
    {/* Lake Ontario */}
    <rect x={0} y={196} width={900} height={24} fill={WA} />
    {/* CN Tower — ultra thin with SkyPod disc */}
    <rect x={197} y={G-188} width={7} height={183} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    <ellipse cx={200} cy={G-128} rx={22} ry={11} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    <rect x={199} y={G-192} width={3} height={8} fill={TLS} />
    {/* Financial district towers */}
    {B(260,95,38,MS)} {B(308,115,42,MS)} {B(360,138,45,MS)}
    {BW(415,128,44,3)} {BW(470,155,48,3)} {BW(530,142,46,3)}
    {B(588,135,44,MS)} {B(644,118,42,MS)}
    {B(698,105,40,MS)} {B(748,92,36,MS)} {B(795,78,32,MS)} {B(838,65,28,FS)}
    {/* Background towers */}
    {B(250,65,22,FS)} {B(850,55,26,FS)} {B(875,48,22,FS)}
  </>
}

function Calgary() {
  return <>
    {/* Rocky Mountains background */}
    <polygon points="0,145 60,105 120,125 180,88 240,110 300,125 360,108 420,130 600,148 900,155 900,220 0,220" fill={MTF} stroke={MT} strokeWidth={0.8} />
    {/* Downtown core */}
    {B(350,62,28,FS)} {B(390,78,32,FS)} {B(432,92,36,MS)} {B(480,108,40,MS)}
    {B(532,125,44,MS)} {B(588,118,42,MS)} {B(640,105,38,MS)} {B(688,88,34,FS)}
    {/* Bow Tower — tallest, with window detail */}
    {BW(540,162,44,4)}
    {/* Teal accent cap on Bow Tower */}
    <rect x={540} y={G-168} width={44} height={6} fill={TLF} stroke={TLS} strokeWidth={1} rx={2} />
    {/* Saddledome curve */}
    <path d={`M680,${G} Q720,${G-42} 760,${G} Z`} fill="none" stroke={MS} strokeWidth={0.85} />
  </>
}

function Montreal() {
  return <>
    {/* St. Lawrence River */}
    <rect x={0} y={197} width={900} height={23} fill={WA} />
    {/* Mont Royal silhouette */}
    <polygon points="0,155 100,128 200,140 300,158 900,162 900,220 0,220" fill={MTF} stroke={MT} strokeWidth={0.8} opacity={0.6} />
    {/* Mixed skyline */}
    {B(280,72,30,FS)} {B(322,88,34,FS)} {B(368,102,38,MS)} {B(418,118,42,MS)}
    {BW(470,135,44,3)} {BW(526,128,42,3)}
    {B(578,115,40,MS)} {B(628,98,36,MS)}
    {B(670,82,32,FS)} {B(710,68,28,FS)}
    {/* Olympic Stadium — inclined tower */}
    <rect x={760} y={G-145} width={10} height={140} fill={TLF} stroke={TLS} strokeWidth={1.5} rx={2}
      style={{ transform: 'rotate(12deg)', transformOrigin: '765px 205px' }} />
    <path d={`M740,${G} Q760,${G-148} 790,${G-140}`} fill="none" stroke={TLS} strokeWidth={2.5} />
    {/* Foreground */}
    {BW(430,142,20,2)} {BW(500,148,22,2)} {BW(555,138,20,2)}
  </>
}

function Ottawa() {
  return <>
    {/* Ottawa River */}
    <rect x={0} y={198} width={900} height={22} fill={WA} />
    {/* Gatineau Hills background */}
    <polygon points="0,160 120,138 240,152 360,142 480,158 900,165 900,220 0,220" fill={MTF} stroke={MT} strokeWidth={0.8} opacity={0.5} />
    {/* Parliament buildings — Centre Block */}
    <rect x={380} y={G-75} width={140} height={70} fill="none" stroke={MS} strokeWidth={0.85} />
    {/* Peace Tower — Gothic spire */}
    <rect x={440} y={G-140} width={22} height={65} fill="none" stroke={NS} strokeWidth={1.0} />
    {/* Spire */}
    <polygon points={`445,${G-185} 451.5,${G-140} 458,${G-185}`} fill={TLS} />
    <rect x={449} y={G-202} width={5} height={18} fill={TLS} />
    {/* Corner turrets */}
    <rect x={380} y={G-95} width={18} height={20} fill="none" stroke={NS} strokeWidth={1.0} />
    <rect x={502} y={G-95} width={18} height={20} fill="none" stroke={NS} strokeWidth={1.0} />
    {/* City buildings */}
    {B(260,60,28,FS)} {B(300,72,32,FS)} {B(540,82,36,MS)} {B(590,68,30,MS)}
    {B(640,55,26,FS)} {B(700,48,24,FS)} {B(740,42,22,FS)}
  </>
}

function Edmonton() {
  return <>
    {/* North Saskatchewan River valley */}
    <polygon points="0,170 300,175 380,195 460,178 900,170 900,220 0,220" fill={MTF} stroke={MT} strokeWidth={0.8} opacity={0.55} />
    {/* Downtown towers */}
    {B(380,72,30,FS)} {B(422,88,34,MS)} {B(468,108,40,MS)}
    {BW(522,128,44,3)} {BW(576,120,42,3)}
    {B(630,105,38,MS)} {B(678,88,34,MS)} {B(722,72,30,FS)}
    {/* Manulife Place landmark */}
    {BW(528,148,38,4)}
    <rect x={526} y={G-152} width={42} height={5} fill={TLF} stroke={TLS} strokeWidth={1} rx={2} />
    {/* High Level Bridge arch */}
    <path d={`M50,${G} Q200,${G-55} 350,${G}`} fill="none" stroke={MS} strokeWidth={1.2} />
  </>
}

function Winnipeg() {
  return <>
    {/* Prairie water hint */}
    <rect x={0} y={195} width={900} height={25} fill={WA} opacity={0.4} />
    {/* Modest downtown */}
    {B(330,55,26,FS)} {B(368,70,30,FS)} {B(408,88,36,MS)} {B(452,102,40,MS)}
    {BW(502,118,44,3)} {BW(556,110,42,2)}
    {B(608,95,38,MS)} {B(658,78,32,MS)}
    {B(700,62,28,FS)} {B(740,52,24,FS)}
    {/* Richardson Building */}
    {BW(466,135,36,3)}
    <rect x={468} y={G-140} width={32} height={5} fill={TLF} stroke={TLS} strokeWidth={1} rx={2} />
    {/* Forks bridge arch */}
    <path d={`M100,${G} Q200,${G-38} 300,${G}`} fill="none" stroke={FS} strokeWidth={0.9} />
  </>
}

function Halifax() {
  return <>
    {/* Halifax Harbour */}
    <rect x={0} y={195} width={900} height={25} fill={WA} />
    {/* Citadel Hill */}
    <polygon points="150,160 230,145 310,160 310,205 150,205" fill={MTF} stroke={MT} strokeWidth={0.8} opacity={0.6} />
    <polygon points="180,148 230,135 280,148" fill={MTF} stroke={MT} strokeWidth={0.8} opacity={0.7} />
    {/* Waterfront buildings */}
    {B(340,48,24,FS)} {B(376,60,28,FS)} {B(416,75,32,MS)} {B(460,92,36,MS)}
    {BW(508,110,40,2)} {BW(560,100,38,2)}
    {B(608,85,34,MS)} {B(650,68,30,MS)}
    {B(690,55,26,FS)} {B(730,46,22,FS)}
    {/* Purdy's Wharf towers */}
    {BW(488,118,30,3)} {BW(526,108,30,3)}
    <rect x={488} y={G-122} width={68} height={4} fill={TLF} stroke={TLS} strokeWidth={1} rx={2} />
  </>
}

function Victoria() {
  return <>
    {/* Inner Harbour */}
    <rect x={0} y={193} width={900} height={27} fill={WA} />
    {/* Parliament — outline body */}
    <rect x={350} y={G-80} width={140} height={75} fill="none" stroke={MS} strokeWidth={0.85} />
    {/* Dome */}
    <ellipse cx={420} cy={G-85} rx={35} ry={22} fill="none" stroke={NS} strokeWidth={1.0} />
    <rect x={416} y={G-108} width={8} height={24} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    <ellipse cx={420} cy={G-112} rx={6} ry={5} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    {/* Empress Hotel */}
    <rect x={520} y={G-75} width={90} height={70} fill="none" stroke={MS} strokeWidth={0.85} />
    <rect x={525} y={G-88} width={18} height={18} fill="none" stroke={NS} strokeWidth={1.0} />
    <polygon points={`525,${G-100} 534,${G-88} 543,${G-100}`} fill={TLS} />
    <rect x={572} y={G-88} width={18} height={18} fill="none" stroke={NS} strokeWidth={1.0} />
    <polygon points={`572,${G-100} 581,${G-88} 590,${G-100}`} fill={TLS} />
    {/* Other buildings */}
    {B(260,48,26,FS)} {B(300,58,28,FS)} {B(640,65,28,MS)} {B(678,55,24,MS)} {B(720,45,22,FS)}
  </>
}

function Hamilton() {
  return <>
    {/* Niagara Escarpment cliff */}
    <polygon points="0,120 200,125 250,145 300,148 900,155 900,220 0,220" fill={MTF} stroke={MT} strokeWidth={0.8} opacity={0.65} />
    {/* Industrial silhouette */}
    <rect x={80} y={G-65} width={50} height={65} fill="none" stroke={MS} strokeWidth={0.85} />
    <rect x={140} y={G-52} width={40} height={52} fill="none" stroke={MS} strokeWidth={0.85} />
    {/* Smokestacks */}
    <rect x={92} y={G-100} width={8} height={50} fill="none" stroke={FS} strokeWidth={0.7} />
    <rect x={110} y={G-90} width={8} height={40} fill="none" stroke={FS} strokeWidth={0.7} />
    {/* Downtown cluster */}
    {B(380,60,28,MS)} {B(420,78,34,MS)}
    {BW(464,95,38,2)}
    {B(512,85,34,MS)} {B(556,70,30,MS)} {B(598,58,26,FS)}
    {/* Harbour */}
    <rect x={0} y={198} width={900} height={22} fill={WA} opacity={0.5} />
  </>
}

function KitchenerWaterloo() {
  return <>
    {/* Tech park / flat suburban */}
    {B(280,38,36,FS)} {B(328,52,40,FS)} {B(380,68,44,MS)} {B(436,82,48,MS)}
    {BW(496,95,50,2)} {BW(558,85,46,2)}
    {B(614,72,42,MS)} {B(664,58,38,MS)}
    {B(714,46,34,FS)} {B(758,36,30,FS)}
    {/* Low campus buildings */}
    {B(300,28,80,FS)} {B(420,25,90,FS)} {B(560,28,80,FS)} {B(690,22,70,FS)}
    {/* CIGI campus tower */}
    {BW(456,102,48,3)}
    <rect x={456} y={G-106} width={48} height={4} fill={TLF} stroke={TLS} strokeWidth={1} rx={2} />
  </>
}

function QuebecCity() {
  return <>
    {/* Cap Diamant cliff */}
    <polygon points="0,115 80,108 160,115 240,105 300,110 340,125 900,165 900,220 0,220" fill={MTF} stroke={MT} strokeWidth={0.8} />
    {/* St Lawrence River */}
    <rect x={0} y={196} width={900} height={24} fill={WA} />
    {/* Château Frontenac body */}
    <rect x={360} y={G-155} width={130} height={150} fill="none" stroke={NS} strokeWidth={1.0} />
    {/* Central tower */}
    <rect x={408} y={G-190} width={34} height={40} fill="none" stroke={NS} strokeWidth={1.0} />
    {/* Copper roof */}
    <polygon points={`408,${G-190} 425,${G-212} 442,${G-190}`} fill={TLS} />
    {/* Side turrets */}
    <rect x={360} y={G-175} width={25} height={25} fill="none" stroke={NS} strokeWidth={1.0} />
    <polygon points={`360,${G-175} 372.5,${G-192} 385,${G-175}`} fill={TLS} />
    <rect x={465} y={G-175} width={25} height={25} fill="none" stroke={NS} strokeWidth={1.0} />
    <polygon points={`465,${G-175} 477.5,${G-192} 490,${G-175}`} fill={TLS} />
    {/* Old Town buildings */}
    {B(240,55,28,MS)} {B(280,68,30,MS)} {B(318,78,32,MS)}
    {B(510,65,28,MS)} {B(550,55,26,MS)} {B(590,48,24,FS)}
    {/* Window rows on château */}
    {[0,1,2].map(r => [0,1,2,3].map(c =>
      <rect key={`qc${r}-${c}`} x={368+c*28} y={G-145+r*30} width={14} height={8} fill="none" stroke={WIN} strokeWidth={0.6} />
    ))}
  </>
}

function Seattle() {
  return <>
    {/* Puget Sound */}
    <rect x={0} y={194} width={600} height={26} fill={WA} />
    {/* Mount Rainier */}
    <polygon points="650,145 760,65 870,145" fill={MTF} stroke={MT} strokeWidth={0.8} opacity={0.7} />
    <polygon points="720,102 760,65 800,102" fill="rgba(255,255,255,0.04)" stroke={MT} strokeWidth={0.6} />
    {/* Seattle skyline */}
    {B(200,68,30,FS)} {B(242,82,34,MS)} {B(288,98,38,MS)} {B(336,115,42,MS)}
    {BW(388,132,44,3)} {BW(444,120,42,3)}
    {B(498,108,40,MS)} {B(550,92,36,MS)} {B(600,75,30,FS)}
    {/* Space Needle — tripod + disc */}
    <line x1={110} y1={G} x2={128} y2={G-130} stroke={TLS} strokeWidth={4} />
    <line x1={150} y1={G} x2={128} y2={G-130} stroke={TLS} strokeWidth={4} />
    <line x1={128} y1={G} x2={128} y2={G-130} stroke={TLS} strokeWidth={2} />
    {/* Observation deck */}
    <ellipse cx={128} cy={G-138} rx={32} ry={14} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    <rect x={116} y={G-148} width={24} height={14} fill={TLF} stroke={TLS} strokeWidth={1.5} rx={2} />
    {/* Antenna */}
    <rect x={126} y={G-172} width={4} height={34} fill={TLS} />
  </>
}

function SanFrancisco() {
  return <>
    {/* Bay water */}
    <rect x={0} y={196} width={900} height={24} fill={WA} />
    {/* SF hills */}
    <polygon points="0,160 100,135 200,148 300,130 400,142 500,158 900,165 900,220 0,220" fill={MTF} stroke={MT} strokeWidth={0.8} opacity={0.55} />
    {/* Bay Bridge */}
    <path d={`M650,${G} L700,${G-60} L780,${G-60} L830,${G}`} fill="none" stroke={FS} strokeWidth={1.2} />
    <line x1={715} y1={G-60} x2={715} y2={G} stroke={FS} strokeWidth={0.8} />
    {/* City skyline */}
    {B(250,75,32,MS)} {B(294,92,36,MS)} {B(342,110,40,MS)}
    {BW(394,128,44,3)} {BW(448,138,44,3)}
    {B(504,125,42,MS)} {B(558,112,40,MS)} {B(610,95,36,MS)}
    {/* Transamerica Pyramid */}
    <polygon points={`395,${G-175} 418,${G-100} 441,${G-175}`} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    <rect x={415} y={G-185} width={6} height={14} fill={TLS} />
  </>
}

function NewYork() {
  return <>
    {/* Hudson River */}
    <rect x={0} y={197} width={900} height={23} fill={WA} />
    {/* Dense tower cluster */}
    {B(150,65,22,FS)} {B(182,80,24,FS)} {B(216,98,28,MS)} {B(256,115,32,MS)}
    {B(300,135,36,MS)}
    {BW(348,155,40,4)} {BW(400,168,44,4)} {BW(456,160,42,4)}
    {B(510,148,40,MS)} {B(562,138,38,MS)}
    {B(612,125,36,MS)} {B(658,112,34,MS)}
    {B(700,98,32,MS)} {B(740,85,30,FS)} {B(778,72,28,FS)} {B(814,60,24,FS)}
    {/* Empire State Building */}
    {BW(405,182,34,5)}
    {/* Step-backs */}
    <rect x={400} y={G-158} width={44} height={8} fill="none" stroke={NS} strokeWidth={1.0} />
    <rect x={398} y={G-145} width={48} height={8} fill="none" stroke={NS} strokeWidth={1.0} />
    {/* Spire */}
    <rect x={420} y={G-198} width={4} height={18} fill={TLS} />
    <rect x={418} y={G-202} width={8} height={5} fill={TLS} />
    {/* Chrysler Building */}
    {BW(530,168,28,4)}
    <polygon points={`530,${G-168} 544,${G-194} 558,${G-168}`} fill={TLF} stroke={TLS} strokeWidth={1.5} />
  </>
}

function Boston() {
  return <>
    {/* Boston Harbor */}
    <rect x={0} y={196} width={900} height={24} fill={WA} />
    {/* Downtown skyline */}
    {B(260,68,28,FS)} {B(300,82,32,MS)} {B(342,100,38,MS)} {B(388,118,42,MS)}
    {BW(442,135,44,3)} {BW(498,125,42,3)}
    {B(552,112,40,MS)} {B(604,95,36,MS)}
    {B(648,80,32,FS)} {B(690,65,28,FS)}
    {/* John Hancock Tower — glass parallelogram */}
    <polygon points={`476,${G-178} 484,${G-178} 524,${G-10} 516,${G-10}`} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    {/* Prudential Center */}
    {BW(548,155,38,4)}
    <rect x={546} y={G-160} width={42} height={5} fill={TLF} stroke={TLS} strokeWidth={1} rx={2} />
    <rect x={565} y={G-172} width={4} height={14} fill={TLS} />
  </>
}

function Austin() {
  return <>
    {/* Colorado River */}
    <rect x={0} y={197} width={900} height={23} fill={WA} />
    {/* Hill Country bg */}
    <polygon points="0,168 200,158 400,165 900,170 900,220 0,220" fill={MTF} stroke={MT} strokeWidth={0.8} opacity={0.4} />
    {/* Texas State Capitol */}
    <rect x={380} y={G-85} width={100} height={80} fill="none" stroke={MS} strokeWidth={0.85} />
    <ellipse cx={430} cy={G-90} rx={40} ry={25} fill="none" stroke={NS} strokeWidth={1.0} />
    <rect x={427} y={G-118} width={6} height={30} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    <ellipse cx={430} cy={G-120} rx={6} ry={6} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    {/* Downtown towers */}
    {B(250,58,28,FS)} {B(290,72,32,FS)} {B(332,88,36,MS)}
    {BW(540,95,40,2)} {BW(592,108,42,2)}
    {B(646,95,38,MS)} {B(696,80,34,MS)} {B(740,65,28,FS)} {B(780,52,24,FS)}
  </>
}

function Chicago() {
  return <>
    {/* Lake Michigan */}
    <rect x={680} y={190} width={220} height={30} fill={WA} />
    {/* Dense skyline */}
    {B(150,68,28,FS)} {B(190,85,32,MS)} {B(234,105,38,MS)} {B(284,125,42,MS)}
    {B(338,145,46,MS)}
    {BW(396,162,48,4)} {BW(456,175,50,4)} {BW(518,162,48,4)}
    {B(578,148,46,MS)} {B(636,130,42,MS)} {B(688,112,38,MS)} {B(736,92,34,FS)}
    {/* Willis Tower — stepped */}
    {BW(368,192,44,5)}
    <rect x={360} y={G-170} width={60} height={20} fill="none" stroke={NS} strokeWidth={1.0} />
    <rect x={354} y={G-148} width={72} height={20} fill="none" stroke={NS} strokeWidth={1.0} />
    <rect x={385} y={G-208} width={5} height={18} fill={TLS} />
    <rect x={392} y={G-208} width={5} height={14} fill={TLS} opacity={0.7} />
    {B(478,178,44,MS)} {B(544,168,42,MS)}
  </>
}

function LosAngeles() {
  return <>
    {/* Hollywood Hills */}
    <polygon points="0,145 100,130 200,138 300,125 400,135 500,145 600,152 900,160 900,220 0,220" fill={MTF} stroke={MT} strokeWidth={0.8} opacity={0.55} />
    {/* Griffith Observatory */}
    <ellipse cx={220} cy={138} rx={22} ry={14} fill="none" stroke={MS} strokeWidth={0.85} />
    <rect x={208} y={138} width={24} height={20} fill="none" stroke={MS} strokeWidth={0.85} />
    <rect x={218} y={122} width={4} height={18} fill={TLF} stroke={TLS} strokeWidth={1} />
    {/* Downtown cluster */}
    {B(450,78,32,FS)} {B(494,95,36,MS)} {B(542,115,40,MS)}
    {BW(592,135,44,3)} {BW(648,148,46,3)} {BW(706,138,44,3)}
    {B(762,122,42,MS)} {B(814,105,38,MS)} {B(858,88,34,FS)}
    {/* Wilshire Grand */}
    {BW(608,168,36,4)}
    <polygon points={`608,${G-168} 626,${G-188} 644,${G-168}`} fill={TLF} stroke={TLS} strokeWidth={1.5} />
  </>
}

function Denver() {
  return <>
    {/* Rocky Mountains — close and prominent */}
    <polygon points="0,135 80,105 150,118 210,92 270,108 330,122 900,158 900,220 0,220" fill={MTF} stroke={MT} strokeWidth={0.8} />
    <polygon points="60,112 120,82 180,105" fill="rgba(255,255,255,0.04)" stroke={MT} strokeWidth={0.6} />
    {/* Colorado State Capitol */}
    <rect x={390} y={G-82} width={110} height={77} fill="none" stroke={MS} strokeWidth={0.85} />
    <ellipse cx={445} cy={G-88} rx={38} ry={24} fill="none" stroke={NS} strokeWidth={1.0} />
    <rect x={441} y={G-114} width={8} height={28} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    <ellipse cx={445} cy={G-116} rx={7} ry={7} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    {/* Downtown towers */}
    {B(260,58,28,FS)} {B(300,72,32,MS)} {B(342,88,36,MS)}
    {BW(542,98,40,2)} {BW(594,112,42,2)}
    {B(648,100,38,MS)} {B(698,85,34,MS)} {B(742,70,30,FS)}
  </>
}

function Miami() {
  return <>
    {/* Biscayne Bay */}
    <rect x={0} y={194} width={900} height={26} fill={WA} />
    {/* Brickell — slender towers */}
    {B(280,72,24,FS)} {B(314,88,26,MS)} {B(350,108,28,MS)}
    {BW(388,128,30,3)} {BW(428,148,32,3)} {BW(470,162,34,3)} {BW(514,155,32,3)} {BW(558,145,30,3)}
    {B(602,132,30,MS)} {B(642,118,28,MS)} {B(682,105,26,MS)} {B(720,88,24,FS)} {B(758,72,22,FS)}
    {/* Brickell City Centre */}
    {BW(448,180,26,4)}
    <rect x={446} y={G-184} width={30} height={4} fill={TLF} stroke={TLS} strokeWidth={1} rx={2} />
    {/* Four Seasons */}
    {BW(488,168,28,4)}
    <rect x={486} y={G-172} width={32} height={4} fill={TLF} stroke={TLS} strokeWidth={1} rx={2} />
    {/* Art Deco hints */}
    {B(150,35,30,FS)} {B(190,42,32,FS)} {B(230,38,28,FS)}
  </>
}

function Dallas() {
  return <>
    {/* Trinity River */}
    <rect x={0} y={198} width={900} height={22} fill={WA} opacity={0.5} />
    {/* Downtown cluster */}
    {B(280,65,28,FS)} {B(320,80,32,MS)} {B(362,98,36,MS)} {B(408,115,40,MS)}
    {BW(458,132,44,3)} {BW(514,125,42,3)}
    {B(568,112,40,MS)} {B(618,95,36,MS)} {B(660,78,30,FS)}
    {/* Reunion Tower — globe on stick */}
    <rect x={316} y={G-162} width={8} height={158} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    <circle cx={320} cy={G-168} r={18} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    {/* Bank of America Plaza */}
    {BW(478,148,36,4)}
    <rect x={476} y={G-152} width={40} height={4} fill={TLF} stroke={TLS} strokeWidth={1} rx={2} />
    <rect x={493} y={G-164} width={4} height={14} fill={TLS} />
  </>
}

function Atlanta() {
  return <>
    {/* Piedmont Hills bg */}
    <polygon points="0,162 200,155 400,160 900,165 900,220 0,220" fill={MTF} stroke={MT} strokeWidth={0.8} opacity={0.4} />
    {/* Downtown towers */}
    {B(300,68,30,FS)} {B(342,85,34,MS)} {B(388,105,38,MS)} {B(438,122,42,MS)}
    {BW(492,138,44,3)} {BW(548,128,42,3)}
    {B(602,112,40,MS)} {B(650,95,36,FS)}
    {/* Westin Peachtree — cylinder */}
    {BW(460,162,40,4)}
    <rect x={458} y={G-166} width={44} height={5} fill={TLF} stroke={TLS} strokeWidth={1} rx={22} />
    {/* Bank of America Plaza */}
    {BW(514,148,36,4)}
    <rect x={512} y={G-152} width={40} height={4} fill={TLF} stroke={TLS} strokeWidth={1} rx={2} />
    <rect x={529} y={G-162} width={4} height={12} fill={TLS} />
  </>
}

function Phoenix() {
  return <>
    {/* Desert horizon */}
    <rect x={0} y={200} width={900} height={20} fill="rgba(120,60,20,0.08)" />
    {/* Camelback Mountain */}
    <path d={`M0,172 Q100,145 200,162 Q280,135 360,158 L900,168 L900,220 L0,220 Z`} fill={MTF} stroke={MT} strokeWidth={0.8} opacity={0.65} />
    {/* Two humps */}
    <path d={`M120,162 Q180,128 240,158`} fill="none" stroke={MT} strokeWidth={1.2} />
    <path d={`M240,158 Q310,132 370,158`} fill="none" stroke={MT} strokeWidth={1.2} />
    {/* Downtown cluster */}
    {B(480,62,28,FS)} {B(520,78,32,MS)} {B(564,95,36,MS)}
    {BW(610,112,40,2)} {BW(660,102,38,2)}
    {B(708,88,34,MS)} {B(752,72,30,FS)}
    {/* Chase Tower */}
    {BW(580,130,40,3)}
    <rect x={578} y={G-134} width={44} height={4} fill={TLF} stroke={TLS} strokeWidth={1} rx={2} />
  </>
}

function WashingtonDC() {
  return <>
    {/* Potomac River */}
    <rect x={0} y={197} width={900} height={23} fill={WA} />
    {/* Low-rise federal buildings */}
    {B(180,42,80,FS)} {B(280,45,90,FS)} {B(390,40,80,FS)} {B(570,45,90,FS)} {B(680,42,80,FS)}
    {/* US Capitol — dome + wings */}
    <rect x={340} y={G-78} width={140} height={73} fill="none" stroke={MS} strokeWidth={0.85} />
    <ellipse cx={410} cy={G-84} rx={42} ry={28} fill="none" stroke={NS} strokeWidth={1.0} />
    <rect x={406} y={G-115} width={8} height={32} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    <ellipse cx={410} cy={G-117} rx={7} ry={7} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    {/* Washington Monument — obelisk */}
    <polygon points={`200,${G-190} 212,${G-190} 220,${G} 192,${G}`} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    <polygon points={`200,${G-190} 206,${G-202} 212,${G-190}`} fill={TLS} />
    {/* Lincoln Memorial */}
    {B(100,38,60,FS)}
  </>
}

function Houston() {
  return <>
    {/* Buffalo Bayou */}
    <rect x={0} y={198} width={900} height={22} fill={WA} opacity={0.4} />
    {/* Gulf Coast terrain */}
    <polygon points="0,170 900,170 900,220 0,220" fill={MTF} stroke={MT} strokeWidth={0.6} opacity={0.3} />
    {/* Downtown cluster */}
    {B(280,68,30,FS)} {B(322,85,34,MS)} {B(368,105,38,MS)} {B(418,125,42,MS)}
    {B(472,142,46,MS)}
    {BW(530,158,50,4)} {BW(592,145,46,4)} {BW(650,132,44,3)}
    {B(706,115,40,MS)} {B(756,95,36,MS)} {B(800,78,30,FS)}
    {/* JPMorgan Chase Tower — angled top */}
    <polygon points={`510,${G-180} 530,${G-188} 558,${G-188} 572,${G-175} 572,${G} 510,${G}`} fill="none" stroke={NS} strokeWidth={1.0} />
    <polygon points={`510,${G-180} 530,${G-188} 558,${G-188} 572,${G-175}`} fill={TLF} stroke={TLS} strokeWidth={1.5} />
    {/* Williams Tower */}
    {BW(596,160,40,4)}
    <rect x={594} y={G-164} width={44} height={4} fill={TLF} stroke={TLS} strokeWidth={1} rx={2} />
  </>
}

function Nashville() {
  return <>
    {/* Cumberland River */}
    <rect x={0} y={197} width={900} height={23} fill={WA} />
    {/* Tennessee hills */}
    <polygon points="0,165 200,158 400,163 900,168 900,220 0,220" fill={MTF} stroke={MT} strokeWidth={0.8} opacity={0.4} />
    {/* Downtown cluster */}
    {B(280,65,28,FS)} {B(318,80,32,MS)} {B(358,98,36,MS)} {B(400,115,40,MS)}
    {BW(450,128,42,3)} {BW(556,118,40,3)}
    {B(604,102,38,MS)} {B(648,85,32,FS)}
    {/* AT&T Building "Batman" */}
    {BW(462,168,40,4)}
    {/* Twin spires */}
    <polygon points={`462,${G-168} 462,${G-198} 474,${G-182}`} fill={TLS} />
    <polygon points={`502,${G-168} 502,${G-198} 490,${G-182}`} fill={TLS} />
    {/* Pinnacle building */}
    {BW(516,148,38,4)}
    <rect x={514} y={G-152} width={42} height={4} fill={TLF} stroke={TLS} strokeWidth={1} rx={2} />
  </>
}

// ─── city → component map ─────────────────────────────────────────────────────

const SKYLINES: Record<string, () => React.JSX.Element> = {
  vancouver:            Vancouver,
  toronto:              Toronto,
  calgary:              Calgary,
  montreal:             Montreal,
  ottawa:               Ottawa,
  edmonton:             Edmonton,
  winnipeg:             Winnipeg,
  halifax:              Halifax,
  victoria:             Victoria,
  hamilton:             Hamilton,
  'kitchener-waterloo': KitchenerWaterloo,
  'quebec-city':        QuebecCity,
  seattle:              Seattle,
  'san-francisco':      SanFrancisco,
  'new-york':           NewYork,
  boston:               Boston,
  austin:               Austin,
  chicago:              Chicago,
  'los-angeles':        LosAngeles,
  denver:               Denver,
  miami:                Miami,
  dallas:               Dallas,
  atlanta:              Atlanta,
  phoenix:              Phoenix,
  'washington-dc':      WashingtonDC,
  houston:              Houston,
  nashville:            Nashville,
}

// ─── public component ─────────────────────────────────────────────────────────

interface Props {
  slug: string
  style?: React.CSSProperties
  className?: string
}

export function CitySkyline({ slug, style, className }: Props) {
  const Skyline = SKYLINES[slug]
  if (!Skyline) return null

  return (
    <svg
      viewBox="0 0 900 220"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      style={style}
      className={className}
    >
      <Skyline />
      {/* Ground line */}
      <line x1={0} y1={G} x2={900} y2={G} stroke="rgba(255,255,255,0.18)" strokeWidth={0.8} />
    </svg>
  )
}
