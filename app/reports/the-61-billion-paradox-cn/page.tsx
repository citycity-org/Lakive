import type { Metadata } from 'next'
import ShareBar from '@/components/ShareBar'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '610亿加元悖论 · Lakive Deep Dive 01',
  description: '2026年第二季度，非居民净买入613亿加元加拿大联邦政府债券，创季度历史最高纪录。但许多生活在加拿大的人仍感到住房与生活成本压力。Lakive 深度分析背后原因。',
  alternates: {
    canonical: 'https://lakive.com/reports/the-61-billion-paradox-cn',
    languages: { 'en': 'https://lakive.com/reports/the-61-billion-paradox' },
  },
  openGraph: {
    title: '610亿加元悖论 — 加拿大借得到钱，但加拿大人还住得起吗？',
    description: '2026年Q2，外资创纪录买入613亿联邦债券。Lakive 追问：这份金融信用为何没有传导到普通家庭？',
    type: 'article',
    publishedTime: '2026-09-14',
  },
}

// ── Design tokens ────────────────────────────────────────────────────────────
const NAVY  = '#0d1f44'
const TEAL  = '#14B8A6'
const BLUE  = '#4F8EF7'
const AMBER = '#D97706'
const GREY  = '#64748B'
const BODY  = '#374151'
const BG    = '#F8FAFC'

// ── Shared primitives ─────────────────────────────────────────────────────────
function SectionHeading({ num, title }: { num: number; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, margin: '52px 0 18px' }}>
      <div style={{ width: 4, minHeight: 28, borderRadius: 2, background: `linear-gradient(to bottom,${TEAL},${BLUE})`, flexShrink: 0, marginTop: 3 }} />
      <h2 style={{ fontSize: 21, fontWeight: 800, color: NAVY, margin: 0, lineHeight: 1.3 }}>
        {num}. {title}
      </h2>
    </div>
  )
}

function Body({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 15, color: BODY, lineHeight: 1.85, margin: '0 0 16px' }}>{children}</p>
}

function Callout({ label, text, color = TEAL, bg = '#F0FDFA' }: { label: string; text: string; color?: string; bg?: string }) {
  return (
    <div style={{ borderLeft: `4px solid ${color}`, background: bg, padding: '12px 16px', borderRadius: '0 8px 8px 0', margin: '18px 0' }}>
      <span style={{ fontWeight: 700, color, fontSize: 14 }}>{label} </span>
      <span style={{ fontSize: 14, color: '#1F2937', lineHeight: 1.75 }}>{text}</span>
    </div>
  )
}

function FigureBlock({ num, title, source, children }: { num: number; title: string; source: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '24px 28px', margin: '24px 0' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: GREY, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 6 }}>图 {num}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 16 }}>{title}</div>
      {children}
      <div style={{ fontSize: 11, color: GREY, fontStyle: 'italic', marginTop: 14, paddingTop: 10, borderTop: '1px solid #F3F4F6' }}>
        {source}
      </div>
    </div>
  )
}

function StatRow({ label, value, sub, color = NAVY }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
      <span style={{ fontSize: 13, color: BODY }}>{label}</span>
      <div style={{ textAlign: 'right' }}>
        <span style={{ fontSize: 15, fontWeight: 800, color }}>{value}</span>
        {sub && <div style={{ fontSize: 11, color: GREY }}>{sub}</div>}
      </div>
    </div>
  )
}

