'use client'
import React from 'react'

// ─── design tokens ────────────────────────────────────────────────────────────
const G = 205           // ground line y (canvas is 900 × 220)
const F  = 'rgba(255,255,255,0.07)'   // far/background buildings
const M  = 'rgba(255,255,255,0.12)'   // mid buildings
const N  = 'rgba(255,255,255,0.18)'   // near / foreground buildings
const TL = 'rgba(20,184,166,0.32)'    // teal landmark accent
const WA = 'rgba(15,45,130,0.40)'     // water
const MT = 'rgba(20,35,90,0.50)'      // mountain / terrain

// helper: building rect from ground
function B(x: number, h: number, w: number, fill = M, rx = 0) {
  return <rect key={`${x}-${h}`} x={x} y={G - h} width={w} height={h} fill={fill} rx={rx} />
}

// ─── city skylines ─────────────────────────────────────────────────────────────

function Vancouver() {
  return <>
    {/* North Shore mountains */}
    <polygon points="0,160 80,112 140,138 220,95 300,118 380,100 460,130 900,155 900,220 0,220" fill={MT} />
    {/* Water strip */}
    <rect x={0} y={198} width={900} height={22} fill={WA} />
    {/* Far background towers */}
    {B(310,52,24,F)} {B(345,68,28,F)} {B(385,82,30,F)} {B(428,58,22,F)}
    {/* Mid-ground glass condos */}
    {B(465,95,36,M)} {B(510,118,40,M)} {B(562,105,38,M)} {B(612,88,34,M)}
    {B(658,130,42,M)} {B(712,102,38,M)} {B(762,82,34,M)} {B(808,65,30,M)}
    {/* Foreground cluster */}
    {B(480,110,18,N)} {B(540,140,20,N)} {B(595,122,18,N)} {B(640,148,22,N)} {B(700,115,20,N)}
    {/* Harbour Centre — thin shaft + observation disc */}
    <rect x={488} y={G-165} width={6} height={160} fill={TL} />
    <ellipse cx={491} cy={G-170} rx={18} ry={8} fill={TL} opacity={0.85} />
    <rect x={490} y={G-183} width={3} height={14} fill={TL} opacity={0.6} />
  </>
}

function Toronto() {
  return <>
    {/* Lake Ontario */}
    <rect x={0} y={196} width={900} height={24} fill={WA} />
    {/* CN Tower — ultra thin with SkyPod disc */}
    <rect x={197} y={G-188} width={7} height={183} fill={TL} />
    <ellipse cx={200} cy={G-128} rx={22} ry={11} fill={TL} opacity={0.85} />
    <rect x={199} y={G-192} width={3} height={8} fill={TL} opacity={0.5} />
    {/* Financial district towers */}
    {B(260,95,38,M)} {B(308,115,42,M)} {B(360,138,45,M)} {B(415,128,44,M)}
    {B(470,155,48,N)} {B(530,142,46,N)} {B(588,135,44,N)} {B(644,118,42,N)}
    {B(698,105,40,M)} {B(748,92,36,M)} {B(795,78,32,M)} {B(838,65,28,F)}
    {/* Background towers */}
    {B(250,65,22,F)} {B(850,55,26,F)} {B(875,48,22,F)}
  </>
}

function Calgary() {
  return <>
    {/* Rocky Mountains background */}
    <polygon points="0,145 60,105 120,125 180,88 240,110 300,125 360,108 420,130 600,148 900,155 900,220 0,220" fill={MT} />
    {/* Downtown core */}
    {B(350,62,28,F)} {B(390,78,32,F)} {B(432,92,36,M)} {B(480,108,40,M)}
    {B(532,125,44,M)} {B(588,118,42,M)} {B(640,105,38,M)} {B(688,88,34,F)}
    {/* Bow Tower — tallest building, slight curve suggestion at top */}
    <rect x={540} y={G-162} width={44} height={157} fill={N} />
    <rect x={540} y={G-168} width={44} height={10} fill={N} rx={4} />
    {/* Teal accent on Bow Tower */}
    <rect x={540} y={G-168} width={44} height={6} fill={TL} rx={4} />
    {/* Saddledome curve (right side) */}
    <path d={`M680,${G} Q720,${G-42} 760,${G} Z`} fill={M} opacity={0.8} />
  </>
}

