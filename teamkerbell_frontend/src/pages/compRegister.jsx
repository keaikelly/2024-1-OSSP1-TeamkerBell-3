import React, { useState } from "react";
import styles from "./compRegister.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerComp } from "../api/comp"; // Adjust the import path as needed
import { uploadS3 } from "../utils/uploadS3";
import { useNavigate } from "react-router-dom";

const CompRegister = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [applicationMethod, setApplicationMethod] = useState("");
  const [context, setContext] = useState("");
  const [reward, setReward] = useState("");
  const [contact, setContact] = useState("");
  const [link, setLink] = useState("");
  const [theme, setTheme] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [s3ImageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("이미지를 선택해주세요!");
      return;
    }
    setIsUploading(true);
    try {
      const img = await uploadS3(imageFile);

      const response = await registerComp(
        name,
        startDate,
        endDate,
        organization,
        eligibility,
        applicationMethod,
        context,
        reward,
        contact,
        link,
        img,
        theme
      );
      alert("생성이 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.error("[S3 Upload Error]:", error);
      alert("S3 업로드 에러가 났습니다! 다시 시도해주세요!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.title}>
      <h2>공모전 등록하기</h2>
      <div className={styles.basicInfo}>
        <form onSubmit={handleSubmit} className={styles.compForm}>
          <div className={styles.nameToPhoneNumber}>
            <div className={styles.infoItem}>
              <div className={styles.infoName}>
                <h3 className={styles.noMargin}>1. 공모전 제목</h3>
                <span className={styles.redColorNoMargin}>*</span>
              </div>
              <input
                name="name"
                placeholder="ex) 홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoName}>
                <h3>2. 간략한 공모전 설명</h3>
                <span className={styles.redColor}> *</span>
              </div>
              <input
                name="theme"
                placeholder="ex) 간략한 공모전에 대한 주제 및 한 두 줄로 끝나는 설명을 작성해주세요!"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                required
              />
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoName}>
                <h3>3. 접수 기간</h3>
                <span className={styles.redColor}> *</span>
              </div>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="모집 시작 일자를 선택하세요"
              />
              <br />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="마감 날짜를 선택하세요"
              />
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoName}>
                <h3>4. 공모 기관</h3>
                <span className={styles.redColor}> *</span>
              </div>
              <input
                name="organization"
                placeholder="ex) 동국교육진흥원"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
              />
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoName}>
                <h3>5. 지원 자격</h3>
                <span className={styles.redColor}> *</span>
              </div>
              <input
                name="eligibility"
                placeholder="ex) 전국 대학생"
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                required
              />
            </div>

            <div className={styles.infoBigItem}>
              <div className={styles.infoName}>
                <h3>6. 지원 방법</h3>
                <span className={styles.redColor}> *</span>
              </div>
              <input
                name="applicationMethod"
                placeholder="ex) 동국대학교 사이트에서 신청"
                value={applicationMethod}
                onChange={(e) => setApplicationMethod(e.target.value)}
                required
              />
            </div>

            <div className={styles.infoBigItem}>
              <div className={styles.infoName}>
                <h3>7. 공모전 내용</h3>
                <span className={styles.redColor}> *</span>
              </div>
              <input
                name="context"
                placeholder="ex) IT 해커톤 공모전!!"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                required
              />
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoName}>
                <h3>8. 시상</h3>
              </div>
              <input
                name="reward"
                placeholder="ex) 1등: 500만원, 2등 100만원, 3등 50만원"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
              />
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoName}>
                <h3>9. 문의처</h3>
              </div>
              <input
                name="contact"
                placeholder="ex) 동국대학교 공식 홈페이지"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoName}>
                <h3>10. 참고 링크</h3>
                <span className={styles.redColor}> *</span>
              </div>
              <input
                name="link"
                placeholder="ex) https://www.dongguk.edu/main"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>
            <h3>11. 공모전 이미지 설정</h3>

            <div className={styles.imageContainer}>
              <div className={styles.compImageContainer}>
                <label htmlFor="profileImage" className={styles.imageLabel}>
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt="preview"
                      className={styles.compImage}
                    />
                  )}
                  <div className={styles.overlay}>
                    <div className={styles.text}>이미지 편집</div>
                  </div>
                  {/* Added the additional image */}
                </label>

                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <button className={styles.editprofileSaveButton}> 생성하기 </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompRegister;
