import { useMemo, useState } from "react";
import "./App.css";

const salaryData = [
  { company: "삼성전자", industry: "반도체·전자", salary: "8,900만원", growth: "+4.8%" },
  { company: "네이버", industry: "IT·플랫폼", salary: "7,600만원", growth: "+6.2%" },
  { company: "현대자동차", industry: "자동차", salary: "8,200만원", growth: "+3.5%" },
  { company: "카카오", industry: "IT·플랫폼", salary: "7,200만원", growth: "+2.9%" },
];

const services = [
  { icon: "₩", title: "기업 연봉조회", text: "기업별 평균 연봉과 직급별 보상 수준을 한눈에 비교하세요.", color: "mint" },
  { icon: "★", title: "대기업 전용관", text: "주요 대기업의 채용·연봉·복지 정보를 모아서 확인하세요.", color: "blue" },
  { icon: "↗", title: "연봉 분석", text: "직무와 경력에 따른 내 연봉 수준을 데이터로 분석해 드려요.", color: "orange" },
];

const stats = [
  ["연봉 보유기업", "513,003", "개사"],
  ["연봉 데이터", "13,468,834", "건"],
  ["오늘 조회", "28,491", "건"],
  ["등록 회원", "50,000+", "명"],
];

function SearchIcon() {
  return <span aria-hidden="true" className="search-icon">⌕</span>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="header">
      <div className="header-inner">
        <a className="logo" href="#top" aria-label="JOB DATA 홈">
          <span className="logo-mark">J</span>
          <span>JOB <b>DATA</b></span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="메뉴 열기">☰</button>
        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#services">서비스 소개</a>
          <a href="#salary">연봉 조회</a>
          <a href="#insight">전문정보 조회</a>
          <a href="#report">임금체불 신고센터</a>
        </nav>
        <div className="user-actions">
          <button className="text-button">로그인</button>
          <button className="join-button">무료 회원가입</button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const submit = (event) => {
    event.preventDefault();
    onSearch(keyword.trim());
  };

  return (
    <section className="hero" id="top">
      <div className="hero-glow glow-one" />
      <div className="hero-glow glow-two" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">MORE AND BETTER JOB DATA</span>
          <h1>더 나은 커리어를 위한<br /><em>정확한 기업 데이터</em></h1>
          <p>당신이 근무하고 싶은 회사는 어디인가요?<br />검증된 연봉 데이터로 커리어의 다음 선택을 설계하세요.</p>
          <form className="company-search" onSubmit={submit}>
            <SearchIcon />
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="회사명 또는 사업자번호를 입력하세요" aria-label="회사 검색" />
            <button type="submit">검색</button>
          </form>
          <div className="popular"><span>인기 검색</span><button onClick={() => setKeyword("삼성전자")}>삼성전자</button><button onClick={() => setKeyword("네이버")}>네이버</button><button onClick={() => setKeyword("현대자동차")}>현대자동차</button></div>
        </div>
        <div className="dashboard-card" aria-label="연봉 데이터 미리보기">
          <div className="mock-head"><span>기업 연봉 리포트</span><span className="live"><i /> LIVE DATA</span></div>
          <div className="mock-company"><div className="company-symbol">J</div><div><b>잡데이터 테크</b><small>IT·데이터 서비스</small></div><strong>7,840<small>만원</small></strong></div>
          <div className="chart-area">
            {[48, 62, 55, 76, 68, 88, 82].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
            <span className="chart-line">⌁</span>
          </div>
          <div className="mock-labels"><span>신입</span><span>3년차</span><span>5년차</span><span>7년차</span><span>10년차</span></div>
          <div className="mock-summary"><span><small>동종업계 순위</small><b>상위 12%</b></span><span><small>전년 대비</small><b className="up">+5.8%</b></span><span><small>데이터 신뢰도</small><b>매우 높음</b></span></div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-title"><span>핵심 기능</span><h2>데이터로 확인하는 나의 커리어</h2><p>흩어진 기업 정보를 쉽고 빠르게 비교할 수 있습니다.</p></div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <div className={`service-icon ${service.color}`}>{service.icon}</div>
              <h3>{service.title}</h3><p>{service.text}</p><button>자세히 보기 <span>→</span></button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SalaryPreview({ searchKeyword }) {
  const [filter, setFilter] = useState("전체");
  const filtered = useMemo(() => salaryData.filter((item) => (filter === "전체" || item.industry.includes(filter)) && (!searchKeyword || item.company.includes(searchKeyword))), [filter, searchKeyword]);
  return (
    <section className="salary-section" id="salary">
      <div className="container salary-layout">
        <div className="salary-copy"><span className="section-kicker">SALARY INSIGHT</span><h2>관심 기업의 연봉을<br />한 번에 비교하세요</h2><p>산업과 기업을 선택하면 최신 연봉 정보와 상승률을 빠르게 비교할 수 있습니다.</p><div className="filter-row">{["전체", "IT", "자동차"].map((item) => <button className={filter === item ? "active" : ""} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
        <div className="salary-table-wrap">
          <div className="table-heading"><b>{searchKeyword ? `'${searchKeyword}' 검색 결과` : "주목받는 기업"}</b><span>2026년 기준</span></div>
          <div className="salary-table">
            {filtered.length ? filtered.map((item, index) => <div className="salary-row" key={item.company}><span className="rank">{index + 1}</span><span className="company-name"><b>{item.company}</b><small>{item.industry}</small></span><strong>{item.salary}</strong><em>{item.growth}</em></div>) : <div className="empty-result">일치하는 기업이 없습니다. 인기 기업명으로 검색해보세요.</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReportBanner() {
  return <section className="report-section" id="report"><div className="container report-inner"><div className="report-icon">!</div><div><span>임금체불 신고센터</span><h2>받지 못한 소중한 월급,<br />혼자 고민하지 마세요.</h2><p>5만 회원사 네트워크와 함께 체불임금 해결을 지원합니다.</p></div><button>무료 신고 시작하기 <span>→</span></button></div></section>;
}

function Stats() {
  return <section className="stats" id="insight"><div className="container stats-grid">{stats.map(([label, value, unit]) => <div key={label}><span>{label}</span><strong>{value}</strong><small>{unit}</small></div>)}</div></section>;
}

function Footer() {
  return <footer><div className="container footer-inner"><div><div className="logo footer-logo"><span className="logo-mark">J</span><span>JOB <b>DATA</b></span></div><p>더 좋은 일자리 선택을 위한 기업 데이터 플랫폼</p></div><div className="footer-links"><a href="#top">회사소개</a><a href="#top">이용약관</a><a href="#top">개인정보 처리방침</a><a href="#top">사이트맵</a></div><p className="copyright">© 2026 JOB DATA. All rights reserved.</p></div></footer>;
}

export default function App() {
  const [searchKeyword, setSearchKeyword] = useState("");
  return <><Header /><main><Hero onSearch={setSearchKeyword} /><Services /><SalaryPreview searchKeyword={searchKeyword} /><ReportBanner /><Stats /></main><Footer /></>;
}