function Montreal() {
  return <>
    {/* St. Lawrence River */}
    <rect x={0} y={197} width={900} height={23} fill={WA} />
    {/* Mont Royal silhouette (left bg) */}
    <polygon points="0,155 100,128 200,140 300,158 900,162 900,220 0,220" fill={MT} opacity={0.6} />
    {/* Mixed skyline */}
    {B(280,72,30,F)} {B(322,88,34,F)} {B(368,102,38,M)} {B(418,118,42,M)}
    {B(470,135,44,M)} {B(526,128,42,M)} {B(578,115,40,M)} {B(628,98,36,M)}
    {B(670,82,32,F)} {B(710,68,28,F)}
    {/* Olympic Stadium — inclined tower/arch on right */}
    <rect x={760} y={G-145} width={10} height={140} fill={TL} rx={2}
      style={{ transform: 'rotate(12deg)', transformOrigin: '765px 205px' }} />
    <path d={`M740,${G} Q760,${G-148} 790,${G-140}`} fill="none" stroke={TL} strokeWidth={8} opacity={0.7} />
    {/* Foreground */}
    {B(430,142,20,N)} {B(500,148,22,N)} {B(555,138,20,N)}
  </>
}

function Ottawa() {
  return <>
    {/* Ottawa River */}
    <rect x={0} y={198} width={900} height={22} fill={WA} />
    {/* Gatineau Hills background */}
    <polygon points="0,160 120,138 240,152 360,142 480,158 900,165 900,220 0,220" fill={MT} opacity={0.5} />
    {/* Parliament buildings — Centre Block roofline */}
    <rect x={380} y={G-75} width={140} height={70} fill={M} />
    {/* Peace Tower — Gothic spire */}
    <rect x={440} y={G-140} width={22} height={65} fill={N} />
    {/* Spire */}
    <polygon points={`445,${G-185} 451.5,${G-140} 458,${G-185}`} fill={TL} />
    <rect x={449} y={G-202} width={5} height={18} fill={TL} opacity={0.8} />
    {/* Corner turrets */}
    <rect x={380} y={G-95} width={18} height={20} fill={N} />
    <rect x={502} y={G-95} width={18} height={20} fill={N} />
    {/* City buildings */}
    {B(260,60,28,F)} {B(300,72,32,F)} {B(540,82,36,M)} {B(590,68,30,M)}
    {B(640,55,26,F)} {B(700,48,24,F)} {B(740,42,22,F)}
  </>
}

function Edmonton() {
  return <>
    {/* North Saskatchewan River valley (terrain dip) */}
    <polygon points="0,170 300,175 380,195 460,178 900,170 900,220 0,220" fill={MT} opacity={0.55} />
    {/* Downtown towers */}
    {B(380,72,30,F)} {B(422,88,34,M)} {B(468,108,40,M)} {B(522,128,44,N)}
    {B(576,120,42,N)} {B(630,105,38,M)} {B(678,88,34,M)} {B(722,72,30,F)}
    {/* Manulife Place / downtown landmark tower */}
    <rect x={528} y={G-148} width={38} height={143} fill={N} />
    <rect x={526} y={G-152} width={42} height={6} fill={TL} rx={2} />
    {/* High Level Bridge arch */}
    <path d={`M50,${G} Q200,${G-55} 350,${G}`} fill="none" stroke={M} strokeWidth={5} opacity={0.7} />
  </>
}

function Winnipeg() {
  return <>
    {/* Very flat prairie horizon */}
    <rect x={0} y={195} width={900} height={25} fill={WA} opacity={0.4} />
    {/* Modest downtown */}
    {B(330,55,26,F)} {B(368,70,30,F)} {B(408,88,36,M)} {B(452,102,40,M)}
    {B(502,118,44,N)} {B(556,110,42,N)} {B(608,95,38,M)} {B(658,78,32,M)}
    {B(700,62,28,F)} {B(740,52,24,F)}
    {/* Richardson Building — tallest downtown */}
    <rect x={466} y={G-135} width={36} height={130} fill={N} />
    <rect x={468} y={G-140} width={32} height={6} fill={TL} rx={2} />
    {/* The Forks bridge arch (subtle) */}
    <path d={`M100,${G} Q200,${G-38} 300,${G}`} fill="none" stroke={F} strokeWidth={4} opacity={0.5} />
  </>
}

