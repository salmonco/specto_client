1. 해당 리포지토리 fork하기
2. fork한 나의 리포지토리 주소로 git clone하기
3. vscode로 프로젝트 열어서 npm install
4. vulnerabilities이 났다고 npm audit fix하면 에러남 (일단 무시하기)
5. firebase 설정을 위해 초대된 firebase 프로젝트 사이트로 가서 `프로젝트 개요 > 프로젝트 설정 > 일반 > 내 앱 > google-services.json 다운로드` 후 프로젝트 루트 디렉토리에 넣기 (보안 때문에 깃헙에 안 올렸음)
   
## 상태 관리
- id
- 이메일 email
- 이름 name
- accessToken

## 스크린 구조
Stack.Navigator
- 스플래시 Splash (Screen)
- Auth (Stack.Navigator)
    - 로그인 Login (Screen)
- Main (Tab.Navigator)
    - MyPageScreen (Stack.Navigator)
        - 마이페이지 MyPage (Screen)
    - HomeScreen (Stack.Navigator)
        - 홈 Home (Screen)
    - SpecScreen (Stack.Navigator)
        - 스펙기록_리스트 Spec (Screen)
        - 스펙기록_개별 SpecDetail (Screen)
        - 스펙기록-추가-공모전 ContestAddScreen (Stack.Navigator)
            - 스펙기록_1/3 ContestAdd1 (Screen)
            - 스펙기록_2/3 ContestAdd2 (Screen)
            - 스펙기록_3/3 ContestAdd3 (Screen)
            - 스펙기록_완료 SpecAddComplete (Screen)
        - 스펙기록-추가-자격증 CertificateAddScreen (Stack.Navigator)
            - 스펙기록_1/3 CertificateAdd1 (Screen)
            - 스펙기록_2/3 CertificateAdd2 (Screen)
            - 스펙기록_3/3 CertificateAdd3 (Screen)
            - 스펙기록_완료 SpecAddComplete (Screen)
        - 스펙기록-추가-인턴 InternAddScreen (Stack.Navigator)
        - 스펙기록-추가-대외활동 ActivityAddScreen (Stack.Navigator)
        - 스펙기록-추가-논문/플젝 ProjectAddScreen (Stack.Navigator)
    - ReviewScreen (TopTab.Navigator)
        - 캘린더 ReviewCalendarScreen (Stack.Navigator)
            - 회고_캘린더 ReviewCalendar (Screen)
            - 회고_회고리스트업 ReviewListUp (Screen)
        - 회고리스트 ReviewListScreen (Stack.Navigator)
            - 회고_회고리스트 ReviewList (Screen)
            - 회고_회고리스트업 ReviewListUp (Screen)
            - 회고_회고 추가하기 ReviewAdd (Screen)
            - 회고_회고 추가하기_완료 ReviewAddComplete (Screen)

레이어팝업
- 스펙기록_추가_카테고리 SpecCategorySelect
- 회고_펼쳐보기 ReviewDetail