function NestBar({ label, value, pct, color }: { label: string; value: string; pct: number; color: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: BODY }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{value}</span>
      </div>
      <div style={{ height: 8, background: '#F3F4F6', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4 }} />
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function DeepDiveCnPage() {
  return (
    <main style={{ minHeight: '100vh', background: BG }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(160deg,#0d1117 0%,#0d1f44 50%,#0d2a3d 100%)', padding: '64px 24px 56px', color: 'white' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>

          {/* breadcrumb */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
            <Link href="/reports" style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12, textDecoration: 'none' }}>报告</Link>
            <span style={{ color: 'rgba(255,255,255,0.20)', fontSize: 12 }}>›</span>
            <span style={{ color: 'rgba(255,255,255,0.40)', fontSize: 12 }}>深度报告</span>
            <span style={{ marginLeft: 8 }}>
              <Link href="/reports/the-61-billion-paradox" style={{ fontSize: 11, color: TEAL, textDecoration: 'none', border: `1px solid ${TEAL}50`, padding: '2px 10px', borderRadius: 12, fontWeight: 600 }}>
                English version →
              </Link>
            </span>
          </div>

          {/* label chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: TEAL, background: `${TEAL}18`, border: `1px solid ${TEAL}40`, padding: '4px 12px', borderRadius: 20 }}>DEEP DIVE 01</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#93C5FD', background: 'rgba(79,142,247,0.12)', border: '1px solid rgba(79,142,247,0.30)', padding: '4px 12px', borderRadius: 20 }}>加拿大</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#FCD34D', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.30)', padding: '4px 12px', borderRadius: 20 }}>2026年9月</span>
          </div>

          {/* stat callout */}
          <div style={{ display: 'inline-block', background: `${TEAL}18`, border: `1px solid ${TEAL}40`, borderRadius: 16, padding: '16px 24px', marginBottom: 32 }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: TEAL, letterSpacing: '-0.03em', lineHeight: 1 }}>613亿加元</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 6 }}>
              2026年Q2，非居民净买入联邦政府债券——季度历史最高纪录
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(24px,4.5vw,40px)', fontWeight: 900, lineHeight: 1.2, letterSpacing: '-0.01em', margin: '0 0 18px' }}>
            610亿加元悖论<br />
            <span style={{ color: TEAL }}>加拿大借得到钱，</span>
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>但加拿大人还住得起吗？</span>
          </h1>

          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, maxWidth: 640, margin: '0 0 32px' }}>
            如果全球资本如此愿意把钱借给加拿大，为什么许多生活在加拿大的人仍然感到住房与生活成本压力？
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>发布于 2026年9月14日</span>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>约15分钟阅读</span>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>数据来源：Statistics Canada、加拿大央行</span>
          </div>
        </div>
      </section>

      {/* ── Article body ─────────────────────────────────────────────────── */}
      <article style={{ maxWidth: 780, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Intro summary */}
        <div style={{ background: '#fff', border: `1px solid ${BLUE}30`, borderLeft: `4px solid ${BLUE}`, borderRadius: '0 12px 12px 0', padding: '20px 24px', marginBottom: 40 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: BLUE, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>一页看懂</div>
          <Body>
            2026年第二季度，外国投资者（Statistics Canada 统计口径中的"非居民"）净买入613亿加元联邦政府债券；各级政府债券的外国净买入超过810亿加元。
            与此同时，外国投资加拿大债务证券达到1102亿加元的历史高位，却净减持96亿加元加拿大股票。
          </Body>
          <Body>
            但同一个季度，加拿大实际 GDP 环比增长 0.8%，经常账户转为 88 亿加元顺差，家庭储蓄率升至 3.7%，
            家庭债务收入比与债务偿付率均改善。
          </Body>
          <p style={{ fontSize: 14, fontWeight: 700, color: NAVY, margin: 0 }}>
            本报告研究的是一个更长期、更贴近生活的问题：加拿大强大的金融信用，究竟能多有效地转化为生产能力、工资、住房、公共服务与家庭可负担的城市生活？
          </p>
        </div>

        {/* Section 1 */}
        <SectionHeading num={1} title="外国投资者实际买了什么？" />
        <Body>
          他们不是笼统地"向加拿大投资了 613 亿加元"，而是在净买入加拿大联邦政府债券。第二季度，
          外国投资者对加拿大证券净投资 1006 亿加元；其中债务证券 1102 亿，政府债券 808 亿，
          而加拿大股票则净减持 96 亿。
        </Body>
        <Body>
          购买股票主要是在承担企业盈利风险；直接投资工厂是在押注未来生产；购买主权债券，则更多涉及政府信用、
          收益率、流动性、汇率敞口与风险配置。613 亿这个核心数字说明的是国际资本对加拿大联邦债务的强烈需求，
          而不是 613 亿外国直接投资。
        </Body>
        <Callout
          label="值得注意："
          text="613 亿几乎是上一季度纪录的两倍，而且国际买盘部分被加拿大本国机构投资者——包括银行、养老金和共同基金——历史最大规模的政府债券减持所抵消。"
          color={BLUE}
          bg="#EFF6FF"
        />

        <FigureBlock
          num={1}
          title="2026 Q2 外资债券投资的层层包含关系"
          source="来源：Statistics Canada [1][3] · Lakive 制图。613 亿联邦债券来自 [3] from-whom-to-whom 数据；808 亿政府债券与 1102 亿债务证券来自 [1]。"
        >
          <NestBar label="加拿大债务证券（合计）" value="1102亿加元" pct={100} color="#4F8EF7" />
          <NestBar label="政府债券（各级政府）" value="808亿加元" pct={73} color="#14B8A6" />
          <NestBar label="联邦政府债券（非居民）" value="613亿加元" pct={56} color={TEAL} />
          <NestBar label="加拿大股票（净减持）" value="−96亿加元" pct={9} color="#EF4444" />
        </FigureBlock>

        {/* Section 2 */}
        <SectionHeading num={2} title="他们是在押注加拿大的强，还是弱？" />
        <Body>
          最稳妥的答案是：至少有三种动机可能同时存在。第一是主权信用——加拿大仍是全球大型机构可以配置的高流动性
          发达经济体债券市场；第二是安全资产需求；第三才是利率与久期交易。
        </Body>
        <Body>
          但"他们在押注加拿大降息"并不是 Q2 数据支持的主要叙事。加拿大央行 Q2 Market Participants Survey 显示，
          2026 年底政策利率预测中位数仍为 2.25%；40% 的受访者认为利率风险偏向更高路径，只有 28% 认为偏向更低路径。
        </Body>
        <Callout
          label="稳妥的解读："
          text="613 亿更适合被理解为对加拿大主权债务可持有性与金融信用的强烈认可，而不能直接等同于「全球资本看好加拿大经济高速增长」。"
          color={TEAL}
          bg="#F0FDFA"
        />

        <FigureBlock
          num={2}
          title="非居民持有加拿大联邦政府债券的比例：27.0% → 44.6%"
          source="来源：Statistics Canada [2] · Lakive 制图。图中仅展示官方明确给出的两个端点，不假设中间路径为线性。"
        >
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', padding: '8px 0' }}>
            {[{ year: '较早期', pct: 27.0, color: '#E5E7EB' }, { year: '2026年Q2', pct: 44.6, color: TEAL }].map(d => (
              <div key={d.year} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: 140 * d.pct / 50, background: d.color, borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 8 }}>
                  <span style={{ fontSize: 18, fontWeight: 900, color: d.color === TEAL ? 'white' : NAVY }}>{d.pct}%</span>
                </div>
                <div style={{ fontSize: 12, color: GREY, marginTop: 6 }}>{d.year}</div>
              </div>
            ))}
          </div>
        </FigureBlock>

        {/* Section 3 */}
        <SectionHeading num={3} title="为什么加拿大资金反而在大量买美国股票？" />
        <Body>
          第二季度，加拿大投资者净买入 456 亿加元外国证券，其中外国股票净买入 355 亿；仅美国股票就净买入 378 亿。
          这意味着加拿大投资者对非美国外国股票合计约为净减持，而海外股票净配置几乎全部流向美国。
          与此同时，加拿大投资者连续第三个季度减持美国政府债券，当季净减持 144 亿加元。
        </Body>
        <Body>
          这形成了一个有意思的对照：外国资本大举买入加拿大政府债务，而加拿大资本的海外股票配置高度集中于美国。
          这并不证明加拿大投资者"不相信加拿大"——全球分散配置本来就是正常行为。但它提出了一个值得长期追踪的问题：
          加拿大是否特别擅长吸引全球资金为"稳定"融资，却没有同样强的能力把风险资本留在国内、转化为未来增长？
        </Body>

        <FigureBlock
          num={3}
          title="资本流向的反差：加拿大债务与美国资产"
          source="来源：Statistics Canada [1] · Lakive 制图。所有数值均为净投资/净减持口径。"
        >
          <StatRow label="非居民 → 加拿大联邦政府债券" value="+613亿加元" color={TEAL} />
          <StatRow label="加拿大投资者 → 美国股票（净买入）" value="+378亿加元" color={BLUE} />
          <StatRow label="加拿大投资者 → 美国政府债券（净减持）" value="−144亿加元" color="#E86C2F" />
          <StatRow label="外国投资者 → 加拿大股票（净减持）" value="−96亿加元" color="#E86C2F" />
        </FigureBlock>

        {/* Section 4 */}
        <SectionHeading num={4} title="加拿大缺的是资本，还是把资本转化为未来生活的能力？" />
        <Body>
          创纪录的债券流入至少说明，加拿大的问题不能简单描述为"没有钱愿意进来"。真正的问题是资金最终进入了什么：
          电网、交通、住房配套基础设施、工厂、设备、技术与研发，还是更多用于既有资产、当前支出与金融交易？
        </Body>
        <Body>
          政府借债也不能只看总量。第二季度政府总债务人均达到 105,455 加元，名义 GDP 人均为 83,003 加元；
          但前者是债务存量，后者是年度经济流量，不能当成同口径比率比较。
          同时，联邦政府净金融负债/GDP 下降到 33.3%，其他各级政府净债务/GDP 下降到 14.7%，联邦金融负债有效利率为 3.00%。
        </Body>
        <Callout
          label="更准确的问题："
          text="不是「加拿大债务是不是太高」，而是：加拿大是否正在用自己的金融信用建立足够多的未来生产能力，并让这些能力最终转化为居民生活水平？"
          color={AMBER}
          bg="#FFFBEB"
        />

        <FigureBlock
          num={4}
          title="公共债务：总量、净债务与融资成本需要一起看"
          source="来源：Statistics Canada [3] · Lakive 制图。总债务为存量、GDP 为年度流量；并列仅用于展示规模。"
        >
          <StatRow label="政府总债务人均" value="105,455加元" sub="存量指标" />
          <StatRow label="名义 GDP 人均" value="83,003加元" sub="年度流量——不宜直接比较" color={GREY} />
          <StatRow label="联邦政府净金融负债 / GDP" value="33.3%" color={TEAL} />
          <StatRow label="其他各级政府净债务 / GDP" value="14.7%" color={TEAL} />
          <StatRow label="联邦金融负债有效利率" value="3.00%" />
        </FigureBlock>

        {/* Section 5 */}
        <SectionHeading num={5} title="别忽略反方证据：Q2 宏观数据其实并不差" />
        <Body>
          如果只看住房压力、债务和资本错配，容易形成选择性叙事。第二季度的加拿大宏观数据事实上出现明显反弹：
          实际 GDP 环比增长 0.8%；经常账户录得 88 亿加元顺差，为 2005 年以来最大；家庭储蓄率升至 3.7%。
        </Body>
        <Body>
          家庭杠杆也有所改善：家庭信用市场债务/可支配收入从 178.6% 降至 176.4%，债务偿付率降至 14.52%。
          这些数据说明，613 亿悖论不是"一个坏季度里为什么还有人买加拿大"的故事。
        </Body>
        <Callout
          label="Lakive 真正关注的是长期问题："
          text="即使宏观经济阶段性改善、国家资产负债表很强，普通家庭是否能够持续感受到工资购买力、住房可得性和公共服务的同步改善？"
          color={BLUE}
          bg="#EFF6FF"
        />

        <FigureBlock
          num={5}
          title="Q2 不是一个「全面恶化」的季度"
          source="来源：Statistics Canada [1][3] · Lakive 制图。GDP 为季度环比；其余为第二季度水平或比率。"
        >
          <StatRow label="实际 GDP 增长（季度环比）" value="+0.8%" color={TEAL} />
          <StatRow label="经常账户顺差" value="88亿加元" sub="2005 年以来最大" color={TEAL} />
          <StatRow label="家庭储蓄率" value="3.7%" color={TEAL} />
          <StatRow label="家庭信用债务 / 可支配收入" value="176.4%" sub="↓ 从 178.6%" color={TEAL} />
          <StatRow label="家庭债务偿付率" value="14.52%" color={TEAL} />
        </FigureBlock>

        {/* Section 6 */}
        <SectionHeading num={6} title="国家金融实力如何真正到达一个家庭？" />
        <Body>
          联邦政府债券似乎离一个人的房租、房贷续约、工资、通勤和家庭医生很远，但它们处在同一个经济系统中。
          全球资本影响政府融资条件，财政能力影响公共投资与服务，投资影响生产能力和就业，
          工资再与住房、税费、交通和其他生活成本共同决定家庭剩余空间。
        </Body>

        <FigureBlock
          num={6}
          title="Lakive「资本 → 生活」传导框架"
          source="概念框架：Lakive。箭头表示可能的经济传导渠道，不代表简单的一对一因果关系。"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { step: '全球资本', desc: '创纪录 613 亿加元债券流入' },
              { step: '政府融资条件', desc: '较低借贷成本 · 财政能力' },
              { step: '公共投资', desc: '基础设施 · 交通 · 住房配套' },
              { step: '生产能力', desc: '就业 · 工资 · 公共服务' },
              { step: '家庭可支配空间', desc: '工资减去住房、税费、交通、必要生活支出' },
            ].map((r, i, arr) => (
              <div key={r.step}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: i === arr.length - 1 ? `${TEAL}12` : '#F8FAFC', border: i === arr.length - 1 ? `1px solid ${TEAL}40` : '1px solid #E5E7EB', borderRadius: 10, padding: '10px 16px' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: i === arr.length - 1 ? TEAL : BLUE, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{r.step}</div>
                    <div style={{ fontSize: 12, color: GREY }}>{r.desc}</div>
                  </div>
                </div>
                {i < arr.length - 1 && <div style={{ textAlign: 'center', color: GREY, fontSize: 14, margin: '2px 0' }}>↓</div>}
              </div>
            ))}
          </div>
        </FigureBlock>

        <Body>
          真正需要寻找的是传导中的薄弱环节：钱是否进入了高生产率投资？基础设施是否能及时落地？住房供给是否跟得上家庭形成和人口变化？
          工资增长是否能跑赢必要生活成本？公共支出是否转化成居民实际能使用的服务？
        </Body>

        {/* Section 7 */}
        <SectionHeading num={7} title="加拿大越来越富，但谁拥有这些财富？" />
        <Body>
          第二季度，加拿大家庭净资产增长 2.9%，突破 19 万亿加元，单季增加约 5000 亿；
          人均净资产增加 13,785 加元，达到 462,336 加元。从总量上看，这是非常强劲的家庭资产负债表表现。
        </Body>
        <Body>
          但财富分布决定了"平均数"如何被真实家庭感受到。Statistics Canada 指出，最高财富五分位家庭持有全部金融资产的 69.0%，
          并持有 49.7% 的非金融资产，因此市场上涨并不会被所有加拿大家庭平均分享。
        </Body>
        <Callout
          label="为什么这很重要："
          text="对于没有大量既有资产、主要依赖劳动收入的家庭，真正重要的问题不是全国平均净资产是多少，而是自己的工作收入在所在城市究竟能购买多少住房、服务与时间。"
          color={TEAL}
          bg="#F0FDFA"
        />

        <FigureBlock
          num={7}
          title="资产上涨并不会被所有家庭平均分享"
          source="来源：Statistics Canada [3] · Lakive 制图。分布数据为该 NBSFA 发布所引用的最新家庭经济账户分布数据。"
        >
          <StatRow label="家庭净资产（2026年Q2）" value=">19万亿加元" sub="单季 +2.9%" color={TEAL} />
          <StatRow label="人均净资产" value="462,336加元" sub="+13,785 vs Q1" color={TEAL} />
          <StatRow label="最高财富五分位持有金融资产占比" value="69.0%" color="#E86C2F" />
          <StatRow label="最高财富五分位持有非金融资产占比" value="49.7%" color="#E86C2F" />
        </FigureBlock>

        <FigureBlock
          num={8}
          title="加拿大净国际投资头寸：单季增加 6192 亿，但主要来自资产重估"
          source="来源：Statistics Canada [2] · Lakive 制图。本图仅展示官方直接公布的主要贡献项。"
        >
          <StatRow label="净国际投资头寸变动" value="+6192亿加元" sub="2026年Q2 单季" color={TEAL} />
          <StatRow label="主要驱动" value="资产重估" sub="并非新增资本流入" color={AMBER} />
        </FigureBlock>

        {/* Section 8 */}
        <SectionHeading num={8} title="标题最后要落到住房：加拿大人真的「住得起」了吗？" />
        <Body>
          第二季度，加拿大家庭住宅房地产总值小幅上升 0.4%，达到 8.5233 万亿加元，但同比仍下降 0.3%。
          住宅投资环比反弹 2.5%，二手房交易额也环比回升；然而，这仍是 2021 年以来二手房成交最弱的第二季度。
        </Body>
        <Body>
          与此同时，按揭借款连续第二个季度下降至 194 亿加元，为 2024 年第一季度以来最慢的借款速度。
          这组数据没有给出一个简单的"住房正在崩"或"住房已经复苏"的答案。
        </Body>
        <Body>
          更重要的是，全国金融条件最终会落到完全不同的本地市场。高房价大都市可能让较高工资仍被住房成本吞噬；
          低房价城市可能提供更强购买力，却面对不同的就业深度、医疗、交通和基础设施约束。
          所以不存在一个适用于全国的单一答案。
        </Body>

        <FigureBlock
          num={9}
          title='"住得起吗？"：2026 Q2 住房市场的三个信号'
          source="来源：Statistics Canada [3] · Lakive 制图。"
        >
          <StatRow label="家庭住宅房地产总值" value="8.52万亿加元" sub="+0.4% 季度 · −0.3% 年度" />
          <StatRow label="住宅投资（季度环比）" value="+2.5%" color={TEAL} />
          <StatRow label="按揭借款" value="194亿加元" sub="连续第二季度下降——2024年Q1以来最慢" color={AMBER} />
        </FigureBlock>

        {/* Conclusion */}
        <div style={{ background: 'linear-gradient(135deg,#0d1f44,#0d2a3d)', borderRadius: 20, padding: '36px 36px 32px', margin: '48px 0 40px', color: 'white' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>结论</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 18px', lineHeight: 1.3 }}>真正的 610 亿加元悖论</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.85, margin: '0 0 16px' }}>
            世界愿意把钱借给加拿大。加拿大将如何使用这份信任？
          </p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.85, margin: '0 0 16px' }}>
            613 亿加元的纪录说明，加拿大仍然拥有强大的主权融资吸引力；它却不能单独证明经济会高速增长，
            也不能证明家庭会自动变得更富或住房更可负担。同样，Q2 的 GDP 反弹、经常账户顺差和家庭杠杆改善，
            也不能自动消除长期的住房、财富分布与生活成本问题。两组事实可以同时成立。
          </p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.85, margin: '0 0 24px' }}>
            真正值得追踪的是<strong style={{ color: TEAL }}>转化效率</strong>：加拿大能否把金融信用转化为生产性投资，
            把投资转化为生产率和工资，把工资与公共服务的改善保留下来，而不是被住房和必要生活成本完全吸收？
          </p>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'white', fontStyle: 'italic', margin: 0 }}>
            最终，对普通家庭最重要的不是加拿大能借到多少钱，而是：我在这里建立的生活，究竟能负担得起什么？
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', margin: '0 0 56px' }}>
          <p style={{ fontSize: 15, color: BODY, lineHeight: 1.75, marginBottom: 20 }}>
            使用 Lakive City Fit Calculator，把收入、职业和住房选择放进不同城市的现实成本中比较，
            看看你的工作在哪座城市能走得更远。
          </p>
          <Link
            href="/calculate"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', borderRadius: 14, background: `linear-gradient(135deg,${TEAL},${BLUE})`, color: 'white', fontSize: 15, fontWeight: 700, textDecoration: 'none' }}
          >
            计算我的城市适配度 →
          </Link>
        </div>

        {/* References */}
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '24px 28px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: GREY, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 16 }}>参考资料与数据说明</div>
          {[
            '[1] Statistics Canada（2026-08-27），Canada\'s balance of international payments, second quarter 2026，The Daily。',
            '[2] Statistics Canada（2026-09-10），Canada\'s international investment position, second quarter 2026，The Daily；Table 36-10-0485-01。',
            '[3] Statistics Canada（2026-09-11），National balance sheet and financial flow accounts, second quarter 2026，The Daily。',
            '[4] Bank of Canada（2026-07-27），Market Participants Survey — Second Quarter of 2026。',
            '[5] Bank of Canada（2026-09-02），Bank of Canada maintains the policy rate at 2¼%。',
          ].map((ref, i) => (
            <p key={i} style={{ fontSize: 12, color: GREY, lineHeight: 1.7, margin: '0 0 8px' }}>{ref}</p>
          ))}
          <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid #F3F4F6' }}>
            <p style={{ fontSize: 12, color: GREY, lineHeight: 1.7, margin: '0 0 6px' }}>
              <strong>口径说明：</strong>本文"外国投资者"对应 Statistics Canada 的 non-residents（非居民）统计口径。
              613 亿加元为 2026 年第二季度非居民净买入联邦政府债券，不是外国直接投资；808 亿为各级政府债券的外国净买入。
            </p>
            <p style={{ fontSize: 12, color: GREY, lineHeight: 1.7, margin: 0 }}>
              <strong>解读边界：</strong>官方汇总数据并不识别单一投资者动机，因此"主权信用、安全资产需求、利率头寸配置"等属于可能并存的解释，
              而不是被数据直接证明的唯一因果关系。
            </p>
          </div>
        </div>

        {/* Share bar */}
        <ShareBar
          url="https://lakive.com/reports/the-61-billion-paradox-cn"
          title="610亿加元悖论 · 外国资本大举入市，本地居民为何仍感住房压力？"
          lang="zh"
        />

                {/* Language link */}
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link href="/reports/the-61-billion-paradox" style={{ fontSize: 13, color: TEAL, textDecoration: 'none', fontWeight: 600 }}>
            Read English version →
          </Link>
        </div>

      </article>
    </main>
  )
}