function Halifax() {
  return <>
    {/* Halifax Harbour */}
    <rect x={0} y={195} width={900} height={25} fill={WA} />
    {/* Citadel Hill suggestion */}
    <polygon points="150,160 230,145 310,160 310,205 150,205" fill={MT} opacity={0.6} />
    <polygon points="180,148 230,135 280,148" fill={MT} opacity={0.7} />
    {/* Waterfront buildings */}
    {B(340,48,24,F)} {B(376,60,28,F)} {B(416,75,32,M)} {B(460,92,36,M)}
    {B(508,110,40,N)} {B(560,100,38,N)} {B(608,85,34,M)} {B(650,68,30,M)}
    {B(690,55,26,F)} {B(730,46,22,F)}
    {/* Purdy's Wharf towers */}
    <rect x={488} y={G-118} width={30} height={113} fill={N} />
    <rect x={526} y={G-108} width={30} height={103} fill={N} />
    <rect x={488} y={G-122} width={68} height={5} fill={TL} rx={2} opacity={0.7} />
  </>
}

function Victoria() {
  return <>
    {/* Inner Harbour */}
    <rect x={0} y={193} width={900} height={27} fill={WA} />
    {/* Parliament dome */}
    <rect x={350} y={G-80} width={140} height={75} fill={M} />
    <ellipse cx={420} cy={G-85} rx={35} ry={22} fill={N} />
    <rect x={416} y={G-108} width={8} height={24} fill={TL} />
    <ellipse cx={420} cy={G-112} rx={6} ry={5} fill={TL} />
    {/* Empress Hotel turrets */}
    <rect x={520} y={G-75} width={90} height={70} fill={M} />
    <rect x={525} y={G-88} width={18} height={18} fill={N} />
    <polygon points={`525,${G-100} 534,${G-88} 543,${G-100}`} fill={TL} />
    <rect x={572} y={G-88} width={18} height={18} fill={N} />
    <polygon points={`572,${G-100} 581,${G-88} 590,${G-100}`} fill={TL} />
    {/* Other buildings */}
    {B(260,48,26,F)} {B(300,58,28,F)} {B(640,65,28,M)} {B(678,55,24,M)} {B(720,45,22,F)}
  </>
}

function Hamilton() {
  return <>
    {/* Niagara Escarpment cliff — dramatic terrain feature */}
    <polygon points="0,120 200,125 250,145 300,148 900,155 900,220 0,220" fill={MT} opacity={0.65} />
    <rect x={0} y={120} width={260} height={10} fill={MT} opacity={0.8} />
    {/* Steel/industrial silhouette */}
    <rect x={80} y={G-65} width={50} height={65} fill={M} opacity={0.7} />
    <rect x={140} y={G-52} width={40} height={52} fill={M} opacity={0.6} />
    {/* Smokestacks */}
    <rect x={92} y={G-100} width={8} height={50} fill={F} />
    <rect x={110} y={G-90} width={8} height={40} fill={F} />
    {/* Downtown cluster */}
    {B(380,60,28,M)} {B(420,78,34,M)} {B(464,95,38,N)}
    {B(512,85,34,M)} {B(556,70,30,M)} {B(598,58,26,F)}
    {/* Harbour */}
    <rect x={0} y={198} width={900} height={22} fill={WA} opacity={0.5} />
  </>
}

function KitchenerWaterloo() {
  return <>
    {/* Flat suburban tech park skyline */}
    {B(280,38,36,F)} {B(328,52,40,F)} {B(380,68,44,M)} {B(436,82,48,M)}
    {B(496,95,50,N)} {B(558,85,46,N)} {B(614,72,42,M)} {B(664,58,38,M)}
    {B(714,46,34,F)} {B(758,36,30,F)}
    {/* Perimeter tech campus buildings (lower, wider) */}
    {B(300,28,80,F)} {B(420,25,90,F)} {B(560,28,80,F)} {B(690,22,70,F)}
    {/* CIGI/Balsillie campus suggestion */}
    <rect x={456} y={G-102} width={48} height={97} fill={N} />
    <rect x={456} y={G-106} width={48} height={5} fill={TL} rx={2} opacity={0.6} />
  </>
}

