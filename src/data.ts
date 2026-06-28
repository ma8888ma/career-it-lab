import type { Topic } from "./types";

const commonPracticeSuffix = "学習メモに、自分の言葉で30秒説明できる形にまとめる。";

export const initialTopics: Topic[] = [
  {
    id: "ai-agents",
    title: "生成AI・AIエージェント活用",
    category: "AI",
    status: "学習中",
    understanding: 2,
    nextAction: "AIエージェントの仕組みと代表的なユースケースを30分で整理する",
    careerValue: "AIツールを安全に業務へ組み込める人材は、開発・業務改善の両方で評価されやすい。",
    accent: "#2563eb",
    tasks: [
      { id: "ai-1", title: "LLM、ツール利用、メモリ、プランニングの違いを説明できる", done: true },
      { id: "ai-2", title: "AIエージェントの業務ユースケースを3つ書き出す", done: false },
      { id: "ai-3", title: "人間の承認が必要な場面を整理する", done: false },
      { id: "ai-4", title: "小さな自動化フローを設計する", done: false },
    ],
    lessons: [
      {
        id: "ai-agents-basics",
        title: "AIエージェントは何を自動化するのか",
        summary: "LLMが文章を返すだけでなく、道具を選び、手順を考え、結果を確認しながらタスクを進める考え方を学びます。",
        body: [
          "AIエージェントは、目的を受け取り、必要な情報を集め、ツールを呼び出し、結果を見て次の行動を決める仕組みです。",
          "実務では、調査、要約、コードレビュー補助、問い合わせ分類などの反復作業に向いています。",
          "ただし、外部送信、削除、課金、権限変更のような失敗時の影響が大きい操作には、人間の承認を挟む設計が必要です。",
        ],
        keyTerms: [
          { term: "ツール利用", description: "検索、計算、API呼び出しなど、LLMの外にある機能を使うこと。" },
          { term: "プランニング", description: "目的を小さな手順に分け、次に何をするか決めること。" },
          { term: "Human in the loop", description: "重要な判断や外部影響のある操作に人間の確認を入れる設計。" },
        ],
        quiz: [
          {
            id: "aiq-1",
            question: "AIエージェントの説明として最も近いものは？",
            choices: [
              { id: "a", label: "質問に一度だけ文章で答える仕組み", correct: false },
              { id: "b", label: "目的に向けて手順やツール利用を組み合わせる仕組み", correct: true },
              { id: "c", label: "データベースだけを高速検索する仕組み", correct: false },
            ],
            explanation: "エージェントは文章生成だけでなく、手順化、ツール利用、結果確認を組み合わせます。",
          },
          {
            id: "aiq-2",
            question: "人間の承認を入れるべき操作は？",
            choices: [
              { id: "a", label: "公開範囲や課金に影響する操作", correct: true },
              { id: "b", label: "ローカルの文章要約だけ", correct: false },
              { id: "c", label: "画面上の色を変えるだけ", correct: false },
            ],
            explanation: "外部影響や損失が起きる操作には、人間の確認を挟むのが安全です。",
          },
        ],
        practicePrompt: `自分の仕事や学習で任せたい反復作業を1つ選び、AIに任せる範囲と人間が確認する範囲を分ける。${commonPracticeSuffix}`,
      },
    ],
    resources: [
      { title: "OpenAI API Documentation", source: "OpenAI", url: "https://developers.openai.com/api/docs" },
      { title: "Anthropic: Building Effective Agents", source: "Anthropic", url: "https://www.anthropic.com/engineering/building-effective-agents" },
    ],
  },
  {
    id: "context-engineering",
    title: "プロンプト / コンテキストエンジニアリング",
    category: "AI",
    status: "学習中",
    understanding: 2,
    nextAction: "良い入力・悪い入力の例を比較して、再利用できる指示テンプレートを作る",
    careerValue: "AIの出力品質を安定させる力は、開発・分析・ドキュメント作成で直接役立つ。",
    accent: "#0f766e",
    tasks: [
      { id: "ce-1", title: "目的、制約、入力データ、出力形式を分けて書ける", done: true },
      { id: "ce-2", title: "RAGと長文コンテキストの使い分けを理解する", done: false },
      { id: "ce-3", title: "評価観点をプロンプトに含められる", done: false },
      { id: "ce-4", title: "トークンコストを意識した設計ができる", done: false },
    ],
    lessons: [
      {
        id: "context-basics",
        title: "良い入力は、目的と制約を分けて渡す",
        summary: "AIの出力品質を安定させるために、目的、前提、制約、出力形式を分離して伝える型を学びます。",
        body: [
          "プロンプトは命令文ではなく、AIが判断に使う作業仕様です。",
          "良い入力には、何をしたいか、使ってよい情報、守る制約、欲しい出力形式が含まれます。",
          "長い資料を扱うときは、必要な根拠だけを渡す設計や、検索してから生成するRAGの考え方が重要になります。",
        ],
        keyTerms: [
          { term: "コンテキスト", description: "AIが回答時に参照できる指示、資料、会話履歴などの情報。" },
          { term: "出力形式", description: "箇条書き、JSON、表など、回答の形を明示する指定。" },
          { term: "評価観点", description: "良い回答かどうかを判断する基準。" },
        ],
        quiz: [
          {
            id: "ceq-1",
            question: "プロンプトに含めると出力が安定しやすいものは？",
            choices: [
              { id: "a", label: "目的、制約、出力形式", correct: true },
              { id: "b", label: "できるだけ短い命令だけ", correct: false },
              { id: "c", label: "関係ない参考情報を大量に渡すこと", correct: false },
            ],
            explanation: "AIが迷わないよう、作業の目的と制約、出力形式を明確にします。",
          },
          {
            id: "ceq-2",
            question: "RAGが役立ちやすい場面は？",
            choices: [
              { id: "a", label: "社内資料や最新情報を根拠に回答したい場面", correct: true },
              { id: "b", label: "画像を圧縮したい場面", correct: false },
              { id: "c", label: "CSSだけを書きたい場面", correct: false },
            ],
            explanation: "RAGは検索した根拠を使って生成するため、手元の資料や更新情報を扱いやすくします。",
          },
        ],
        practicePrompt: `同じテーマで「悪いプロンプト」と「良いプロンプト」を1つずつ作り、差分を説明する。${commonPracticeSuffix}`,
      },
    ],
    resources: [
      { title: "OpenAI Prompting Guide", source: "OpenAI", url: "https://platform.openai.com/docs/guides/prompt-engineering" },
      { title: "Google: Prompt engineering overview", source: "Google Cloud", url: "https://cloud.google.com/discover/what-is-prompt-engineering" },
    ],
  },
  {
    id: "ai-security",
    title: "AIセキュリティ・ガバナンス",
    category: "Security",
    status: "未着手",
    understanding: 1,
    nextAction: "プロンプトインジェクション、情報漏えい、権限管理の基本リスクを確認する",
    careerValue: "AI導入が進むほど、セキュリティと監査を説明できる人材の価値が高まる。",
    accent: "#dc2626",
    tasks: [
      { id: "ais-1", title: "プロンプトインジェクションの例を説明できる", done: false },
      { id: "ais-2", title: "AIに渡してはいけない情報を分類できる", done: false },
      { id: "ais-3", title: "監査ログと人間の承認フローの必要性を説明できる", done: false },
      { id: "ais-4", title: "社内利用ルールのドラフトを作る", done: false },
    ],
    lessons: [
      {
        id: "ai-security-basics",
        title: "AI利用で守るべき3つの境界",
        summary: "AIに渡す情報、AIが使える権限、AIの出力を信じる範囲を分けて考えます。",
        body: [
          "AIセキュリティでは、入力に混ざる悪意ある指示、機密情報の扱い、ツール実行権限が大きな論点です。",
          "プロンプトインジェクションは、外部文章などに隠れた指示でAIの振る舞いを変えようとする攻撃です。",
          "安全な設計では、秘密情報を渡さない、ツール権限を絞る、ログを残す、重要操作に承認を入れることが基本になります。",
        ],
        keyTerms: [
          { term: "プロンプトインジェクション", description: "AIへの入力に紛れた指示で、本来のルールを破らせる攻撃。" },
          { term: "最小権限", description: "必要な操作だけを許可し、余計な権限を与えない考え方。" },
          { term: "監査ログ", description: "誰が、いつ、何をAIに実行させたかを後で確認できる記録。" },
        ],
        quiz: [
          {
            id: "aisq-1",
            question: "プロンプトインジェクション対策として有効なものは？",
            choices: [
              { id: "a", label: "外部入力を常に信頼する", correct: false },
              { id: "b", label: "AIに必要以上の権限を与えない", correct: true },
              { id: "c", label: "ログを残さない", correct: false },
            ],
            explanation: "外部入力は信頼せず、権限を絞り、操作を追跡できるようにします。",
          },
          {
            id: "aisq-2",
            question: "AIに渡す前に注意すべき情報は？",
            choices: [
              { id: "a", label: "個人情報や秘密情報", correct: true },
              { id: "b", label: "公開済みの一般知識だけ", correct: false },
              { id: "c", label: "自分で作った架空の例文だけ", correct: false },
            ],
            explanation: "個人情報や秘密情報は、利用規約や社内ルールを確認してから扱います。",
          },
        ],
        practicePrompt: `自分のAI利用ルール案として「渡さない情報」「承認が必要な操作」「ログに残す情報」を3行で書く。${commonPracticeSuffix}`,
      },
    ],
    resources: [
      { title: "OWASP Top 10 for LLM Applications", source: "OWASP", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/" },
      { title: "NIST AI Risk Management Framework", source: "NIST", url: "https://www.nist.gov/itl/ai-risk-management-framework" },
    ],
  },
  {
    id: "web-typescript-api",
    title: "Web基礎・TypeScript・API設計",
    category: "Web",
    status: "復習中",
    understanding: 3,
    nextAction: "HTTPメソッドとREST APIの設計例を、自分の言葉でまとめる",
    careerValue: "フロントエンド、バックエンド、クラウドの土台になるため、転職課題でも出題されやすい。",
    accent: "#7c3aed",
    tasks: [
      { id: "web-1", title: "HTML、CSS、JavaScriptの役割を説明できる", done: true },
      { id: "web-2", title: "TypeScriptの型注釈とユニオン型を使える", done: true },
      { id: "web-3", title: "HTTPステータスコードの代表例を理解する", done: false },
      { id: "web-4", title: "簡単なCRUD API仕様を書ける", done: false },
    ],
    lessons: [
      {
        id: "web-api-basics",
        title: "Webアプリは画面とAPIの往復で動く",
        summary: "HTML/CSS/JavaScript、TypeScript、HTTP、API設計のつながりを整理します。",
        body: [
          "Webアプリは、画面を作るHTML/CSS、動きを作るJavaScript、データをやり取りするHTTPで成り立ちます。",
          "TypeScriptはJavaScriptに型を足し、データの形や関数の使い方を開発中に確認しやすくします。",
          "API設計では、どのURLにどのHTTPメソッドでアクセスし、どんなデータを返すかを決めます。",
        ],
        keyTerms: [
          { term: "HTTPメソッド", description: "GET、POST、PUT、DELETEなど、リクエストの目的を表す種類。" },
          { term: "ステータスコード", description: "200、404、500など、リクエスト結果を表す数字。" },
          { term: "型", description: "文字列、数値、配列、オブジェクトなど、データの形を表す情報。" },
        ],
        quiz: [
          {
            id: "webq-1",
            question: "新しいデータを作成するAPIでよく使うHTTPメソッドは？",
            choices: [
              { id: "a", label: "GET", correct: false },
              { id: "b", label: "POST", correct: true },
              { id: "c", label: "TRACE", correct: false },
            ],
            explanation: "新規作成ではPOSTがよく使われます。取得はGETが中心です。",
          },
          {
            id: "webq-2",
            question: "TypeScriptを使う主な理由は？",
            choices: [
              { id: "a", label: "型でデータの形を確認しやすくするため", correct: true },
              { id: "b", label: "HTMLを不要にするため", correct: false },
              { id: "c", label: "HTTPを使わないため", correct: false },
            ],
            explanation: "TypeScriptは型により、開発中のミスに気づきやすくします。",
          },
        ],
        practicePrompt: `TodoアプリのCRUD APIを、URL、メソッド、返すデータの形で書き出す。${commonPracticeSuffix}`,
      },
    ],
    resources: [
      { title: "MDN Learn Web Development", source: "MDN", url: "https://developer.mozilla.org/ja/docs/Learn" },
      { title: "TypeScript Handbook", source: "TypeScript", url: "https://www.typescriptlang.org/docs/handbook/intro.html" },
    ],
  },
  {
    id: "cloud-kubernetes",
    title: "クラウド基礎・Docker・Kubernetes",
    category: "Cloud",
    status: "学習中",
    understanding: 2,
    nextAction: "コンテナ、イメージ、Pod、Serviceの関係を図にして覚える",
    careerValue: "AWS、Azure、GCPやCKA/CKAD系の資格学習につながり、インフラ職にも開発職にも効く。",
    accent: "#0891b2",
    tasks: [
      { id: "ck-1", title: "IaaS、PaaS、SaaSの違いを説明できる", done: true },
      { id: "ck-2", title: "Dockerfileの基本命令を理解する", done: false },
      { id: "ck-3", title: "Kubernetesの主要リソースを説明できる", done: false },
      { id: "ck-4", title: "クラウドの責任共有モデルを理解する", done: false },
    ],
    lessons: [
      {
        id: "cloud-container-basics",
        title: "クラウドとコンテナの役割を分ける",
        summary: "クラウド、Docker、Kubernetesがそれぞれ何を担当するのかを整理します。",
        body: [
          "クラウドは、サーバー、ネットワーク、ストレージなどを必要な分だけ使える環境です。",
          "Dockerはアプリと実行環境をイメージとしてまとめ、どこでも同じように動かしやすくします。",
          "Kubernetesは複数のコンテナを配置、再起動、スケール、通信させるための管理基盤です。",
        ],
        keyTerms: [
          { term: "コンテナイメージ", description: "アプリと実行に必要なファイルをまとめた配布単位。" },
          { term: "Pod", description: "Kubernetesでコンテナを動かす最小単位。" },
          { term: "Service", description: "Podへ安定してアクセスするための入り口。" },
        ],
        quiz: [
          {
            id: "ckq-1",
            question: "Kubernetesの主な役割は？",
            choices: [
              { id: "a", label: "コンテナ群を配置・管理すること", correct: true },
              { id: "b", label: "HTMLだけを書くこと", correct: false },
              { id: "c", label: "画像編集をすること", correct: false },
            ],
            explanation: "Kubernetesはコンテナ運用を自動化・管理する基盤です。",
          },
          {
            id: "ckq-2",
            question: "クラウドの責任共有モデルで意識することは？",
            choices: [
              { id: "a", label: "事業者と利用者の責任範囲を分けること", correct: true },
              { id: "b", label: "利用者は何もしなくてよいこと", correct: false },
              { id: "c", label: "パスワードを共有すること", correct: false },
            ],
            explanation: "クラウド事業者が守る範囲と、自分たちが設定・運用する範囲を分けて考えます。",
          },
        ],
        practicePrompt: `Webアプリをクラウドで動かす時の構成を、利用者、ロードバランサ、コンテナ、DBの流れで説明する。${commonPracticeSuffix}`,
      },
    ],
    resources: [
      { title: "Kubernetes Documentation", source: "Kubernetes", url: "https://kubernetes.io/docs/home/" },
      { title: "Docker Docs", source: "Docker", url: "https://docs.docker.com/" },
    ],
  },
  {
    id: "devops-platform",
    title: "DevOps / CI/CD / プラットフォームエンジニアリング",
    category: "Delivery",
    status: "未着手",
    understanding: 1,
    nextAction: "GitHub Actionsの基本ワークフローを読んで、ビルドからテストまでの流れを見る",
    careerValue: "開発チームの生産性改善に直結し、実務経験として語りやすいテーマ。",
    accent: "#ea580c",
    tasks: [
      { id: "dp-1", title: "CIとCDの違いを説明できる", done: false },
      { id: "dp-2", title: "テスト自動化の価値を説明できる", done: false },
      { id: "dp-3", title: "IaCの基本概念を理解する", done: false },
      { id: "dp-4", title: "開発者体験を改善する仕組みを1つ提案する", done: false },
    ],
    lessons: [
      {
        id: "devops-basics",
        title: "変更を安全に届ける仕組みを作る",
        summary: "DevOps、CI/CD、プラットフォームエンジニアリングの目的を学びます。",
        body: [
          "CIは、コード変更のたびにビルドやテストを自動で走らせ、問題を早く見つける仕組みです。",
          "CDは、テスト済みの変更を安全にリリースできる状態へ進める仕組みです。",
          "プラットフォームエンジニアリングは、開発者が迷わず安全に作業できる共通基盤を整える考え方です。",
        ],
        keyTerms: [
          { term: "CI", description: "継続的インテグレーション。変更を頻繁に統合し、自動検証すること。" },
          { term: "CD", description: "継続的デリバリー/デプロイ。リリース作業を安全に自動化すること。" },
          { term: "IaC", description: "インフラ設定をコードとして管理すること。" },
        ],
        quiz: [
          {
            id: "dpq-1",
            question: "CIの目的として近いものは？",
            choices: [
              { id: "a", label: "変更を自動で検証し、問題を早く見つける", correct: true },
              { id: "b", label: "手作業だけで本番に反映する", correct: false },
              { id: "c", label: "テストを減らす", correct: false },
            ],
            explanation: "CIは変更ごとの検証を自動化し、品質確認を早めます。",
          },
          {
            id: "dpq-2",
            question: "プラットフォームエンジニアリングが重視するものは？",
            choices: [
              { id: "a", label: "開発者が安全に早く作業できる共通基盤", correct: true },
              { id: "b", label: "各自が毎回ゼロから環境を作ること", correct: false },
              { id: "c", label: "ログを見ない運用", correct: false },
            ],
            explanation: "共通基盤により、チーム全体の作業品質と速度を上げます。",
          },
        ],
        practicePrompt: `自分のプロジェクトに必要なCIの流れを「install、build、test、deploy」の順で書く。${commonPracticeSuffix}`,
      },
    ],
    resources: [
      { title: "GitHub Actions Documentation", source: "GitHub Docs", url: "https://docs.github.com/en/actions" },
      { title: "Terraform Documentation", source: "HashiCorp", url: "https://developer.hashicorp.com/terraform/docs" },
    ],
  },
  {
    id: "zero-trust",
    title: "サイバーセキュリティ基礎・ゼロトラスト",
    category: "Security",
    status: "未着手",
    understanding: 1,
    nextAction: "認証、認可、多要素認証、最小権限をセットで復習する",
    careerValue: "基本情報、情報処理安全確保支援士、クラウド資格のどれにも接続しやすい。",
    accent: "#be123c",
    tasks: [
      { id: "zt-1", title: "認証と認可の違いを説明できる", done: false },
      { id: "zt-2", title: "代表的な攻撃手法を3つ説明できる", done: false },
      { id: "zt-3", title: "ゼロトラストの考え方を説明できる", done: false },
      { id: "zt-4", title: "ログ監視とインシデント対応の流れを理解する", done: false },
    ],
    lessons: [
      {
        id: "security-zero-trust",
        title: "認証・認可・最小権限から始める",
        summary: "ゼロトラストを、誰かを疑う考え方ではなく、毎回確認する設計として理解します。",
        body: [
          "認証は本人確認、認可はその人が何をしてよいかの確認です。",
          "ゼロトラストでは、社内ネットワークだから安全と決めつけず、アクセスごとに本人、端末、権限、状況を確認します。",
          "多要素認証、最小権限、ログ監視は、転職や資格学習でも説明しやすい基本対策です。",
        ],
        keyTerms: [
          { term: "認証", description: "利用者が誰かを確認すること。" },
          { term: "認可", description: "確認済みの利用者に、どの操作を許可するか決めること。" },
          { term: "ゼロトラスト", description: "場所に関係なく、アクセスごとに確認するセキュリティの考え方。" },
        ],
        quiz: [
          {
            id: "ztq-1",
            question: "認証の説明として正しいものは？",
            choices: [
              { id: "a", label: "利用者が誰かを確認すること", correct: true },
              { id: "b", label: "権限を必ず最大にすること", correct: false },
              { id: "c", label: "ログを削除すること", correct: false },
            ],
            explanation: "認証は本人確認です。認可は操作権限の確認です。",
          },
          {
            id: "ztq-2",
            question: "ゼロトラストで重要な考え方は？",
            choices: [
              { id: "a", label: "社内ネットワークなら無条件に信頼する", correct: false },
              { id: "b", label: "アクセスごとに状況と権限を確認する", correct: true },
              { id: "c", label: "パスワードを共有する", correct: false },
            ],
            explanation: "ゼロトラストは、場所ではなくアクセスの状況を継続的に確認します。",
          },
        ],
        practicePrompt: `よく使うWebサービスを1つ選び、認証、認可、多要素認証、ログの観点で安全性を説明する。${commonPracticeSuffix}`,
      },
    ],
    resources: [
      { title: "OWASP Top 10 Web Application Security Risks", source: "OWASP", url: "https://owasp.org/www-project-top-ten/" },
      { title: "Zero Trust Architecture", source: "NIST", url: "https://www.nist.gov/publications/zero-trust-architecture" },
    ],
  },
  {
    id: "observability-sre",
    title: "オブザーバビリティ / SRE",
    category: "Operations",
    status: "未着手",
    understanding: 1,
    nextAction: "ログ、メトリクス、トレースの違いと使いどころを整理する",
    careerValue: "運用改善や障害対応を説明できると、実務寄りの強みとして伝えやすい。",
    accent: "#4d7c0f",
    tasks: [
      { id: "obs-1", title: "ログ、メトリクス、トレースを区別できる", done: false },
      { id: "obs-2", title: "SLI、SLO、SLAの違いを説明できる", done: false },
      { id: "obs-3", title: "障害対応の基本フローを理解する", done: false },
      { id: "obs-4", title: "ダッシュボードで見るべき指標を選べる", done: false },
    ],
    lessons: [
      {
        id: "observability-basics",
        title: "障害に気づき、原因へ近づく情報を集める",
        summary: "ログ、メトリクス、トレースを使い分け、SREの基本語彙を押さえます。",
        body: [
          "オブザーバビリティは、システムの外から見える情報で内部状態を理解しやすくする考え方です。",
          "ログは出来事の記録、メトリクスは数値の推移、トレースはリクエストが通った経路を表します。",
          "SREでは、ユーザーにとって重要な指標をSLIとして測り、目標値をSLOとして決めます。",
        ],
        keyTerms: [
          { term: "ログ", description: "いつ何が起きたかを文章や構造化データで残す記録。" },
          { term: "メトリクス", description: "CPU使用率、エラー率、応答時間などの数値データ。" },
          { term: "トレース", description: "1つのリクエストが複数サービスを通る流れの記録。" },
        ],
        quiz: [
          {
            id: "obsq-1",
            question: "エラー率や応答時間の推移を見る情報は？",
            choices: [
              { id: "a", label: "メトリクス", correct: true },
              { id: "b", label: "認可", correct: false },
              { id: "c", label: "Dockerfile", correct: false },
            ],
            explanation: "数値の推移を見るならメトリクスが中心です。",
          },
          {
            id: "obsq-2",
            question: "SLIの説明として近いものは？",
            choices: [
              { id: "a", label: "ユーザーに関係する信頼性の測定指標", correct: true },
              { id: "b", label: "必ず守る契約上の違約金", correct: false },
              { id: "c", label: "CSSの命名規則", correct: false },
            ],
            explanation: "SLIは信頼性を測る指標です。SLOはその目標値です。",
          },
        ],
        practicePrompt: `自分が作るWebアプリで見るべきSLIを3つ選び、なぜ必要かを書く。${commonPracticeSuffix}`,
      },
    ],
    resources: [
      { title: "Google SRE Books", source: "Google", url: "https://sre.google/books/" },
      { title: "OpenTelemetry Documentation", source: "OpenTelemetry", url: "https://opentelemetry.io/docs/" },
    ],
  },
  {
    id: "data-rag-vector",
    title: "データ基盤・RAG・ベクトル検索",
    category: "Data",
    status: "未着手",
    understanding: 1,
    nextAction: "RAGの検索、生成、評価の流れを1枚メモにまとめる",
    careerValue: "AIアプリ開発で需要が高く、データエンジニアリングとアプリ開発をつなげられる。",
    accent: "#b45309",
    tasks: [
      { id: "data-1", title: "構造化データと非構造化データを説明できる", done: false },
      { id: "data-2", title: "埋め込みとベクトル検索の概要を理解する", done: false },
      { id: "data-3", title: "RAGの基本構成を説明できる", done: false },
      { id: "data-4", title: "回答品質を評価する観点を3つ挙げる", done: false },
    ],
    lessons: [
      {
        id: "rag-vector-basics",
        title: "RAGは検索してから答える仕組み",
        summary: "データ基盤、埋め込み、ベクトル検索、生成の流れを1つのパイプラインとして理解します。",
        body: [
          "RAGは、質問に関係する資料を検索し、その内容を根拠としてAIに回答させる方法です。",
          "ベクトル検索では、文章の意味を数値の並びに変換し、意味が近い文章を探します。",
          "品質を上げるには、良い資料を入れること、検索結果を絞ること、回答が根拠に沿っているか評価することが重要です。",
        ],
        keyTerms: [
          { term: "埋め込み", description: "文章や画像などを意味を表す数値ベクトルに変換したもの。" },
          { term: "ベクトル検索", description: "意味が近いデータを数値ベクトルの距離で探す方法。" },
          { term: "RAG", description: "検索した根拠を使ってAIが回答を生成する構成。" },
        ],
        quiz: [
          {
            id: "dataq-1",
            question: "RAGの基本的な流れは？",
            choices: [
              { id: "a", label: "検索して根拠を渡し、回答を生成する", correct: true },
              { id: "b", label: "CSSだけで回答する", correct: false },
              { id: "c", label: "ログを消してから回答する", correct: false },
            ],
            explanation: "RAGは検索した情報を根拠として生成する流れです。",
          },
          {
            id: "dataq-2",
            question: "ベクトル検索が得意なことは？",
            choices: [
              { id: "a", label: "意味が近い文章を探すこと", correct: true },
              { id: "b", label: "画面幅を変えること", correct: false },
              { id: "c", label: "パスワードを管理すること", correct: false },
            ],
            explanation: "埋め込みベクトルを使うと、キーワード一致だけでなく意味の近さで探せます。",
          },
        ],
        practicePrompt: `社内FAQをRAG化する想定で、収集する資料、検索方法、回答評価の観点を1つずつ書く。${commonPracticeSuffix}`,
      },
    ],
    resources: [
      { title: "OpenAI Retrieval and File Search Guide", source: "OpenAI", url: "https://platform.openai.com/docs/guides/tools-file-search" },
      { title: "Pinecone: What is Vector Search?", source: "Pinecone", url: "https://www.pinecone.io/learn/vector-search/" },
    ],
  },
];
