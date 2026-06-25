# 제거된 Python 파일 목록 및 기능 설명

이 프로젝트는 원래 **psiTurk** (Python 기반 심리학 실험 플랫폼)로 구축된 Amazon MTurk 실험용 웹앱이었습니다.
Python 서버 의존성을 제거하고 순수 HTML/JS 웹 게임으로 변환하면서 아래 파일들이 삭제되었습니다.

---

## 삭제된 파일 목록

### 1. `custom.py`
**역할:** Flask 기반 커스텀 서버 라우팅

주요 기능:
- `/my_custom_view` — 커스텀 HTML 페이지 라우트 제공
- `/my_password_protected_route` — HTTP 인증이 필요한 보호된 라우트
- MTurk 작업자 보너스 계산 라우트 (주석 처리되어 있었음)
- `compute_bonus` — 참가자 DB에서 데이터를 읽어 보너스 금액 계산
- psiTurk DB 세션 및 Participant 모델 연동
- Flask Blueprint로 psiTurk 실험 서버에 커스텀 라우트 추가

---

### 2. `__init__.py`
**역할:** Python 패키지 초기화 파일

주요 기능:
- 이 디렉토리를 Python 패키지로 인식시키는 마커 파일
- psiTurk가 프로젝트를 Python 모듈로 임포트할 때 필요

---

### 3. `herokuapp.py`
**역할:** Heroku 배포용 WSGI 진입점

주요 기능:
- Heroku 클라우드 플랫폼에서 psiTurk 앱을 실행하기 위한 진입점
- `gunicorn` WSGI 서버가 이 파일을 통해 Flask 앱을 시작
- `app = server.app` 형태로 psiTurk 서버 인스턴스를 노출

---

### 4. `Procfile`
**역할:** Heroku 프로세스 설정

주요 기능:
- Heroku가 앱을 시작할 때 실행할 명령어 정의
- 일반적으로 `web: gunicorn herokuapp:app` 형태
- Heroku 다이노(dyno)에서 웹 서버를 구동하는 설정

---

### 5. `runtime.txt`
**역할:** Python 런타임 버전 지정

주요 기능:
- Heroku에게 사용할 Python 버전을 알려주는 파일
- 예: `python-2.7.14` (psiTurk는 Python 2.7 기반)
- Heroku 빌드팩이 이 파일을 읽어 적절한 Python 설치

---

### 6. `set-heroku-settings.py`
**역할:** Heroku 환경변수 자동 설정 스크립트

주요 기능:
- `heroku config:set` 명령으로 환경변수 일괄 설정
- AWS 자격증명 (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY) 설정
- psiTurk 설정값을 Heroku 환경변수로 마이그레이션
- `config.txt` 파일을 읽어 Heroku 앱에 자동 적용

---

### 7. `config.txt`
**역할:** psiTurk 서버 전체 설정 파일

주요 기능:
- **[HIT Configuration]**: MTurk HIT 제목, 설명, 키워드, 보상 금액, 제한 시간
- **[Database Parameters]**: SQLite/PostgreSQL DB 연결 URL
- **[Server Parameters]**: 호스트, 포트, 로그 레벨, SSL 설정
- **[Task Parameters]**: 실험 조건 수, 카운터밸런스 수
- **[Shell Parameters]**: MTurk 샌드박스 모드 여부, AWS 리전
- **[AWS Access]**: AWS 액세스 키 ID, 시크릿 키

---

### 8. `.psiturk_history`
**역할:** psiTurk CLI 명령어 히스토리

주요 기능:
- psiTurk 대화형 셸에서 입력한 명령어 기록
- `server on`, `debug`, `hit create` 등의 명령 히스토리
- 개발자 편의를 위한 히스토리 파일 (기능적 역할 없음)

---

## 제거된 JavaScript 파일 (기능 통합)

다음 JS 파일들도 psiTurk 의존성이 있어 **`game.html`로 대체**되었습니다:

| 파일 | 역할 | 대체 방법 |
|------|------|----------|
| `static/js/task/index.js` | psiTurk 실험 전체 진행 제어 | `game.html` 내장 게임 컨트롤러 |
| `static/js/task/js/conditions.js` | MTurk 실험 조건 설정 (AI 모델 종류 × 플레이어 인덱스) | 제거 (단일 게임 모드) |
| `static/js/task/js/gameserver-io.js` | Socket.IO 기반 멀티플레이어 웹소켓 서버 연결 | 제거 (싱글플레이어만 지원) |
| `static/js/task/js/load_tf_model.js` | TensorFlow.js로 학습된 AI 에이전트 모델 로딩 | 간단한 순환 NPC로 대체 |
| `static/js/task/js/psiturk-pageblock-controller.js` | psiTurk 페이지 블록 전환, 데이터 저장, HIT 완료 처리 | 제거 |
| `static/js/task/js/pageblock-survey.js` | psiTurk 실험용 설문 UI 생성 (라디오, 텍스트박스 등) | 제거 |
| `templates/` 폴더 전체 | Jinja2 템플릿 (psiTurk 서버에서 렌더링) | `game.html`로 대체 |

---

## 변환 후 남은 구조

```
overcooked-hAI-exp-master/
├── game.html              ← ✅ 새로 생성 (브라우저에서 바로 실행)
├── REMOVED_PYTHON_FILES.md ← ✅ 이 파일
├── static/
│   ├── assets/            ← 게임 스프라이트 이미지 (필수)
│   ├── css/               ← 스타일시트
│   ├── images/            ← 설명 이미지
│   └── js/
│       └── task/
│           └── task.js    ← Overcooked 게임 엔진 번들 (필수)
└── README.md
```

---

## 실행 방법

```bash
# 프로젝트 폴더에서:
python -m http.server 8000

# 브라우저에서:
http://localhost:8000/game.html
```

> **주의**: 파일을 직접 더블클릭하면 CORS 오류로 에셋이 로드되지 않을 수 있습니다.
> 반드시 로컬 웹서버를 통해 접속하세요.