function QuebecCity() {
  return <>
    {/* Cap Diamant cliff */}
    <polygon points="0,115 80,108 160,115 240,105 300,110 340,125 900,165 900,220 0,220" fill={MT} />
    {/* St Lawrence River */}
    <rect x={0} y={196} width={900} height={24} fill={WA} />
    {/* Château Frontenac — castle with turrets, very distinctive */}
    {/* Main chateau body */}
    <rect x={360} y={G-155} width={130} height={150} fill={N} />
    {/* Central tower / grande tour */}
    <rect x={408} y={G-190} width={34} height={40} fill={N} />
    {/* Copper roof suggestion */}
    <polygon points={`408,${G-190} 425,${G-212} 442,${G-190}`} fill={TL} />
    {/* Side turrets */}
    <rect x={360} y={G-175} width={25} height={25} fill={N} />
    <polygon points={`360,${G-175} 372.5,${G-192} 385,${G-175}`} fill={TL} />
    <rect x={465} y={G-175} width={25} height={25} fill={N} />
    <polygon points={`465,${G-175} 477.5,${G-192} 490,${G-175}`} fill={TL} />
    {/* Old Lower Town buildings */}
    {B(240,55,28,M)} {B(280,68,30,M)} {B(318,78,32,M)}
    {B(510,65,28,M)} {B(550,55,26,M)} {B(590,48,24,F)}
  </>
}

function Seattle() {
  return <>
    {/* Puget Sound */}
    <rect x={0} y={194} width={600} height={26} fill={WA} />
    {/* Mount Rainier (right background, distant triangle) */}
    <polygon points="650,145 760,65 870,145" fill={MT} opacity={0.7} />
    <polygon points="720,102 760,65 800,102" fill="rgba(255,255,255,0.08)" />
    {/* Seattle skyline */}
    {B(200,68,30,F)} {B(242,82,34,M)} {B(288,98,38,M)} {B(336,115,42,M)}
    {B(388,132,44,N)} {B(444,120,42,N)} {B(498,108,40,M)} {B(550,92,36,M)} {B(600,75,30,F)}
    {/* Space Needle — tripod + disc */}
    {/* Legs */}
    <line x1={110} y1={G} x2={128} y2={G-130} stroke={TL} strokeWidth={5} />
    <line x1={150} y1={G} x2={128} y2={G-130} stroke={TL} strokeWidth={5} />
    <line x1={128} y1={G} x2={128} y2={G-130} stroke={TL} strokeWidth={3} />
    {/* Observation deck disc */}
    <ellipse cx={128} cy={G-138} rx={32} ry={14} fill={TL} />
    <rect cx={128} cy={G-138} x={116} y={G-148} width={24} height={14} fill={TL} rx={2} />
    {/* Antenna */}
    <rect x={126} y={G-172} width={4} height={34} fill={TL} opacity={0.7} />
  </>
}

function SanFrancisco() {
  return <>
    {/* Bay water */}
    <rect x={0} y={196} width={900} height={24} fill={WA} />
    {/* San Francisco hills (rolling terrain) */}
    <polygon points="0,160 100,135 200,148 300,130 400,142 500,158 900,165 900,220 0,220" fill={MT} opacity={0.55} />
    {/* Bay Bridge silhouette (right side) */}
    <path d={`M650,${G} L700,${G-60} L780,${G-60} L830,${G}`} fill="none" stroke={F} strokeWidth={4} opacity={0.5} />
    <line x1={715} y1={G-60} x2={715} y2={G} stroke={F} strokeWidth={2} opacity={0.4} />
    {/* City skyline */}
    {B(250,75,32,M)} {B(294,92,36,M)} {B(342,110,40,M)} {B(394,128,44,N)}
    {B(448,138,44,N)} {B(504,125,42,N)} {B(558,112,40,M)} {B(610,95,36,M)}
    {/* Transamerica Pyramid — distinctive triangle */}
    <polygon points={`395,${G-175} 418,${G-100} 441,${G-175}`} fill={TL} />
    <rect x={415} y={G-185} width={6} height={14} fill={TL} opacity={0.7} />
  </>
}

