// 사이드바 공모전 정보 클릭 시

import React from "react";
import styles from "./CntstInfo.module.css";

const MyCntstInfo = ({ compinfo }) => {
  return (
    <div>
      <h2 className={styles.title2}>{compinfo.name}</h2>

      <ul className={styles.infoList}>
        <li className={styles.li}>
          <span className={styles.label}>접수 기간 </span>
          <span className={styles.content}>{compinfo.startDate}~{compinfo.endDate}</span>
        </li>
        <li className={styles.li}>
          <span className={styles.label}>기관 </span>
          <span className={styles.content}>{compinfo.organization}</span>
        </li>
        <li className={styles.li}>
          <span className={styles.label}>공모 주제 </span>
          <span className={styles.content}>{compinfo.theme}</span>
        </li>
        <li className={styles.li}>
          <span className={styles.label}>지원 자격 </span>
          <span className={styles.content}>{compinfo.eligibillty}</span>
        </li>
        <li className={styles.li}>
          <span className={styles.label}>지원 방법 </span>
          <span className={styles.content}>{compinfo.applicationMethod}</span>
        </li>
        <li className={styles.li}>
          <span className={styles.label}>시상 </span>
          <span className={styles.content}>{compinfo.reward}</span>
        </li>
        <li className={styles.li}>
          <span className={styles.label}>문의 사항 </span>
          <span className={styles.content}>{compinfo.contact}</span>
        </li>
        <li className={styles.li}>
          <span className={styles.label}>자세히 보기 </span>
          <span className={styles.content}><a href={compinfo.link}>{compinfo.link}</a></span>
        </li>

      </ul>
    </div>
  );
};

/*공모전 과거 입상작 더미데이터 (api 미연결)*/
const DUMMY_WINREC_INFO = [
  {
    id: 1,
    img: "../../comp_example.jpeg",
    generation: "1",
    prize: "대상",
    teamName: "얼레벌레",
    theme: "자연물",
    interview: "",
  },
  {
    id: 2,
    img: "../../comp_example.jpeg",
    generation: "2",
    prize: "최우수상",
    teamName: "로켓단",
    theme: "포켓몬",
    interview: "",
  },
];

const WinRecord = (compinfo) => {
  console.log("이전 수상작:", compinfo);
  return (
    <div>
      <h2 className={styles.title2}>공모전 과거 입상작</h2>
      {DUMMY_WINREC_INFO.map((content, index) => (
        <div className={styles.box} key={index}>
          <div>
            <img className={styles.img} src={content.img} />
          </div>
          <div className={styles.boxtext}>
            <ul className={styles.boxdescrip}>
              <li key={index}>
                제 {content.generation}회 {content.prize}
              </li>
              <li>팀명 : {content.teamName}</li>
              <li>주제 : {content.theme}</li>
              <li>id : {content.id}</li>
              <li>인터뷰 : {content.interview}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

const ContestInfo = (compinfo) => {
  return (
    <div className={styles.main}>
      <h2 className={styles.title}>공모전 정보</h2>
      <hr className={styles.line} />
      <MyCntstInfo compinfo={compinfo.compinfo.compInfo} />
      <WinRecord compinfo={compinfo.compinfo.priviousWinningList} />{" "}
      {/*공모전 입상작*/}
    </div>
  );
};

export default ContestInfo;
