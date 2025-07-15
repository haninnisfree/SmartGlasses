![SeeQ 포스터](./images/13_SeeQ_Poster.jpg)

---

## 🔍 Project - SEEQ: 스마트 안경 기반 AI 지식 확장 플랫폼

### 👨‍💻 팀 소개: **SEEQ**

* **S**ee (보여주고)
* **E**nlighten (깨우치고)
* **E**xpand (확장하고)
* **Q**ualia (체화하다)

**팀원 역할**

* 박현도(팀장): 풀스택, 기획
* 박재완: 풀스택, 최종발표
* 최지희: 백엔드, DB설계
* 김수림: 프론트엔드, 발표자료제작
* 한인희: 프론트엔드, 발표자료제작

---

### 🎯 프로젝트 개요

**주제:** 스마트 안경 기반 AI 지식 확장 플랫폼 개발
**부제:** AI 기반 멀티모달 인지 및 OCR 파이프라인을 활용한 ‘제2의 뇌’

현대인의 정보 과잉 문제 속에서, SEEQ는 단순 독서를 넘어서 ‘관찰 → 이해 → 확장 → 체화’의 4단계 학습을 돕는 지능형 학습 플랫폼입니다.

---

### 🧠 핵심 기술 요약

* **멀티모달 인지**: 시각(OCR), 음성(STT), 센서 기반 입력을 통합 인식
* **OCR 파이프라인**: CLAHE, 이진화 등 전처리 → 문자 인식 → AI 처리 자동화
* **YOLOv5 모델링**: 스마트 안경 이미지에서 객체 탐지 및 추출
* **FastAPI**: 백엔드 API 서버 및 AI 기능 처리
* **MongoDB + HNSW**: 비정형 데이터 저장, 벡터 기반 의미 검색
* **LangChain + RAG + LLM**: 벡터 검색 기반 지식 응답 및 요약, 퀴즈 생성

---

### 🧩 시스템 구성 워크플로우

1. **스마트 안경으로 이미지 캡처**
2. **YOLO 모델로 객체 인식**
3. **OCR 파이프라인으로 문자 인식**
4. **FastAPI를 통한 AI 처리 및 DB 저장**
5. **LangChain 기반 지식 체화 기능 제공**
6. **웹 프론트엔드에서 실시간 학습 피드백**

---

### 📦 데이터 저장 및 활용

* **MongoDB**: 사용자별 학습 이력, 퀴즈, 요약 결과 저장
* **벡터 인덱스 (HNSW)**: 의미 기반 질의응답 및 검색 기능 구현

---

### 🖼 발표자료 (PPT 보기)

아래는 프로젝트 전체 흐름과 시스템 구현 내용을 담은 발표 자료입니다.

> 📎 각 슬라이드를 클릭하면 확대된 이미지를 확인할 수 있습니다.

![page1](./images/SEEQ_최종_ppt%201.jpg)
![page2](./images/SEEQ_최종_ppt%202.jpg)
![page3](./images/SEEQ_최종_ppt%203.jpg)
![page4](./images/SEEQ_최종_ppt%204.jpg)
![page5](./images/SEEQ_최종_ppt%205.jpg)
![page6](./images/SEEQ_최종_ppt%206.jpg)
![page7](./images/SEEQ_최종_ppt%207.jpg)
![page8](./images/SEEQ_최종_ppt%208.jpg)
![page9](./images/SEEQ_최종_ppt%209.jpg)
![page10](./images/SEEQ_최종_ppt%2010.jpg)
![page11](./images/SEEQ_최종_ppt%2011.jpg)
![page12](./images/SEEQ_최종_ppt%2012.jpg)
![page13](./images/SEEQ_최종_ppt%2013.jpg)
![page14](./images/SEEQ_최종_ppt%2014.jpg)
![page15](./images/SEEQ_최종_ppt%2015.jpg)
![page16](./images/SEEQ_최종_ppt%2016.jpg)
![page17](./images/SEEQ_최종_ppt%2017.jpg)
![page18](./images/SEEQ_최종_ppt%2018.jpg)
![page19](./images/SEEQ_최종_ppt%2019.jpg)
![page20](./images/SEEQ_최종_ppt%2020.jpg)
![page21](./images/SEEQ_최종_ppt%2021.jpg)
![page22](./images/SEEQ_최종_ppt%2022.jpg)
![page23](./images/SEEQ_최종_ppt%2023.jpg)
![page24](./images/SEEQ_최종_ppt%2024.jpg)
![page25](./images/SEEQ_최종_ppt%2025.jpg)
![page26](./images/SEEQ_최종_ppt%2026.jpg)
![page27](./images/SEEQ_최종_ppt%2027.jpg)
![page28](./images/SEEQ_최종_ppt%2028.jpg)
![page29](./images/SEEQ_최종_ppt%2029.jpg)
![page30](./images/SEEQ_최종_ppt%2030.jpg)