function NewYork() {
  return <>
    {/* Hudson River / harbor */}
    <rect x={0} y={197} width={900} height={23} fill={WA} />
    {/* Very dense tower cluster */}
    {B(150,65,22,F)} {B(182,80,24,F)} {B(216,98,28,M)} {B(256,115,32,M)}
    {B(300,135,36,M)} {B(348,155,40,N)} {B(400,168,44,N)} {B(456,160,42,N)}
    {B(510,148,40,N)} {B(562,138,38,N)} {B(612,125,36,M)} {B(658,112,34,M)}
    {B(700,98,32,M)} {B(740,85,30,F)} {B(778,72,28,F)} {B(814,60,24,F)}
    {/* Empire State Building */}
    <rect x={405} y={G-182} width={34} height={177} fill={N} />
    {/* Step-backs */}
    <rect x={400} y={G-158} width={44} height={8} fill={N} />
    <rect x={398} y={G-145} width={48} height={8} fill={N} />
    {/* Spire */}
    <rect x={420} y={G-198} width={4} height={18} fill={TL} />
    <rect x={418} y={G-202} width={8} height={5} fill={TL} />
    {/* Chrysler Building (art deco spire) */}
    <rect x={530} y={G-168} width={28} height={163} fill={N} />
    <polygon points={`530,${G-168} 544,${G-194} 558,${G-168}`} fill={TL} opacity={0.9} />
  </>
}

function Boston() {
  return <>
    {/* Boston Harbor */}
    <rect x={0} y={196} width={900} height={24} fill={WA} />
    {/* Downtown skyline */}
    {B(260,68,28,F)} {B(300,82,32,M)} {B(342,100,38,M)} {B(388,118,42,M)}
    {B(442,135,44,N)} {B(498,125,42,N)} {B(552,112,40,M)} {B(604,95,36,M)}
    {B(648,80,32,F)} {B(690,65,28,F)}
    {/* John Hancock Tower — glass parallelogram, very distinctive */}
    {/* Slightly slanted glass parallelogram (trapezoid) */}
    <polygon points={`476,${G-178} 484,${G-178} 524,${G-10} 516,${G-10}`} fill={TL} opacity={0.7} />
    <polygon points={`476,${G-178} 524,${G-10} 524,${G} 476,${G}`} fill={N} />
    {/* Prudential Center */}
    <rect x={548} y={G-155} width={38} height={150} fill={N} />
    <rect x={546} y={G-160} width={42} height={6} fill={TL} rx={2} opacity={0.7} />
    {/* Antenna */}
    <rect x={565} y={G-172} width={4} height={14} fill={TL} opacity={0.5} />
  </>
}

function Austin() {
  return <>
    {/* Colorado River */}
    <rect x={0} y={197} width={900} height={23} fill={WA} />
    {/* Hill Country subtle bg */}
    <polygon points="0,168 200,158 400,165 900,170 900,220 0,220" fill={MT} opacity={0.4} />
    {/* Texas State Capitol — dome on hill */}
    <rect x={380} y={G-85} width={100} height={80} fill={M} />
    {/* Dome */}
    <ellipse cx={430} cy={G-90} rx={40} ry={25} fill={N} />
    <rect x={427} y={G-118} width={6} height={30} fill={TL} />
    <ellipse cx={430} cy={G-120} rx={6} ry={6} fill={TL} />
    {/* Downtown towers (moderate height) */}
    {B(250,58,28,F)} {B(290,72,32,F)} {B(332,88,36,M)} {B(540,95,40,M)}
    {B(592,108,42,N)} {B(646,95,38,N)} {B(696,80,34,M)} {B(740,65,28,F)}
    {B(780,52,24,F)}
  </>
}

