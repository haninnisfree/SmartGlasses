# SeeQ Chat 모듈 백엔드 연결 설정 가이드

## 📋 개요
SeeQ Chat 모듈이 백엔드 API와 성공적으로 연결되어 실시간 AI 질의응답 기능을 제공합니다.

## 🔧 설정된 기능들

### 1. API 연결 설정
- **백엔드 서버**: `http://localhost:8000`
- **주요 엔드포인트**: `/query/` (질의응답)
- **세션 관리**: 자동 세션 생성 및 관리
- **에이전트 타입**: Hybrid (AgentHub 활용)

### 2. 프론트엔드 기능
- ✅ 실시간 채팅 인터페이스
- ✅ 메시지 전송 및 AI 응답 수신
- ✅ 소스 문서 참조 표시
- ✅ 신뢰도 및 에이전트 정보 표시
- ✅ 채팅 기록 초기화
- ✅ 연결 상태 실시간 모니터링
- ✅ 오프라인 모드 지원

### 3. UI 개선사항
- 📚 환영 메시지 및 상태 표시
- 🗑️ 채팅 기록 초기화 버튼
- 📊 메타데이터 표시 (에이전트 타입, 신뢰도, 전략)
- 📖 참고 문서 소스 표시
- 🎨 개선된 메시지 버블 디자인

## 🚀 사용 방법

### 1. 백엔드 서버 시작
```bash
cd LangChain_seeq/langchain_llm
python -m uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. 프론트엔드 접속
```bash
# 4p 폴더에서 웹 서버 실행
cd 4p
python -m http.server 8080
# 또는
npx serve .
```

### 3. 브라우저에서 확인
- `http://localhost:8080/dashboard.html` 접속
- 우측 상단 채팅 아이콘 클릭
- 상태 표시줄에서 연결 상태 확인

## 📡 연결 상태 확인

### 성공적인 연결
```
✅ 서버 연결됨 (available)
→ AI와 대화를 시작해보세요
```

### 연결 실패
```
❌ 서버 연결 실패 - 오프라인 모드
→ 백엔드 서버를 시작해주세요 (localhost:8000)
```

## 🔍 주요 파일 수정사항

### 1. `dashboard-api.js`
- `sendChatMessage()`: 채팅 메시지 전송 API 호출
- `displayChatMessage()`: 메시지 UI 표시 (소스, 메타데이터 포함)
- `getChatAgentInfo()`: 에이전트 정보 조회
- `clearChatSession()`: 채팅 세션 초기화

### 2. `dashboard.js`
- `openChatBar()`: 채팅바 열기 및 메시지 전송
- `sendChatBarMessage()`: 채팅바에서 메시지 전송
- `checkBackendConnection()`: 백엔드 연결 상태 확인
- `clearChatHistory()`: 채팅 기록 초기화

### 3. `dashboard.html`
- 채팅 헤더에 초기화 버튼 추가
- 채팅 상태 표시 영역 추가
- 환영 메시지 개선

### 4. `dashboard-components.css`
- 채팅 UI 스타일 개선
- 메타데이터 및 소스 표시 스타일
- 로딩 애니메이션 추가

## 🎯 API 요청/응답 예시

### 요청
```json
{
  "query": "이 문서의 주요 내용을 요약해주세요",
  "folder_id": null,
  "top_k": 5,
  "include_sources": true,
  "session_id": "query_session_1234567890"
}
```

### 응답
```json
{
  "answer": "문서의 주요 내용은 다음과 같습니다...",
  "sources": [
    {
      "filename": "document.pdf",
      "title": "프로젝트 계획서"
    }
  ],
  "confidence": 0.85,
  "agent_type": "hybrid",
  "session_id": "query_session_1234567890",
  "strategy": "retrieval_qa"
}
```

## 🛠️ 트러블슈팅

### 1. 연결 실패 시
- 백엔드 서버가 실행 중인지 확인
- 포트 8000이 사용 가능한지 확인
- 방화벽 설정 확인

### 2. 응답이 느린 경우
- 백엔드 로그 확인
- 데이터베이스 연결 상태 확인
- AgentHub 초기화 상태 확인

### 3. 세션 문제
- 브라우저 개발자 도구에서 네트워크 탭 확인
- 로컬 스토리지 초기화
- 채팅 기록 초기화 버튼 사용

## 📈 향후 개선 계획
- [ ] 파일 업로드 연동
- [ ] 음성 입력 지원
- [ ] 다국어 지원
- [ ] 채팅 기록 내보내기
- [ ] 실시간 타이핑 표시

## 🔗 관련 문서
- [백엔드 API 문서](../LangChain_seeq/langchain_llm/README.md)
- [AgentHub 가이드](../LangChain_seeq/langchain_llm/seeq_langchain/README.md)
- [프론트엔드 구조](./README.md)

---
**설정 완료일**: 2024년 1월 15일  
**버전**: v1.0.0  
**담당자**: AI Assistant 