function Chicago() {
  return <>
    {/* Lake Michigan right */}
    <rect x={680} y={190} width={220} height={30} fill={WA} />
    {/* Dense skyline */}
    {B(150,68,28,F)} {B(190,85,32,M)} {B(234,105,38,M)} {B(284,125,42,M)}
    {B(338,145,46,N)} {B(396,162,48,N)} {B(456,175,50,N)} {B(518,162,48,N)}
    {B(578,148,46,N)} {B(636,130,42,M)} {B(688,112,38,M)} {B(736,92,34,F)}
    {/* Willis Tower — stepped profile */}
    <rect x={368} y={G-192} width={44} height={187} fill={N} />
    <rect x={360} y={G-170} width={60} height={20} fill={N} />
    <rect x={354} y={G-148} width={72} height={20} fill={N} />
    {/* Antenna */}
    <rect x={385} y={G-208} width={5} height={18} fill={TL} />
    <rect x={392} y={G-208} width={5} height={14} fill={TL} opacity={0.7} />
    {/* Tribune Tower / top accents */}
    {B(478,178,44,N)} {B(544,168,42,N)}
  </>
}

function LosAngeles() {
  return <>
    {/* Hollywood Hills / Santa Monica Mountains */}
    <polygon points="0,145 100,130 200,138 300,125 400,135 500,145 600,152 900,160 900,220 0,220" fill={MT} opacity={0.55} />
    {/* Griffith Observatory dome (on hill) */}
    <ellipse cx={220} cy={138} rx={22} ry={14} fill={M} />
    <rect x={208} y={138} width={24} height={20} fill={M} />
    <rect x={218} y={122} width={4} height={18} fill={TL} opacity={0.6} />
    {/* Downtown cluster */}
    {B(450,78,32,F)} {B(494,95,36,M)} {B(542,115,40,M)} {B(592,135,44,N)}
    {B(648,148,46,N)} {B(706,138,44,N)} {B(762,122,42,M)} {B(814,105,38,M)}
    {B(858,88,34,F)}
    {/* Wilshire Grand */}
    <rect x={608} y={G-168} width={36} height={163} fill={N} />
    <polygon points={`608,${G-168} 626,${G-188} 644,${G-168}`} fill={TL} opacity={0.8} />
  </>
}

function Denver() {
  return <>
    {/* Rocky Mountains — close and prominent */}
    <polygon points="0,135 80,105 150,118 210,92 270,108 330,122 900,158 900,220 0,220" fill={MT} />
    <polygon points="60,112 120,82 180,105" fill="rgba(255,255,255,0.06)" />
    {/* Colorado State Capitol dome */}
    <rect x={390} y={G-82} width={110} height={77} fill={M} />
    <ellipse cx={445} cy={G-88} rx={38} ry={24} fill={N} />
    <rect x={441} y={G-114} width={8} height={28} fill={TL} />
    <ellipse cx={445} cy={G-116} rx={7} ry={7} fill={TL} />
    {/* Downtown towers */}
    {B(260,58,28,F)} {B(300,72,32,M)} {B(342,88,36,M)} {B(542,98,40,M)}
    {B(594,112,42,N)} {B(648,100,38,N)} {B(698,85,34,M)} {B(742,70,30,F)}
  </>
}

function Miami() {
  return <>
    {/* Biscayne Bay water */}
    <rect x={0} y={194} width={900} height={26} fill={WA} />
    {/* Brickell skyline — slender modern towers */}
    {B(280,72,24,F)} {B(314,88,26,M)} {B(350,108,28,M)} {B(388,128,30,N)}
    {B(428,148,32,N)} {B(470,162,34,N)} {B(514,155,32,N)} {B(558,145,30,N)}
    {B(602,132,30,M)} {B(642,118,28,M)} {B(682,105,26,M)} {B(720,88,24,F)}
    {B(758,72,22,F)}
    {/* Brickell City Centre / tallest */}
    <rect x={448} y={G-180} width={26} height={175} fill={N} />
    <rect x={446} y={G-184} width={30} height={5} fill={TL} rx={2} />
    {/* Four Seasons */}
    <rect x={488} y={G-168} width={28} height={163} fill={N} />
    <rect x={486} y={G-172} width={32} height={5} fill={TL} rx={2} opacity={0.7} />
    {/* Art Deco hint (South Beach, lower-left) */}
    {B(150,35,30,F)} {B(190,42,32,F)} {B(230,38,28,F)}
  </>
}

function Dallas() {
  return <>
    {/* Trinity River suggestion */}
    <rect x={0} y={198} width={900} height={22} fill={WA} opacity={0.5} />
    {/* Downtown cluster */}
    {B(280,65,28,F)} {B(320,80,32,M)} {B(362,98,36,M)} {B(408,115,40,M)}
    {B(458,132,44,N)} {B(514,125,42,N)} {B(568,112,40,M)} {B(618,95,36,M)}
    {B(660,78,30,F)}
    {/* Reunion Tower — globe on stick */}
    <rect x={316} y={G-162} width={8} height={158} fill={TL} />
    {/* Globe */}
    <circle cx={320} cy={G-168} r={18} fill={TL} />
    <circle cx={320} cy={G-168} r={12} fill="rgba(20,184,166,0.25)" />
    {/* Bank of America Plaza */}
    <rect x={478} y={G-148} width={36} height={143} fill={N} />
    <rect x={476} y={G-152} width={40} height={5} fill={TL} rx={2} opacity={0.7} />
    <rect x={493} y={G-164} width={4} height={14} fill={TL} opacity={0.5} />
  </>
}

function Atlanta() {
  return <>
    {/* Piedmont Hills bg */}
    <polygon points="0,162 200,155 400,160 900,165 900,220 0,220" fill={MT} opacity={0.4} />
    {/* Downtown towers */}
    {B(300,68,30,F)} {B(342,85,34,M)} {B(388,105,38,M)} {B(438,122,42,M)}
    {B(492,138,44,N)} {B(548,128,42,N)} {B(602,112,40,M)} {B(650,95,36,F)}
    {/* Westin Peachtree — cylinder tower */}
    <rect x={460} y={G-162} width={40} height={157} fill={N} rx={20} />
    <rect x={458} y={G-166} width={44} height={6} fill={TL} rx={22} opacity={0.8} />
    {/* Bank of America Plaza */}
    <rect x={514} y={G-148} width={36} height={143} fill={N} />
    <rect x={512} y={G-152} width={40} height={5} fill={TL} rx={2} opacity={0.6} />
    <rect x={529} y={G-162} width={4} height={12} fill={TL} opacity={0.5} />
  </>
}

function Phoenix() {
  return <>
    {/* Desert flat horizon */}
    <rect x={0} y={200} width={900} height={20} fill="rgba(120,60,20,0.2)" />
    {/* Camelback Mountain — two humps, very distinctive */}
    <path d={`M0,172 Q100,145 200,162 Q280,135 360,158 L900,168 L900,220 L0,220 Z`} fill={MT} opacity={0.65} />
    {/* Two humps of Camelback */}
    <path d={`M120,162 Q180,128 240,158`} fill={MT} opacity={0.85} />
    <path d={`M240,158 Q310,132 370,158`} fill={MT} opacity={0.8} />
    {/* Downtown Phoenix cluster */}
    {B(480,62,28,F)} {B(520,78,32,M)} {B(564,95,36,M)} {B(610,112,40,N)}
    {B(660,102,38,N)} {B(708,88,34,M)} {B(752,72,30,F)}
    {/* Chase Tower */}
    <rect x={580} y={G-130} width={40} height={125} fill={N} />
    <rect x={578} y={G-134} width={44} height={5} fill={TL} rx={2} opacity={0.7} />
  </>
}

function WashingtonDC() {
  return <>
    {/* Potomac River */}
    <rect x={0} y={197} width={900} height={23} fill={WA} />
    {/* Low-rise federal buildings (height-limited DC) */}
    {B(180,42,80,F)} {B(280,45,90,F)} {B(390,40,80,F)} {B(570,45,90,F)} {B(680,42,80,F)}
    {/* US Capitol — dome + wings */}
    <rect x={340} y={G-78} width={140} height={73} fill={M} />
    <ellipse cx={410} cy={G-84} rx={42} ry={28} fill={N} />
    <rect x={406} y={G-115} width={8} height={32} fill={TL} />
    <ellipse cx={410} cy={G-117} rx={7} ry={7} fill={TL} />
    {/* Washington Monument — tall obelisk */}
    <polygon points={`200,${G-190} 212,${G-190} 220,${G} 192,${G}`} fill={TL} />
    <polygon points={`200,${G-190} 206,${G-202} 212,${G-190}`} fill={TL} opacity={0.9} />
    {/* Lincoln Memorial column suggestion */}
    {B(100,38,60,F)}
  </>
}

function Houston() {
  return <>
    {/* Houston Ship Channel / Buffalo Bayou */}
    <rect x={0} y={198} width={900} height={22} fill={WA} opacity={0.4} />
    {/* Flat Gulf Coast terrain */}
    <polygon points="0,170 900,170 900,220 0,220" fill={MT} opacity={0.3} />
    {/* Downtown cluster */}
    {B(280,68,30,F)} {B(322,85,34,M)} {B(368,105,38,M)} {B(418,125,42,M)}
    {B(472,142,46,N)} {B(530,158,50,N)} {B(592,145,46,N)} {B(650,132,44,N)}
    {B(706,115,40,M)} {B(756,95,36,M)} {B(800,78,30,F)}
    {/* JPMorgan Chase Tower — angled/trapezoid top */}
    <polygon points={`510,${G-180} 530,${G-188} 558,${G-188} 572,${G-175} 572,${G} 510,${G}`} fill={N} />
    <polygon points={`510,${G-180} 530,${G-188} 558,${G-188} 572,${G-175}`} fill={TL} opacity={0.7} />
    {/* Williams Tower */}
    <rect x={596} y={G-160} width={40} height={155} fill={N} />
    <rect x={594} y={G-164} width={44} height={5} fill={TL} rx={2} opacity={0.6} />
  </>
}

function Nashville() {
  return <>
    {/* Cumberland River */}
    <rect x={0} y={197} width={900} height={23} fill={WA} />
    {/* Tennessee hills bg */}
    <polygon points="0,165 200,158 400,163 900,168 900,220 0,220" fill={MT} opacity={0.4} />
    {/* Downtown cluster */}
    {B(280,65,28,F)} {B(318,80,32,M)} {B(358,98,36,M)} {B(400,115,40,M)}
    {B(450,128,42,N)} {B(556,118,40,N)} {B(604,102,38,M)} {B(648,85,32,F)}
    {/* AT&T Building "Batman" — twin spires */}
    <rect x={462} y={G-168} width={40} height={163} fill={N} />
    {/* Twin spires (the "bat ears") */}
    <polygon points={`462,${G-168} 462,${G-198} 474,${G-182}`} fill={TL} />
    <polygon points={`502,${G-168} 502,${G-198} 490,${G-182}`} fill={TL} />
    {/* Pinnacle building */}
    <rect x={516} y={G-148} width={38} height={143} fill={N} />
    <rect x={514} y={G-152} width={42} height={5} fill={TL} rx={2} opacity={0.6} />
  </>
}

// ─── city → component map ─────────────────────────────────────────────────────

const SKYLINES: Record<string, () => React.JSX.Element> = {
  vancouver:          Vancouver,
  toronto:            Toronto,
  calgary:            Calgary,
  montreal:           Montreal,
  ottawa:             Ottawa,
  edmonton:           Edmonton,
  winnipeg:           Winnipeg,
  halifax:            Halifax,
  victoria:           Victoria,
  hamilton:           Hamilton,
  'kitchener-waterloo': KitchenerWaterloo,
  'quebec-city':      QuebecCity,
  seattle:            Seattle,
  'san-francisco':    SanFrancisco,
  'new-york':         NewYork,
  boston:             Boston,
  austin:             Austin,
  chicago:            Chicago,
  'los-angeles':      LosAngeles,
  denver:             Denver,
  miami:              Miami,
  dallas:             Dallas,
  atlanta:            Atlanta,
  phoenix:            Phoenix,
  'washington-dc':    WashingtonDC,
  houston:            Houston,
  nashville:          Nashville,
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
      <rect x={0} y={G} width={900} height={15} fill="rgba(0,0,0,0.25)" />
    </svg>
  )
}
