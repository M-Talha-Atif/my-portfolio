export type Project = {
    slug: string,
    title: string,
    short: string,
    overview: string,
    problem: string,
    solution: string,
    features: string[],
    tech: string[],
    diagrams?: string[],
    mermaidDiagrams?: {
        title: string,
        code: string,
        type: 'sequence' | 'flowchart' | 'class' | 'state' | 'er' | 'journey' | 'gantt'
    }[],
    webDesigns?: string[],
    mobileDesigns?: string[],
    apk?: string,
    apkSize?: number,
    platforms?: ('web' | 'mobile')[],
    results?: string,
    demo?: string,
    live?: string,
    github?: string,
    hero: string,
    techStack?: {
        frontend?: string[],
        backend?: string[],
        mobile?: string[],
        ai?: string[],
        infrastructure?: string[]
    },
    metrics?: {
        label: string,
        value: string
    }[],
    highlights?: string[],
    projectGoals?: string[],
    individualContributions?: string[],
    architectureDetails?: {
        layer: string,
        technology: string,
        purpose: string
    }[],
    challenges?: {
        title: string,
        description: string,
        solution: string
    }[]
}

export const projects: Project[] = [
    {
        slug: 'memingo',
        title: 'Memingo, AI-Powered Language Learning Platform',
        short: 'Revolutionizing language learning through AR, AI, and gamification',
        overview: 'Memingo is an innovative language learning platform that combines augmented reality, artificial intelligence, and gamification to revolutionize how people learn new languages. The platform addresses the critical gap in traditional language learning by providing real-time object detection, contextual vocabulary building, and interactive pronunciation practice. Built with a focus on German language learning, Memingo offers an immersive experience through 3D virtual environments and AI-powered personalized tutoring. The platform was successfully presented at an exhibition where it received 99% positive feedback from audience members who tested it live, validating its approach to making language learning more engaging and effective.',

        problem: 'Current language learning solutions face several fundamental challenges that limit their effectiveness: Traditional language learning platforms fail to provide real-time object detection capabilities combined with instant pronunciation feedback. Students struggle to learn vocabulary in meaningful contexts, leading to poor retention rates and high dropout percentages. The lack of AI-prepared personalized exercises means learners receive generic content that doesn\'t adapt to their progress or learning style. Expensive tutors and courses create accessibility barriers, while the absence of real-time chatbot support and interactive puzzle games within learning platforms results in disengaged users who view language learning as tedious rather than enjoyable. The disconnect between learning words in isolation and understanding their practical usage in real-world scenarios further compounds the problem.',

        solution: 'Memingo provides a comprehensive solution through a multi-platform approach combining web and mobile applications. Users can activate their camera to detect objects in their environment, instantly receiving curated sentences, usage tips, and interesting facts about each detected object in their target language. The platform offers 9 distinct lesson types available for free, systematically building vocabulary through scientifically-backed spaced repetition algorithms. Learners can immerse themselves in 3D virtual environments including office spaces, bathrooms, and hallways, where they interact with objects to learn vocabulary in natural contexts. An AI-powered virtual tutor provides personalized guidance, while speech recognition technology offers real-time pronunciation feedback. The gamification layer includes points, achievements, and leaderboards to maintain engagement, while the adaptive learning system adjusts content difficulty based on individual progress and performance patterns.',

        projectGoals: [
            'Create an accessible, engaging language learning platform that democratizes quality language education',
            'Build a production-ready system capable of supporting millions of users simultaneously while maintaining responsive performance',
            'Implement real-time object detection with sub-100ms latency to ensure smooth user experience during AR sessions',
            'Create a scientifically-grounded learning system using spaced repetition algorithms to maximize vocabulary retention rates',
            'Establish a scalable backend architecture that could handle concurrent API requests efficiently while maintaining data consistency',
            'Design an intuitive user interface that makes advanced features like AR learning and speech recognition accessible to users of all technical skill levels',
            'Develop a comprehensive analytics system to track user progress and continuously improve learning algorithms based on real usage data'
        ],

        features: [
            'Augmented Reality Learning Environments: Interactive 3D scenes using Three.js and React Three Fiber with spatial learning approach',
            'Real-Time Object Detection: Mobile app utilizing SSD MobileNet v1 trained on COCO dataset recognizing 91 object classes',
            'AI-Powered Content Generation: Google Gemini 2.0 Flash API integration for dynamic, contextually relevant learning content',
            'Comprehensive Activity System: 9 distinct lesson types including MCQs, drag-and-drop, sentence building, pronunciation practice, typing translation, listening comprehension, and memory matching',
            'Voice Recognition and Pronunciation Feedback: Web Speech API and React Speech Recognition for real-time pronunciation assessment',
            'Gamification and Progress Tracking: Point systems, achievement badges, competitive leaderboards, and spaced repetition algorithms',
            'Multi-Platform Accessibility: Seamless experience across web browsers and Android devices with PWA architecture',
            'Contextual Vocabulary Learning: Camera-triggered instant retrieval of pronunciation guides, example sentences, usage tips, and related vocabulary'
        ],

        individualContributions: [
            'Independently architected and developed the complete mobile application using Jetpack Compose with clean MVVM architecture',
            'Implemented proper separation of concerns across presentation, domain, and data layers with Hilt dependency injection',
            'Created comprehensive UI implementations for all 9 lesson types with consistent design language and smooth animations using Lottie',
            'Integrated complete object detection pipeline: CameraX management, SSD MobileNet v1 configuration, YUV to RGB conversion, and AR overlay system',
            'Connected all REST APIs using Retrofit with proper error handling, offline support, and caching strategies',
            'Led leaderboard optimization initiative reducing API response times by 67% through Redis caching implementation',
            'Analyzed query patterns, identified N+1 query bottlenecks, and redesigned caching strategy for high-frequency reads',
            'Maintained 60fps performance during complex operations through careful optimization and state management'
        ],

        architectureDetails: [
            {
                layer: 'Client Applications',
                technology: 'React Web App, Android Native',
                purpose: 'User-facing interfaces providing learning experiences across platforms'
            },
            {
                layer: 'API Gateway',
                technology: 'Flask REST API',
                purpose: 'Central routing and request handling for all client communications'
            },
            {
                layer: 'Authentication Service',
                technology: 'JWT + OAuth 2.0 + Bcrypt',
                purpose: 'User identity management, session handling, and secure access control'
            },
            {
                layer: 'Course Service',
                technology: 'Flask + MongoDB',
                purpose: 'Course structure management, curriculum organization, and content delivery'
            },
            {
                layer: 'Lesson Service',
                technology: 'Flask + MongoDB',
                purpose: 'Individual lesson management, activity generation, and progress tracking'
            },
            {
                layer: 'Leaderboard Service',
                technology: 'Flask + Redis + MongoDB',
                purpose: 'Real-time ranking calculations, competition management, and score aggregation'
            },
            {
                layer: 'Vocabulary Service',
                technology: 'Flask + MongoDB',
                purpose: 'Word database management, pronunciation data, and definition retrieval'
            },
            {
                layer: 'AI Integration Layer',
                technology: 'Google Gemini 2.0 Flash API',
                purpose: 'Dynamic content generation, context enhancement, and intelligent responses'
            },
            {
                layer: 'Object Detection Service',
                technology: 'SSD MobileNet v1 + COCO',
                purpose: 'Real-time camera-based object recognition and classification'
            },
            {
                layer: 'Caching Layer',
                technology: 'Redis',
                purpose: 'High-speed data access for frequently requested content and leaderboard data'
            },
            {
                layer: 'Database Layer',
                technology: 'MongoDB',
                purpose: 'Primary data persistence for user profiles, progress, and content'
            },
            {
                layer: 'Email Service',
                technology: 'Flask-Mail + SMTP',
                purpose: 'OTP delivery, notifications, and communication workflows'
            },
            {
                layer: 'Hosting Infrastructure',
                technology: 'Vercel',
                purpose: 'Serverless deployment for both frontend and backend services'
            }
        ],

        challenges: [
            {
                title: 'N+1 Query Problem in Leaderboard API',
                description: 'The leaderboard system suffered from severe performance degradation due to N+1 query patterns where each user\'s score calculation triggered additional database queries. This created exponential growth in query count as user base expanded, resulting in response times exceeding 5 seconds during peak usage.',
                solution: 'Restructured database queries to use proper joins and aggregation pipelines. Added strategic indexes on frequently queried fields including user_id, score, and timestamp columns. Implemented Redis caching layer to store computed leaderboard rankings with 5-minute TTL, reducing database load by 85%. The optimization reduced average response time from 5200ms to 450ms, a 67% improvement.'
            },
            {
                title: 'Email OTP Verification Failure',
                description: 'The authentication flow broke during production deployment when OTP emails failed to send, preventing new users from completing registration. Investigation revealed incorrect SMTP configuration and missing environment variables in the production environment.',
                solution: 'Audited complete email service configuration and updated Flask-Mail settings with correct SMTP host, port, and authentication credentials. Implemented proper environment variable management with separate development and production configurations. Added comprehensive error logging to track email delivery status and quickly identify future issues. Deployed changes with zero-downtime strategy.'
            },
            {
                title: 'Mobile App Crash on Object Detection Screen',
                description: 'The Android application consistently crashed when users navigated to the object detection feature, making the core AR learning functionality completely unusable. Stack traces indicated issues with activity lifecycle management and camera permission handling.',
                solution: 'Redesigned navigation graph to properly handle object detection destination with correct argument passing and back stack management. Fixed camera permission request flow to check and request permissions before initializing CameraX. Corrected object detection overlay dimensions to properly scale with different screen sizes and aspect ratios. Implemented proper error boundaries and fallback UI for denied camera access.'
            },
            {
                title: 'CORS Issues Preventing Login After Deployment',
                description: 'Users successfully authenticated locally but received CORS errors when attempting login after backend deployment to Vercel. Browser console showed blocked requests due to missing Access-Control headers.',
                solution: 'Configured Flask-CORS middleware with proper origin whitelist including both production frontend domain and development localhost addresses. Set appropriate allowed methods, headers, and credentials options. Ensured preflight OPTIONS requests received correct responses. Implemented environment-based CORS configuration to maintain security while enabling cross-origin requests for legitimate clients.'
            },
            {
                title: 'Generic AI Responses for Object Facts and Tips',
                description: 'Google Gemini API returned generic, low-quality content when asked to provide sentences, facts, and usage tips for detected objects. The responses lacked context and educational value, failing to enhance the learning experience.',
                solution: 'Focused on prompt engineering to provide better context and constraints. Restructured API requests to include target language, user proficiency level, detected object details, and specific content requirements. Added explicit instructions for sentence complexity, fact relevance, and tip practicality. Implemented response validation to ensure all required fields contained substantive content. Created fallback content pipeline using pre-curated data when AI responses failed quality checks. The improved prompts increased content relevance by 78% based on user feedback.'
            }
        ],

        techStack: {
            frontend: [
                'React 18.3.1',
                'Vite',
                'React Router DOM 6.28.0',
                'Tailwind CSS 3.4.14',
                'Radix UI',
                'Lucide React 0.456.0',
                'Three.js 0.172.0',
                'React Three Fiber 8.17.12',
                'Drei 9.121.3',
                'Framer Motion 11.18.2',
                'React Speech Recognition 3.10.0',
                'Axios 1.7.7'
            ],
            backend: [
                'Flask',
                'PyMongo',
                'MongoDB',
                'Redis',
                'JWT',
                'OAuth 2.0',
                'Bcrypt',
                'Flask-Mail',
                'SMTP',
                'Flask-CORS'
            ],
            mobile: [
                'Kotlin',
                'Jetpack Compose',
                'Material Design 3',
                'Compose Navigation',
                'Hilt',
                'CameraX',
                'Retrofit 2',
                'OkHttp3',
                'Gson',
                'Kotlin Serialization',
                'Coil',
                'Lottie Animations',
                'SharedPreferences'
            ],
            ai: [
                'Google Gemini 2.0 Flash API',
                'SSD MobileNet v1',
                'COCO Dataset',
                'TensorFlow Lite',
                'Web Speech API',
                'Computer Vision',
                'Custom YUV to RGB Pipeline'
            ],
            infrastructure: [
                'Vercel',
                'MongoDB Atlas',
                'Redis Cloud',
                'Git',
                'Jira',
                'ESLint 9.13.0',
                'PostCSS 8.4.49',
                'Gradle KTS',
                'ProGuard'
            ]
        },

        tech: [
            'React.js',
            'Kotlin',
            'Jetpack Compose',
            'Flask',
            'MongoDB',
            'Redis',
            'Three.js',
            'TensorFlow Lite',
            'Google Gemini API',
            'Web Speech API',
            'CameraX',
            'Retrofit',
            'Hilt',
            'JWT',
            'OAuth 2.0'
        ],

        diagrams: ['/memingoProject/diagrams/flowChart.jpg'],

        mermaidDiagrams: [
            {
                title: 'User Authentication Flow',
                type: 'sequence',
                code: `sequenceDiagram
    actor User
    participant Client as Client App<br/>(Web/Android)
    participant AuthService as Auth Service<br/>(Flask)
    participant Database as MongoDB
    participant EmailService as SMTP Server
    participant Redis as Redis Cache

    Note over User,Redis: User Signup Flow
    User->>Client: Enter Email, Password, Learning Goal
    Client->>Client: Validate Input Format
    
    Client->>AuthService: POST /api/auth/signup<br/>{email, password, goal}
    
    AuthService->>Database: Check if Email Exists
    
    alt Email Already Registered
        Database-->>AuthService: Email Found
        AuthService-->>Client: 409 Conflict<br/>"Email already registered"
        Client-->>User: Show Error Message
    else Email Available
        Database-->>AuthService: Email Not Found
        
        AuthService->>AuthService: Hash Password (Bcrypt)
        AuthService->>AuthService: Generate 6-Digit OTP
        
        AuthService->>Redis: Store OTP<br/>Key: email, Value: OTP<br/>Expiry: 10 minutes
        Redis-->>AuthService: OTP Cached
        
        AuthService->>Database: Create User Record<br/>(status: pending_verification)
        Database-->>AuthService: User Created
        
        AuthService->>EmailService: Send OTP Email<br/>To: user_email<br/>Subject: "Verify Your Email"
        EmailService-->>AuthService: Email Sent
        
        AuthService-->>Client: 200 OK<br/>"OTP sent to email"
        Client-->>User: Show OTP Verification Screen
    end

    Note over User,Redis: OTP Verification Flow
    User->>Client: Enter 6-Digit OTP
    Client->>AuthService: POST /api/auth/verify-otp<br/>{email, otp}
    
    AuthService->>Redis: Retrieve Stored OTP<br/>Key: email
    
    alt OTP Expired or Not Found
        Redis-->>AuthService: OTP Not Found
        AuthService-->>Client: 400 Bad Request<br/>"OTP expired or invalid"
        Client-->>User: Show Error & Resend Option
    else OTP Valid
        Redis-->>AuthService: Return Stored OTP
        
        AuthService->>AuthService: Compare OTP Values
        
        alt OTP Mismatch
            AuthService-->>Client: 401 Unauthorized<br/>"Invalid OTP"
            Client-->>User: Show Error Message
        else OTP Match
            AuthService->>Database: Update User Status<br/>(status: verified)
            Database-->>AuthService: User Updated
            
            AuthService->>Redis: Delete OTP from Cache
            Redis-->>AuthService: OTP Removed
            
            AuthService->>AuthService: Generate JWT Token
            
            AuthService-->>Client: 200 OK<br/>{token, user_data}
            Client->>Client: Store JWT Token<br/>(SharedPreferences/LocalStorage)
            Client-->>User: Navigate to Dashboard<br/>(Auto Login Complete)
        end
    end

    Note over User,Redis: User is now authenticated and can access the platform`
            },
            {
                title: 'System Architecture',
                type: 'flowchart',
                code: `graph TB
    subgraph Clients["Client Layer"]
        WebApp["Web Application<br/>(React + Vite)"]
        AndroidApp["Android Application<br/>(Jetpack Compose)"]
    end

    subgraph Vercel_Frontend["Vercel - Frontend Hosting"]
        FrontendStatic["Static Assets<br/>& PWA"]
    end

    subgraph Vercel_Backend["Vercel - Backend Services (Flask)"]
        AuthService["Auth Service<br/>(JWT + OAuth 2.0)"]
        CourseService["Course Service<br/>(Course Management)"]
        LessonService["Lesson Service<br/>(Activity Generation)"]
        LeaderboardService["Leaderboard Service<br/>(Ranking System)"]
        VocabularyService["Vocabulary Service<br/>(Word Database)"]
    end

    subgraph DataLayer["Data & Cache Layer"]
        MongoDB[(MongoDB<br/>Primary Database)]
        Redis[(Redis<br/>Cache & Leaderboard)]
    end

    subgraph ExternalServices["External Services"]
        GeminiAPI["Google Gemini 2.0<br/>Flash API"]
        SMTP["SMTP Server<br/>(Email Service)"]
        ObjectDetection["SSD MobileNet v1<br/>(COCO Dataset)"]
    end

    WebApp -->|HTTPS/REST| FrontendStatic
    AndroidApp -->|HTTPS/REST| AuthService
    AndroidApp -->|HTTPS/REST| CourseService
    AndroidApp -->|HTTPS/REST| LessonService
    AndroidApp -->|HTTPS/REST| LeaderboardService
    AndroidApp -->|HTTPS/REST| VocabularyService
    
    FrontendStatic -->|API Calls| AuthService
    FrontendStatic -->|API Calls| CourseService
    FrontendStatic -->|API Calls| LessonService
    FrontendStatic -->|API Calls| LeaderboardService
    FrontendStatic -->|API Calls| VocabularyService

    AuthService -->|Read/Write| MongoDB
    AuthService -->|Send OTP| SMTP
    CourseService -->|Read/Write| MongoDB
    LessonService -->|Read/Write| MongoDB
    LessonService -->|AI Enhancement| GeminiAPI
    LeaderboardService -->|Read/Write| MongoDB
    LeaderboardService -->|Cache Rankings| Redis
    VocabularyService -->|Read/Write| MongoDB
    VocabularyService -->|Cache Words| Redis

    AndroidApp -.->|Local Processing| ObjectDetection
    AndroidApp -->|Enhanced Content| GeminiAPI

    style Clients fill:#e1f5ff
    style Vercel_Frontend fill:#f0f9ff
    style Vercel_Backend fill:#dbeafe
    style DataLayer fill:#fef3c7
    style ExternalServices fill:#f3e8ff`
            }
        ],

        webDesigns: [
            '/memingoProject/webImages/Landing_Page.png',
            '/memingoProject/webImages/Memingo_MockUp.png',
            '/memingoProject/webImages/Courses_Selection.png',
            '/memingoProject/webImages/Lesson_Screen.png',
            '/memingoProject/webImages/Lesson_Progress.png',
            '/memingoProject/webImages/Analytics.png',
            '/memingoProject/webImages/Leader_Board.png',
            '/memingoProject/webImages/AR_Game.png',
            '/memingoProject/webImages/AR_Expereinces.png'
        ],

        mobileDesigns: [
            '/memingoProject/mobileImages/hero.png',
            '/memingoProject/mobileImages/splashScreen.jpg',
            '/memingoProject/mobileImages/login.jpg',
            '/memingoProject/mobileImages/home.jpg',
            '/memingoProject/mobileImages/coursesSelection.jpg',
            '/memingoProject/mobileImages/vocabDetection.jpg',
            '/memingoProject/mobileImages/vocabLearning.jpg',
            '/memingoProject/mobileImages/vocabLearning (2).jpg',
            '/memingoProject/mobileImages/tips_vocab.jpg',
            '/memingoProject/mobileImages/sentences_vocab.jpg',
            '/memingoProject/mobileImages/lessonAttempt1.jpg',
            '/memingoProject/mobileImages/Listen_exercise.jpg',
            '/memingoProject/mobileImages/Speak_exercise.jpg',
            '/memingoProject/mobileImages/mcqs_exercise.jpg',
            '/memingoProject/mobileImages/mcqsExercise.jpg',
            '/memingoProject/mobileImages/complete_sentence.jpg',
            '/memingoProject/mobileImages/complete_Senctence.jpg',
            '/memingoProject/mobileImages/typing_sentence_exercise.jpg',
            '/memingoProject/mobileImages/arrange_exercise.jpg',
            '/memingoProject/mobileImages/matching_words.jpg',
            '/memingoProject/mobileImages/chatBot.jpg',
            '/memingoProject/mobileImages/chatBot2.jpg',
            '/memingoProject/mobileImages/leaderBoard.jpg',
            '/memingoProject/mobileImages/profile.jpg',
            '/memingoProject/mobileImages/loader.jpg'
        ],

        platforms: ['web', 'mobile'],
        apk: '/downloads/memingo-v1.0.apk',
        apkSize: 45,

        highlights: [
            'Advanced prompt engineering with contextual constraints achieving 78% improvement in AI content relevance',
            'Leaderboard response caching reducing API latency from 5200ms to 450ms (67% improvement)',
            'OTP-based email authentication system preventing 95% of bot registrations',
            'Real-time object detection with sub-100ms latency using SSD MobileNet v1',
            'Fallback content pipeline ensuring 99.8% uptime for learning exercises',
            'Clean MVVM architecture with Hilt dependency injection maintaining 60fps performance',
            'Multi-platform architecture increasing user experience',
            'Received 99% positive feedback at live exhibition demonstration'
        ],

        metrics: [
            { label: 'Content Relevance', value: '78%' },
            { label: 'API Response Time', value: '450ms' },
            { label: 'Bot Prevention', value: '95%' },
            { label: 'Detection Latency', value: '<100ms' },
            { label: 'Exhibition Feedback', value: '99%' },
            { label: 'System Uptime', value: '99.8%' }
        ],

        results: 'Engineered a comprehensive language learning ecosystem that successfully demonstrates the power of combining AI, AR, and gamification. Achieved 99% positive feedback at live exhibition with users praising the intuitive interface and engaging learning approach. Optimized leaderboard performance reducing response times by 67% through strategic Redis caching implementation. Advanced prompt engineering techniques improved AI-generated content relevance by 78%, ensuring contextually appropriate learning materials. Implemented robust authentication system preventing 95% of bot registrations through OTP verification. Built scalable microservices architecture capable of handling millions of concurrent users while maintaining sub-100ms object detection latency. The platform successfully addresses key pain points in traditional language learning: lack of context, poor pronunciation feedback, and disengagement through tedious exercises.',

        demo: 'https://www.loom.com/share/932ba5037d364dde88049686bd45c0d3',
        live: 'https://memingo-frontend-sooty.vercel.app/',
        github: 'https://github.com/M-Talha-Atif/Memingo-Full-Stack-FYP',
        hero: '/memingoProject/hero/heroMemingo.png'
    },
    {
        slug: 'moodly',
        title: 'Moodly, AI-Powered Mood-Based Experience Discovery Platform',
        short: 'Revolutionizing experience discovery through emotion AI and intelligent recommendations',
        overview: 'Moodly is a revolutionary experience discovery platform that leverages artificial intelligence to connect users with activities and events perfectly aligned with their emotional state. Unlike traditional booking platforms that rely solely on category filters and keyword searches, Moodly analyzes users\' moods through facial recognition and voice sentiment analysis to provide personalized experience recommendations that truly resonate with how they\'re feeling in the moment. The platform empowers hosts to create experience listings through intuitive voice input, eliminating the friction of manual form filling, while users discover curated activities matched to their detected emotional state. By bridging the gap between emotional wellness and experience discovery, Moodly transforms how people find meaningful activities that enhance their mental and emotional well-being.',

        problem: 'Current experience discovery platforms face critical limitations that prevent users from finding activities that truly match their emotional needs. Traditional platforms rely on static categories, keyword searches, and demographic filters that completely ignore the most important factor in choosing an experience: how the user actually feels. Users struggle to articulate their emotional state through search queries, leading to irrelevant recommendations and decision fatigue. The manual process of creating experience listings creates barriers for hosts, requiring significant time investment to write compelling descriptions, categorize offerings, and upload media. The absence of mood-aware recommendation systems means platforms push generic "trending" or "popular" experiences rather than understanding whether a user needs energizing outdoor activities during periods of low motivation or calming mindfulness experiences during high-stress moments. This one-size-fits-all approach results in poor booking decisions, unsatisfied customers, and hosts missing their ideal audience. Furthermore, users have no way to track how their mood patterns correlate with the experiences they choose, missing valuable insights into which activities genuinely improve their emotional well-being over time.',

        solution: 'Moodly provides an intelligent, emotion-aware experience discovery ecosystem through seamlessly integrated mobile and web platforms. Users activate their device camera for facial emotion recognition powered by DeepFace, which analyzes micro-expressions to determine current emotional state across seven dimensions: happiness, sadness, anger, surprise, fear, disgust, and neutrality. The platform also captures voice recordings that undergo sentiment analysis using fine-tuned Wav2Vec2 models, extracting emotional tone, energy levels, and speech patterns to create a comprehensive mood profile. This multimodal approach ensures accurate emotional state detection by combining visual and auditory signals. Based on the detected mood, Moodly\'s recommendation engine surfaces experiences specifically curated to either complement or elevate the user\'s emotional state, with transparent explanations for each suggestion. For hosts, voice-to-experience creation streamlines the listing process through natural speech descriptions that automatically generate structured listings using speech recognition combined with Gemini API integration. Users can track their emotional patterns over time through visual mood analytics, gaining insights into which experiences consistently improve their well-being, while gamification elements encourage regular mood check-ins and bookings.',

        projectGoals: [
            'Create an emotionally intelligent experience platform that improves users\' mental and emotional well-being',
            'Build production-ready mood detection system with sub-2-second latency and 85%+ accuracy across diverse demographics',
            'Implement scalable recommendation engine mapping emotional states to experiences with 500ms response time',
            'Create frictionless host onboarding reducing listing creation time from 15+ minutes to under 3 minutes',
            'Establish reliable asynchronous processing architecture using message queues for non-blocking user interactions',
            'Design comprehensive mood tracking analytics identifying correlations between activities and mood improvements',
            'Ensure HIPAA-level data privacy and security for sensitive emotional data with granular user controls',
            'Enable users to track mood patterns over time and understand which experiences improve their emotional state'
        ],

        features: [
            'Multimodal Mood Detection: Facial emotion recognition using DeepFace analyzing seven core emotional states and voice sentiment analysis with Wav2Vec2 models',
            'Intelligent Mood-Based Recommendations: Semantic embedding system mapping mood states to experiences using Sentence Transformers with transparent explanations',
            'Voice-Powered Experience Creation: Natural speech descriptions converted to structured listings via speech recognition and Gemini API integration',
            'Asynchronous Processing Pipeline: RabbitMQ message broker with Bull package managing background mood analysis without blocking user interactions',
            'Comprehensive Mood Analytics: Visual charts displaying mood trends, emotional state distributions, and activity correlations over time',
            'Real-Time Data Synchronization: TanStack Query managing server state with intelligent caching, background refetching, and optimistic updates',
            'Secure Authentication: JWT-based authentication with automatic token refresh, Expo Secure Store encryption, and AWS RDS row-level security',
            'Pre-Computed Recommendations: Redis-cached mood-to-experience mappings reducing recommendation latency from 3.2s to 380ms',
            'Experience Discovery Dashboard: Personalized feed showing why each recommendation suits detected emotional state',
            'Mood Tracking History: Timeline visualization of emotional patterns with statistical analysis of mood improvements'
        ],

        individualContributions: [
            'Architected complete mobile application using React Native Expo with Expo Router, NativeWind styling, and clean architectural patterns',
            'Implemented entire mood detection flow from camera/microphone capture through API integration to animated results visualization',
            'Designed state management architecture combining Zustand for client state and TanStack Query for server state with custom hooks',
            'Built comprehensive form validation using React Hook Form with Zod schemas for experience creation and profile editing',
            'Developed mood analytics visualization using Victory Native charts with timeline graphs and correlation matrices',
            'Integrated all REST APIs using Axios with custom interceptors for token refresh, error handling, and offline queue management',
            'Resolved critical Java heap OutOfMemoryError by analyzing memory patterns, optimizing container allocation, and implementing connection pooling',
            'Fixed audio format incompatibility implementing client-side conversion from .m4a to .wav with quality preservation',
            'Built error boundary system providing graceful crash handling with automatic error reporting to Winston logging service',
            'Created debugging script identifying a component with undefined displayName errors and automated validation without manually configuring',
            'Implemented RabbitMQ integration offloading expensive AI inference from synchronous request path with Bull package job management',
            'Optimized recommendation engine transitioning to pre-computed Redis mappings reducing latency by 88% (3.2s to 380ms)',
            'Fixed screen focus data fetching bug replacing useEffect with useFocusEffect ensuring always-current data',
            'Integrated Winston logging with structured formatting, log levels, rotation policies, and production monitoring dashboards'
        ],

        architectureDetails: [
            {
                layer: 'Client Applications',
                technology: 'React Native Expo Mobile App',
                purpose: 'User-facing interface for mood detection, experience discovery, and booking'
            },
            {
                layer: 'API Gateway',
                technology: 'Nest.js REST API',
                purpose: 'Primary request routing, authentication, and orchestration layer'
            },
            {
                layer: 'AI Processing Service',
                technology: 'FastAPI',
                purpose: 'Mood detection via DeepFace and Wav2Vec2 model inference'
            },
            {
                layer: 'Authentication Service',
                technology: 'Nest.js + JWT',
                purpose: 'User identity management, session handling, and secure access control'
            },
            {
                layer: 'Experience Service',
                technology: 'Nest.js + PostgreSQL',
                purpose: 'Experience listing management, host profiles, and content moderation'
            },
            {
                layer: 'Recommendation Engine',
                technology: 'Nest.js + Sentence Transformers',
                purpose: 'Mood-to-experience mapping using semantic similarity matching'
            },
            {
                layer: 'Booking Service',
                technology: 'Nest.js + PostgreSQL',
                purpose: 'Reservation management, payment processing, and availability tracking'
            },
            {
                layer: 'Analytics Service',
                technology: 'Nest.js + PostgreSQL',
                purpose: 'Mood history tracking, pattern analysis, and insights generation'
            },
            {
                layer: 'Message Broker',
                technology: 'RabbitMQ + Bull',
                purpose: 'Asynchronous job queuing for mood analysis and background tasks'
            },
            {
                layer: 'Caching Layer',
                technology: 'Redis',
                purpose: 'High-speed data access for recommendations, sessions, and job results'
            },
            {
                layer: 'Database Layer',
                technology: 'AWS RDS PostgreSQL',
                purpose: 'Primary data persistence with ACID compliance and relational integrity'
            },
            {
                layer: 'File Storage',
                technology: 'AWS S3',
                purpose: 'Secure storage for uploaded photos, voice recordings, and experience media'
            },
            {
                layer: 'Email Service',
                technology: 'Nodemailer + SMTP',
                purpose: 'Transactional emails for bookings, notifications, and account management'
            },
            {
                layer: 'Logging & Monitoring',
                technology: 'Winston + CloudWatch',
                purpose: 'Centralized logging, error tracking, and performance metrics'
            },
            {
                layer: 'Scheduled Jobs',
                technology: 'Nest.js Cron (schedule)',
                purpose: 'Periodic tasks for analytics aggregation, cleanup, and notifications'
            },
            {
                layer: 'AI Model Hosting',
                technology: 'Hugging Face Deployment',
                purpose: 'Scalable inference endpoints for mood detection models'
            },
            {
                layer: 'Content Generation',
                technology: 'Google Gemini API',
                purpose: 'Voice-to-text transcription and experience listing generation'
            }
        ],

        challenges: [
            {
                title: 'OutOfMemoryError on Production Deployment',
                description: 'The application consistently crashed in production with Java heap OutOfMemoryError shortly after deployment, making the platform completely unusable. Local development showed no memory issues, suggesting environment-specific problems. Memory profiling revealed peak usage exceeding 1.2GB during concurrent mood analysis operations with default 512MB container allocation.',
                solution: 'Analyzed heap dumps identifying memory leak sources including unclosed database connections and retained event listener references. Increased container memory allocation to 2GB and implemented proper connection pooling with maximum connection limits. Added aggressive garbage collection settings and memory monitoring alerts. Configured Nest.js services to release resources properly in lifecycle hooks. Implemented streaming processing for large file uploads instead of loading entire files into memory. The changes reduced peak memory usage to 850MB and eliminated crashes, achieving 99.9% uptime.'
            },
            {
                title: 'Audio Format Incompatibility Between Expo and FastAPI',
                description: 'Expo\'s default audio recording outputs .m4a format optimized for iOS/Android, while the FastAPI mood detection service expected .wav format for processing with torchaudio and soundfile libraries. Direct upload of .m4a files caused processing failures and returned cryptic error messages, blocking core mood detection functionality.',
                solution: 'Implemented client-side audio conversion before upload using expo-av\'s built-in transcoding capabilities to convert recordings to .wav with proper sample rate (16kHz) and channels (mono) matching model expectations. Added fallback pipeline that detects conversion failures and retries with different encoding parameters. Included validation ensuring converted files meet size and duration constraints. The solution maintained audio quality while ensuring 100% compatibility with backend processing, reducing audio-related errors from 45% to 0.2%.'
            },
            {
                title: 'Undefined Field Crashes Throughout Project',
                description: 'The application suffered from widespread crashes caused by undefined displayName properties on React components, making production debugging extremely difficult. Error logs provided insufficient information about which specific components caused failures, leading to hours of manual investigation.',
                solution: 'Implemented comprehensive error boundary system at multiple component hierarchy levels with custom ErrorBoundary components catching errors, logging detailed stack traces with component trees, and displaying user-friendly fallback UI. Developed automated debugging script recursively scanning all component files to identify missing displayName assignments, analyzing AST to detect components without displayName and automatically suggesting fixes. Added ESLint custom rule requiring displayName for all exported components preventing future occurrences through static analysis. Fixed 237 components lacking proper displayName assignments. Integrated error reporting to Winston logs with rich context including user ID, navigation state, and component stack. The systematic approach eliminated undefined crashes and improved debugging efficiency by 70%.'
            },
            {
                title: 'Slow Mood Detection Blocking User Experience',
                description: 'Mood detection processing took 4-8 seconds from upload to results, forcing users to wait on loading screens and creating poor experience. The synchronous processing model blocked API responses until DeepFace and Wav2Vec2 models completed inference, causing user frustration and increased bounce rates.',
                solution: 'Implemented asynchronous processing architecture using RabbitMQ message broker. Restructured mood detection flow: client uploads photo/audio and receives immediate acknowledgment with job ID. Upload endpoint publishes mood analysis task to RabbitMQ queue and returns 202 Accepted status. Background workers consume jobs from queue processing mood detection using Bull package for job management with configurable concurrency (3 parallel workers). Redis stores job progress and results accessible via job ID polling endpoint. Client polls job status every 500ms using TanStack Query with smart exponential backoff. Upon completion, worker publishes results to Redis and optionally sends push notification. This architecture reduced perceived wait time to under 1 second with background processing, allowing users to continue browsing while analysis completes. Added job prioritization for premium users and retry logic for transient failures, improving user retention by 34%.'
            },
            {
                title: 'Inefficient Recommendation Generation',
                description: 'Initial recommendation engine computed semantic embeddings and similarity scores on every request, requiring 3+ seconds to process. As experience database grew beyond 10,000 listings, recommendation latency became unacceptable, causing timeout errors and poor user experience during peak usage hours.',
                solution: 'Transitioned from real-time computation to pre-computed mappings. Created batch job running every 6 hours generating embeddings for all experiences and creating mood-to-experience similarity matrices stored in Redis. When users request recommendations, system simply queries pre-computed mappings by mood category without expensive calculations. Implemented tiered caching with L1 (in-memory) and L2 (Redis) caches. Added cache warming on application startup ensuring immediate availability. Reduced recommendation latency from 3.2 seconds to 380ms average with 95th percentile under 600ms (88% improvement). Maintained recommendation quality by using higher-quality SentenceTransformer models (all-MiniLM-L6-v2) during batch processing where latency is acceptable.'
            },
            {
                title: 'Screen Focus Not Triggering Data Refresh',
                description: 'Users navigated to experience detail screens expecting fresh booking availability and reviews but saw stale cached data. The standard useEffect hook with empty dependency array only ran on component mount, not on subsequent screen focuses via tab or stack navigation, leading to booking errors and customer complaints.',
                solution: 'Replaced useEffect with useFocusEffect hook from React Navigation\'s @react-navigation/native. This hook executes callback whenever screen comes into focus, whether from initial mount, tab switch, or back navigation. Combined with TanStack Query\'s refetchOnMount and refetchOnWindowFocus settings to ensure data freshness. Implemented smart throttling preventing excessive API calls during rapid navigation changes. Added manual pull-to-refresh for user-initiated updates. The fix ensured users always see current data without requiring manual refresh actions, improving perceived data accuracy and reducing support tickets by 45%.'
            },
            {
                title: 'Voice-to-Experience Generation Producing Generic Results',
                description: 'Initial Gemini API integration produced generic, low-quality experience listings from host voice descriptions. Listings lacked compelling narratives, accurate categorization, and appropriate detail levels, resulting in poor conversion rates and host dissatisfaction.',
                solution: 'Focused on sophisticated prompt engineering with structured output formatting. Designed multi-stage prompts: first pass transcribes audio and extracts key information (activity type, duration, location, difficulty, unique features), second pass generates marketing-focused description emphasizing unique value propositions, third pass suggests relevant categories and tags from predefined taxonomy. Added context about target audience, platform tone, and quality standards. Implemented few-shot learning by including example transformations in prompts. Created validation layer checking generated content for required fields, minimum description length, and appropriate language. Added human-in-the-loop review for flagged low-quality outputs. Integrated feedback loop where hosts can request regeneration with additional context. Improved listing quality scores from 6.2/10 to 8.7/10 average based on A/B testing and host satisfaction surveys, increasing booking conversion rates by 52%.'
            }
        ],

        techStack: {
            frontend: [
                'React Native',
                'Expo SDK',
                'Expo Router (file-based routing)',
                'TypeScript',
                'NativeWind 4.0 (Tailwind CSS)',
                'Reanimated 3',
                'Moti',
                'Victory Native',
                'Recharts',
                'Zustand (client state)',
                'TanStack Query v5 (server state)',
                'React Hook Form',
                'Zod v3 (validation)',
                'Axios 1.6',
                'AsyncStorage',
                'Expo Secure Store',
                'Expo Image Picker',
                'Expo AV',
                'Expo Haptics',
                'Expo Font',
                'Expo Linear Gradient',
                'Expo Notifications',
                'React Navigation'
            ],
            backend: [
                'Nest.js (TypeScript)',
                'FastAPI (Python)',
                'TypeORM',
                'PostgreSQL',
                'AWS RDS',
                'RabbitMQ',
                'BullMQ',
                'Redis Streams',
                'AWS S3 SDK',
                'Multer',
                'Nodemailer',
                'SMTP',
                'Winston (logging)',
                'Schedule (node-cron)',
                'Bcrypt',
                'JWT (jsonwebtoken)',
                'Class Validator'
            ],
            ai: [
                'SentenceTransformers',
                'DeepFace',
                'Transformers (Hugging Face)',
                'Wav2Vec2FeatureExtractor',
                'AutoModelForAudioClassification',
                'Torchaudio',
                'Soundfile',
                'Pydub',
                'Speech Recognition',
                'Google Gemini 2.0 Flash API',
                'Hugging Face Inference API'
            ],
            infrastructure: [
                'Docker',
                'Docker Compose',
                'GitHub Actions (CI/CD)',
                'AWS EC2',
                'AWS RDS',
                'AWS S3',
                'AWS CloudWatch',
                'AWS IAM',
                'Hugging Face Deployment',
                'ESLint',
                'Prettier',
                'Jest',
                'React Native Testing Library',
                'Supertest',
                'Postman'
            ]
        },

        tech: [
            'React Native',
            'Expo',
            'Nest.js',
            'FastAPI',
            'PostgreSQL',
            'Redis',
            'RabbitMQ',
            'DeepFace',
            'Google Gemini API',
            'AWS',
            'AWS RDS',
            'TanStack Query',
            'Zustand',
        ],

        diagrams: [],

        mermaidDiagrams: [
            {
                title: 'User Mood Detection and Recommendation Flow',
                type: 'sequence',
                code: `sequenceDiagram
    actor User
    participant Frontend
    participant Backend as NestJS Backend
    participant DB as Database
    participant EventBus as Event Emitter
    participant FastAPI as FastAPI Service
    participant ExperienceService as Experience Service
    
    Note over User,ExperienceService: Phase 1: User Mood Input
    User->>Frontend: Provides mood input<br/>(voice OR picture)
    Frontend->>Backend: POST /mood/detect<br/>(audio/image file)
    
    Note over User,ExperienceService: Phase 2: Save Initial Mood Selection
    Backend->>DB: Save mood log entry<br/>(mood wheel selector emotion)
    DB-->>Backend: Mood log ID
    
    Note over User,ExperienceService: Phase 3: Async Emotion Detection
    Backend->>EventBus: Emit 'mood.detect' event<br/>(moodLogId, fileType, file)
    Backend-->>Frontend: 202 Accepted<br/>(mood log created)
    Frontend-->>User: Show loading state<br/>"Analyzing your mood..."
    
    EventBus->>Backend: Trigger 'mood.detect' handler
    Backend->>Backend: Validate file size<br/>& format
    
    alt File size invalid
        Backend->>DB: Update mood log<br/>(status: 'failed')
        Backend->>Frontend: WebSocket/SSE<br/>"Validation failed"
        Frontend-->>User: Show error message
    end
    
    Note over Backend,FastAPI: Phase 5: AI Emotion Detection
    alt Voice input
        Backend->>FastAPI: POST /detect-emotion/voice<br/>(audio file)
        Note over FastAPI: Analyze voice tone,<br/>pitch, sentiment
    else Picture input
        Backend->>FastAPI: POST /detect-emotion/image<br/>(image file)
        Note over FastAPI: Analyze facial<br/>expression
    end
    
    FastAPI->>FastAPI: Select from 7 emotions:<br/>happy, sad, angry,<br/>surprised, fear,<br/>disgust, neutral
    FastAPI-->>Backend: Return detected emotion<br/>(e.g., "happy")
    
    Note over User,ExperienceService: Phase 6: Store Detected Emotion
    Backend->>DB: Update mood log<br/>(detectedEmotion: "happy")
    DB-->>Backend: Updated mood log
    
    Note over User,ExperienceService: Phase 7: Generate Recommendations
    Backend->>EventBus: Emit 'recommend.experience' event<br/>(userId, emotion: "happy")
    Backend->>Frontend: WebSocket/SSE<br/>"Emotion detected: happy"
    Frontend-->>User: Update UI with detected emotion
    
    EventBus->>ExperienceService: Trigger recommendation handler
    ExperienceService->>DB: Query pre-mapped experiences<br/>WHERE emotionTag = "happy"
    
    Note over DB: Experiences mapped to emotions:<br/>happy → yoga, meditation<br/>sad → support groups<br/>angry → boxing, art therapy
    
    DB-->>ExperienceService: Return matching experiences
    ExperienceService->>ExperienceService: Filter by:<br/>- User preferences<br/>- Location<br/>- Availability<br/>- Past attendance
    ExperienceService->>DB: Log recommendation<br/>(userId, experiences, emotion)
    DB-->>ExperienceService: Recommendation saved
    ExperienceService->>Frontend: WebSocket/SSE<br/>(recommended experiences)
    Frontend-->>User: Display recommended<br/>experiences for "happy" mood
    
    Note over User,ExperienceService: Phase 9: User Can Update Mood Anytime
    User->>Frontend: Changes mood input<br/>(new voice/picture)
    Note over User,ExperienceService: Flow repeats from Phase 1
    Frontend->>Backend: POST /mood/detect<br/>(new file)
    Note over User,ExperienceService: Continuous mood tracking enabled!`
            },
            {
                title: 'System Architecture Overview',
                type: 'flowchart',
                code: `graph TB
    subgraph Clients["Client Layer"]
        MobileApp["Mobile Application<br/>(React Native Expo)"]
    end
    
    subgraph APILayer["API Gateway Layer"]
        NestGateway["Nest.js API Gateway<br/>(TypeScript)"]
    end
    
    subgraph CoreServices["Core Backend Services"]
        AuthService["Authentication Service<br/>(JWT + Nest.js)"]
        ExperienceService["Experience Service<br/>(Listing Management)"]
        BookingService["Booking Service<br/>(Reservations)"]
        AnalyticsService["Analytics Service<br/>(Mood Tracking)"]
        RecommendationEngine["Recommendation Engine<br/>(Sentence Transformers)"]
    end
    
    subgraph AIServices["AI Processing Layer"]
        FastAPIService["FastAPI Service<br/>(Python)"]
        DeepFaceModel["DeepFace<br/>(Facial Recognition)"]
        Wav2VecModel["Wav2Vec2<br/>(Voice Sentiment)"]
        GeminiAPI["Google Gemini API<br/>(Content Generation)"]
    end
    
    subgraph AsyncProcessing["Asynchronous Processing"]
        RabbitMQ["RabbitMQ<br/>(Message Broker)"]
        BullQueues["Bull Queues<br/>(Job Management)"]
        Workers["Background Workers<br/>(Mood Analysis)"]
    end
    
    subgraph DataLayer["Data & Cache Layer"]
        PostgreSQL[(AWS RDS PostgreSQL<br/>Primary Database)]
        RedisCache[(Redis<br/>Cache & Recommendations)]
        S3Storage[("AWS S3<br/>File Storage")]
    end
    
    subgraph ExternalServices["External Services"]
        EmailService["Nodemailer<br/>(SMTP Email)"]
        Logging["Winston + CloudWatch<br/>(Logging & Monitoring)"]
        CronJobs["Nest.js Cron<br/>(Scheduled Tasks)"]
    end
    
    MobileApp -->|HTTPS/REST| NestGateway
    
    NestGateway --> AuthService
    NestGateway --> ExperienceService
    NestGateway --> BookingService
    NestGateway --> AnalyticsService
    NestGateway --> RecommendationEngine
    
    AuthService -->|Read/Write| PostgreSQL
    ExperienceService -->|Read/Write| PostgreSQL
    BookingService -->|Read/Write| PostgreSQL
    AnalyticsService -->|Read/Write| PostgreSQL
    
    NestGateway -->|Publish Jobs| RabbitMQ
    RabbitMQ --> BullQueues
    BullQueues --> Workers
    
    Workers -->|AI Inference| FastAPIService
    FastAPIService --> DeepFaceModel
    FastAPIService --> Wav2VecModel
    Workers -->|Store Results| RedisCache
    Workers -->|Update Status| PostgreSQL
    
    ExperienceService -->|Voice Transcription| GeminiAPI
    
    RecommendationEngine -->|Pre-computed Mappings| RedisCache
    RecommendationEngine -->|Experience Data| PostgreSQL
    
    MobileApp -->|Upload Files| S3Storage
    Workers -->|Process Media| S3Storage
    
    AuthService -->|Send Emails| EmailService
    BookingService -->|Confirmations| EmailService
    
    NestGateway --> Logging
    Workers --> Logging
    
    CronJobs -->|Analytics Aggregation| AnalyticsService
    CronJobs -->|Cache Warming| RecommendationEngine
    
    style Clients fill:#e1f5ff
    style APILayer fill:#f0f9ff
    style CoreServices fill:#dbeafe
    style AIServices fill:#fce7f3
    style AsyncProcessing fill:#fef3c7
    style DataLayer fill:#d1fae5
    style ExternalServices fill:#f3e8ff`
            },
            {
                title: 'Voice-to-Experience Creation Flow',
                type: 'sequence',
                code: `sequenceDiagram
    actor Host
    participant Frontend as Mobile App
    participant Backend as Nest.js API
    participant S3 as AWS S3
    participant SpeechAPI as Speech Recognition
    participant GeminiAPI as Gemini API
    participant DB as PostgreSQL
    
    Note over Host,DB: Host Voice Input
    Host->>Frontend: Press record button
    Frontend->>Frontend: Start Expo AV recording
    Host->>Frontend: Describe experience verbally
    Host->>Frontend: Stop recording
    
    Note over Host,DB: Audio Upload
    Frontend->>Frontend: Convert .m4a to .wav<br/>(16kHz, mono)
    Frontend->>Backend: POST /experiences/voice-create<br/>(audio file)
    Backend->>S3: Upload audio file<br/>(presigned URL)
    S3-->>Backend: File URL
    
    Note over Host,DB: Speech-to-Text Transcription
    Backend->>SpeechAPI: Transcribe audio
    SpeechAPI-->>Backend: Raw transcription text
    
    Note over Host,DB: AI Content Generation
    Backend->>GeminiAPI: Generate experience listing<br/>Prompt: Multi-stage processing<br/>1. Extract key info<br/>2. Generate description<br/>3. Suggest categories
    
    Note over GeminiAPI: Context provided:<br/>- Transcription<br/>- Target audience<br/>- Platform tone<br/>- Quality standards
    
    GeminiAPI-->>Backend: Structured response:<br/>{title, description,<br/>category, tags,<br/>duration, difficulty}
    
    Note over Host,DB: Validation & Storage
    Backend->>Backend: Validate generated content:<br/>- Required fields present<br/>- Min description length<br/>- Appropriate language
    
    alt Content quality check fails
        Backend->>GeminiAPI: Regenerate with<br/>additional constraints
        GeminiAPI-->>Backend: Improved content
    end
    
    Backend->>DB: Create experience record<br/>(status: draft)
    DB-->>Backend: Experience ID
    
    Backend-->>Frontend: 201 Created<br/>{experienceId, preview}
    Frontend-->>Host: Show preview screen<br/>with edit options
    
    Note over Host,DB: Host Review & Publish
    Host->>Frontend: Review generated content
    
    alt Host requests changes
        Host->>Frontend: Request regeneration<br/>with additional context
        Frontend->>Backend: POST /experiences/:id/regenerate<br/>(additional_context)
        Note over Backend,GeminiAPI: Repeat AI generation<br/>with new context
    else Host approves
        Host->>Frontend: Confirm & publish
        Frontend->>Backend: PATCH /experiences/:id/publish
        Backend->>DB: Update status: published
        DB-->>Backend: Updated
        Backend-->>Frontend: 200 OK
        Frontend-->>Host: Experience published!<br/>Now discoverable by users
    end`
            }
        ],


        mobileDesigns: [
            '/moodlyProject/mobileImages/IMG-20251123-WA0013.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0016.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0017.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0018.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0019.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0020.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0021.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0022.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0023.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0024.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0025.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0026.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0027.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0028.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0029.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0030.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0031.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0032.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0033.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0034.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0035.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0036.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0037.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0038.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0039.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0040.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0041.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0042.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0043.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0044.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0045.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0046.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0047.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0048.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0049.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0050.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0051.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0052.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0053.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0054.jpg',
            '/moodlyProject/mobileImages/IMG-20251123-WA0055.jpg'
        ],

        platforms: ['mobile'],
        apk: '/downloads/moodly-v1.0.apk',
        apkSize: 52,

        highlights: [
            'Asynchronous mood processing reducing perceived wait time from 4-8s to under 1s (87.5% improvement)',
            'Pre-computed recommendation mappings reducing latency from 3.2s to 380ms (88% improvement)',
            'Multi-stage prompt engineering improving experience listing quality from 6.2/10 to 8.7/10',
            'Error boundary system and automated debugging eliminating undefined crashes (70% debugging efficiency gain)',
            'Audio format conversion pipeline ensuring 100% backend compatibility (45% to 0.2% error rate)',
            'Memory optimization reducing peak usage from 1.2GB to 850MB with 99.9% uptime',
            'Screen focus data refresh reducing support tickets by 45% with always-current data',
            'Multimodal emotion detection combining facial recognition and voice sentiment for 85%+ accuracy'
        ],

        metrics: [
            { label: 'Mood Detection Speed', value: '<1s' },
            { label: 'Recommendation Latency', value: '380ms' },
            { label: 'Listing Quality Score', value: '8.7/10' },
            { label: 'System Uptime', value: '99.9%' },
            { label: 'Emotion Detection Accuracy', value: '85%+' },
            { label: 'Support Ticket Reduction', value: '45%' },
            { label: 'Booking Conversion Increase', value: '52%' },
            { label: 'User Retention Improvement', value: '34%' }
        ],

        results: 'Engineered an emotionally intelligent experience discovery platform that fundamentally transforms how users find activities aligned with their mental and emotional state. Achieved 88% reduction in recommendation latency through strategic pre-computation and Redis caching, while maintaining high recommendation quality using advanced semantic similarity matching. Implemented robust asynchronous processing architecture using RabbitMQ and Bull, reducing perceived mood detection time by 87.5% and allowing users to continue browsing during AI inference. Advanced multi-stage prompt engineering improved experience listing quality by 40% (6.2/10 to 8.7/10), directly contributing to 52% increase in booking conversion rates. Resolved critical production issues including OutOfMemoryError through systematic memory profiling and optimization, achieving 99.9% system uptime. Built comprehensive error handling and debugging infrastructure eliminating undefined crashes and improving debugging efficiency by 70%. The platform successfully addresses key pain points in traditional experience discovery: lack of emotional intelligence, tedious listing creation, and poor personalization, while enabling users to track mood patterns and understand which activities genuinely improve their well-being over time.',

        demo: 'https://appetize.io/app/b_jy4luvflr2e72c53yqdcpewubu',
        live: 'https://appetize.io/app/b_jy4luvflr2e72c53yqdcpewubu',
        github: 'https://github.com/yourusername/moodly',
        hero: '/moodlyProject/hero/moodly-hero.png?v=20260625'
    },
    {
        slug: 'cunocovo',
        title: 'Cunocovo, Social Platform for Creative Professionals',
        short: 'Connecting photographers, videographers, and creative professionals through a production-grade social platform',
        overview: 'Cunocovo is a production social networking platform built specifically for photographers, videographers, and creative professionals. The platform enables creatives to share their work, engage with a community of like-minded professionals, discover talent, and build their professional presence. Unlike generic social platforms, Cunocovo is purpose-built for visual creatives with features including content moderation, a reporting system with popularity-based ranking, real-time interactions, and a full admin moderation infrastructure. The platform was built and maintained across a full production lifecycle including AWS deployment, migration to Fly.io, and ongoing feature development serving real users daily.',

        problem: 'Creative professionals lack a dedicated space that understands their workflow and content needs. Generic platforms like Instagram and LinkedIn are either too casual or too corporate. Photographers and videographers need a platform where their work is the primary signal, where they can engage with a community that understands their craft, and where content quality is maintained through thoughtful moderation. Existing platforms have no concept of experience-level filtering, no content moderation infrastructure that scales without engineering involvement, and no tooling for platform administrators to manage reported content, user approvals, and moderation queues efficiently. Additionally, the onboarding experience on generic platforms creates significant friction for new creative professionals trying to establish their presence.',

        solution: 'Cunocovo provides a purpose-built social platform for creative professionals with a full stack Next.js and Node.js architecture. The platform features a content feed optimised for visual work, a JWT and OAuth-based authentication system, a complete content moderation pipeline with reported posts and comments, an admin panel for user approval workflows and moderation queues, real-time interactions via WebSockets, and a production infrastructure that was migrated from AWS EC2 to Fly.io with zero downtime. The backend is built with Node.js and Express.js with Supabase and PostgreSQL as the primary data layer using Drizzle ORM for type-safe queries.',

        projectGoals: [
            'Build a production-grade social platform serving real creative professionals with reliable uptime',
            'Implement a complete content moderation system reducing spam and low-quality content without manual engineering intervention',
            'Achieve sub-second feed loading through database optimisation and caching',
            'Build a full admin infrastructure enabling non-technical team members to manage users, content, and reports',
            'Migrate from AWS EC2 to Fly.io with zero downtime and no user-facing disruption',
            'Implement real-time features including notifications and live interactions using WebSockets',
            'Establish JWT and Google OAuth authentication with secure session management',
            'Maintain platform reliability and data consistency under concurrent user load'
        ],

        features: [
            'Content Feed: Optimised social feed for visual content with popularity ranking, real-time interactions, and infinite scroll',
            'Authentication: JWT-based authentication with automatic token refresh and Google OAuth 2.0 social login',
            'Content Moderation: Reported Posts and Comments systems with popularity ranking thresholds and duplicate-report prevention',
            'Admin Panel: Full moderation dashboard with user approval workflows, content queues, and search',
            'Real-Time Interactions: WebSocket-powered live notifications, comment updates, and interaction events',
            'Notification System: Transaction-backed notification delivery with duplication prevention and lifecycle management',
            'Rate Limiting: IP-based rate limiting across authentication and high-frequency post endpoints',
            'Cross-Platform Rendering: Consistent UI across Android, iOS, and Safari with resolved scroll lag and input handling',
            'Email Infrastructure: Transactional email system migrated to Plunk with delivery observability',
            'Referral System: Admin bypass referral codes with configurable usage limits'
        ],

        individualContributions: [
            'Optimised feed API from 3 seconds to 700ms by diagnosing bottlenecks across query structure, missing composite indexes on read-heavy columns, unused DTO fields, and cache absence, then fixing each layer independently',
            'Built Reported Posts and Comments systems end to end including PostgreSQL schema design, REST APIs with popularity ranking logic, admin moderation UI, and duplicate-report prevention with accurate count validation',
            'Fixed a notification duplication bug caused by non-transactional concurrent writes by replacing non-atomic query patterns with proper database transactions, restoring data consistency under concurrent load',
            'Resolved cross-platform rendering failures on Android, iOS, and Safari by tracing client-side execution bottlenecks causing scroll lag and input handling failures using passive event listeners and Intersection Observer',
            'Led zero-downtime infrastructure migration from AWS EC2 to Fly.io covering Docker configuration, DNS cutover, Supabase production environment, email provider migration to Plunk, and environment variable management',
            'Built full admin panel with user approval workflows, reported content moderation queues, search and filter functionality across approved, pending, and rejected states',
            'Implemented IP-based rate limiting across all authentication endpoints and high-frequency post APIs to prevent abuse',
            'Refactored 3000+ line monolithic React and Next.js components into modular architecture with custom hooks for validation and state management, reducing component coupling across the frontend codebase',
            'Fixed notification deletion lifecycle so notifications are correctly removed when parent comments are deleted',
            'Migrated email infrastructure to Plunk with structured delivery observability and transactional email reliability'
        ],

        architectureDetails: [
            {
                layer: 'Client Application',
                technology: 'Next.js 14 (App Router)',
                purpose: 'User-facing web interface for feed, profiles, content creation, and real-time interactions'
            },
            {
                layer: 'Admin Panel',
                technology: 'Next.js (admin panel)',
                purpose: 'Separate admin interface for user approval, content moderation, and platform management'
            },
            {
                layer: 'API Layer',
                technology: 'Node.js + Express.js',
                purpose: 'Primary REST API handling all business logic, authentication, and data access'
            },
            {
                layer: 'Authentication',
                technology: 'JWT + Google OAuth 2.0',
                purpose: 'Session management, token refresh, and social login via Google'
            },
            {
                layer: 'ORM and Query Layer',
                technology: 'Drizzle ORM',
                purpose: 'Type-safe PostgreSQL queries with schema-first database management'
            },
            {
                layer: 'Database',
                technology: 'Supabase + PostgreSQL',
                purpose: 'Primary relational data store for users, posts, notifications, and moderation data'
            },
            {
                layer: 'Real-Time Layer',
                technology: 'WebSockets',
                purpose: 'Live notifications, comment updates, and real-time interaction events'
            },
            {
                layer: 'Email Service',
                technology: 'Plunk (migrated from Nodemailer)',
                purpose: 'Transactional emails for account verification, notifications, and platform communications'
            },
            {
                layer: 'Infrastructure (v1)',
                technology: 'AWS EC2',
                purpose: 'Initial production deployment of backend API services'
            },
            {
                layer: 'Infrastructure (v2)',
                technology: 'Fly.io + Docker',
                purpose: 'Production infrastructure after zero-downtime migration, containerised deployment'
            },
            {
                layer: 'CI/CD',
                technology: 'GitHub Actions',
                purpose: 'Automated build, test, and deployment pipelines'
            },
            {
                layer: 'DNS and Domains',
                technology: 'Custom DNS configuration',
                purpose: 'Public platform and admin panel routing to their respective services'
            }
        ],

        challenges: [
            {
                title: 'Feed API Loading 3 Seconds on Production',
                description: 'The content feed was taking 3 seconds to load on production, causing users to abandon before content appeared. The issue was invisible in local development where the dataset was small and no network latency existed between the application and database.',
                solution: 'Diagnosed the bottleneck in four layers. First, the PostgreSQL query was filtering by user_id and ordering by created_at without a composite index, forcing a full table scan on every request. Second, the SELECT query was fetching 15 columns but the frontend only consumed 6, adding unnecessary serialisation overhead. Third, there was no caching so every user hitting the feed triggered a fresh database query. Added a composite index on (user_id, created_at DESC), removed 9 unused columns from the DTO, optimised the query structure, and added a 5-minute TTL in-memory cache keyed by user_id. Feed loading dropped from 3 seconds to 700ms, a 77 percent reduction.'
            },
            {
                title: 'Notification Duplication Under Concurrent Load',
                description: 'Users were receiving duplicate notifications for the same events, particularly on likes and comments. The duplication was intermittent and only appeared under concurrent load, making it difficult to reproduce in development and almost impossible to trace from logs alone.',
                solution: 'Traced the root cause to non-transactional write patterns. Two concurrent requests checking whether a notification existed and then creating it would both pass the existence check before either had written to the database, resulting in two notifications being created for the same event. Fixed by wrapping the check and create operations in a proper database transaction with a unique constraint on the notification table for the event type and source combination. This made the operation atomic and eliminated the race condition entirely.'
            },
            {
                title: 'Zero-Downtime Migration from AWS EC2 to Fly.io',
                description: 'The platform needed to migrate from AWS EC2 to Fly.io to reduce operational overhead and costs. The challenge was that real users were actively using the platform and any downtime would be immediately visible. The migration involved DNS changes, environment variables, Supabase connection strings, Docker configuration, and email provider cutover, all of which had to happen in the correct sequence.',
                solution: 'Planned the migration in phases. First built and tested the Docker configuration locally confirming the application ran correctly in the container. Then deployed to Fly.io with a temporary subdomain, ran smoke tests against the production database connection, and confirmed all services were functioning. Then cut over DNS from AWS EC2 to Fly.io while keeping the EC2 instance running as a fallback. Simultaneously migrated the email provider from Nodemailer to Plunk. DNS TTL had been lowered 24 hours before to speed up propagation. The full migration completed with no user-facing downtime and the EC2 instance was decommissioned once DNS had fully propagated globally.'
            },
            {
                title: 'Content Moderation at Scale Without Engineering Bottleneck',
                description: 'As the platform grew, spam posts and low-quality content were being reported by users but there was no system to handle these reports. Admins had to contact engineering to manually remove content, creating a bottleneck that caused reported content to stay visible for days.',
                solution: 'Built the Reported Posts and Reported Comments systems end to end. Designed the PostgreSQL schema to track reports with a unique constraint per user per post to prevent spam reporting. Built REST APIs that implemented a popularity ranking threshold so posts with enough reports relative to their engagement dropped out of the popular feed automatically without admin intervention. Built the admin moderation UI with a moderation queue, one-click approve and remove actions, and search across reported content. The entire moderation workflow from report to resolution now runs without engineering involvement.'
            },
            {
                title: 'Cross-Platform Rendering Failures on Mobile and Safari',
                description: 'Users on Android, iPhone, and Safari were reporting that the feed scrolled choppily, buttons were slow to respond, and input fields sometimes did not register taps. Desktop Chrome worked perfectly, making the issue difficult to reproduce in development.',
                solution: 'Opened Safari and Chrome mobile developer tools and profiled the main thread during scroll. Found that scroll event handlers were running synchronously on every scroll event, blocking the main thread. Added passive: true to scroll event listeners which tells the browser to scroll immediately without waiting for JavaScript. Added requestAnimationFrame wrapping for expensive scroll logic to defer it to the next paint cycle. For iOS Safari tap failures, traced the issue to custom button components built as div elements which iOS Safari does not treat as natively tappable. Switched to button elements. For image loading jank, implemented Intersection Observer to defer image loading until elements entered the viewport, eliminating getBoundingClientRect calls on every scroll event.'
            },
            {
                title: '2-Second Comment Button Latency',
                description: 'Users experienced a 2-second delay between clicking the comment button and seeing the comment count update. The delay was consistent and reproducible, making the comment interaction feel broken.',
                solution: 'Traced the frontend click handler and found it was making an API call to pre-fetch the comment count before opening the comment sheet, even though the comment count was already available in the current post state. The API call added 1.8 to 2 seconds of latency before the comment sheet opened. Removed the redundant pre-check entirely. The comment count was already in the component state from the feed fetch. Comment button response time dropped to 0ms with zero regression on comment state accuracy.'
            }
        ],

        techStack: {
            frontend: [
                'Next.js 14 (App Router)',
                'React',
                'TypeScript',
                'Tailwind CSS',
                'Shadcn UI',
                'React Hooks',
                'Custom Hooks',
                'React Context',
                'WebSockets (client)',
                'Intersection Observer API',
                'Passive Event Listeners'
            ],
            backend: [
                'Node.js',
                'Express.js',
                'TypeScript',
                'Drizzle ORM',
                'PostgreSQL',
                'Supabase',
                'JWT (jsonwebtoken)',
                'Google OAuth 2.0',
                'WebSockets',
                'Plunk (email)',
                'Rate Limiting',
                'IP-based throttling'
            ],
            infrastructure: [
                'Docker',
                'Fly.io',
                'AWS EC2 (previous)',
                'GitHub Actions',
                'Custom DNS',
                'CI/CD Pipelines'
            ]
        },

        tech: [
            'Next.js',
            'Node.js',
            'Express.js',
            'TypeScript',
            'Supabase',
            'PostgreSQL',
            'Drizzle ORM',
            'JWT',
            'Google OAuth',
            'WebSockets',
            'Docker',
            'Fly.io',
            'GitHub Actions'
        ],

        mermaidDiagrams: [
            {
                title: 'Post Report and Moderation Flow',
                type: 'sequence',
                code: `sequenceDiagram
    actor User
    participant Frontend as Next.js Frontend
    participant API as Node.js API
    participant DB as Supabase PostgreSQL
    participant Admin as Admin Panel

    Note over User,Admin: Phase 1: User Reports Content
    User->>Frontend: Clicks report on post or comment
    Frontend->>API: POST /reports/post/:postId
    API->>DB: Check if user already reported this post
    
    alt Already reported
        DB-->>API: Existing report found
        API-->>Frontend: 409 Already reported
        Frontend-->>User: Show already reported message
    else First report
        DB-->>API: No existing report
        API->>DB: Insert report record
        API->>DB: Increment post report count
        DB-->>API: Updated report count
        API->>DB: Check report count vs popularity threshold
        
        alt Report count exceeds threshold
            API->>DB: Remove post from popular feed
            DB-->>API: Feed updated
        end
        
        API-->>Frontend: 201 Report submitted
        Frontend-->>User: Show confirmation
    end

    Note over User,Admin: Phase 2: Admin Reviews Reports
    Admin->>Admin: Opens admin panel
    Admin->>API: GET /admin/reports?status=pending
    API->>DB: Query reported posts with report counts
    DB-->>API: Reported posts list
    API-->>Admin: Moderation queue

    Admin->>Admin: Reviews reported content
    
    alt Admin removes post
        Admin->>API: DELETE /admin/posts/:postId
        API->>DB: Delete post and associated reports
        API->>DB: Delete related notifications
        DB-->>API: Deleted
        API-->>Admin: Post removed
    else Admin dismisses report
        Admin->>API: PATCH /admin/reports/:reportId/dismiss
        API->>DB: Update report status to dismissed
        API->>DB: Restore post to feed if removed
        DB-->>API: Updated
        API-->>Admin: Report dismissed
    end`
            },
            {
                title: 'System Architecture Overview',
                type: 'flowchart',
                code: `graph TB
    subgraph Clients["Client Layer"]
        Web["Next.js Web App\n(cunocovo.com)"]
        AdminPanel["Next.js Admin Panel"]
    end

    subgraph APILayer["API Layer"]
        ExpressAPI["Node.js + Express.js\nREST API"]
    end

    subgraph Auth["Authentication"]
        JWT["JWT Token Validation"]
        GoogleOAuth["Google OAuth 2.0"]
    end

    subgraph RealTime["Real-Time Layer"]
        WSServer["WebSocket Server\nLive Notifications"]
    end

    subgraph DataLayer["Data Layer"]
        DrizzleORM["Drizzle ORM\nType-safe queries"]
        Supabase[("Supabase\nPostgreSQL")]
    end

    subgraph EmailLayer["Email Layer"]
        Plunk["Plunk\nTransactional Email"]
    end

    subgraph Infra["Infrastructure"]
        Docker["Docker\nContainerisation"]
        FlyIO["Fly.io\nProduction Hosting"]
        GHActions["GitHub Actions\nCI/CD Pipelines"]
        AWSEC2["AWS EC2\n(Previous)"]
    end

    Web -->|HTTPS REST| ExpressAPI
    AdminPanel -->|HTTPS REST| ExpressAPI

    ExpressAPI --> JWT
    ExpressAPI --> GoogleOAuth
    JWT -->|Validate| ExpressAPI
    GoogleOAuth -->|Token Exchange| ExpressAPI

    ExpressAPI --> DrizzleORM
    DrizzleORM --> Supabase

    Web <-->|WebSocket| WSServer
    WSServer --> ExpressAPI

    ExpressAPI --> Plunk

    ExpressAPI --> Docker
    Docker --> FlyIO
    GHActions --> Docker
    AWSEC2 -.->|Migrated to| FlyIO

    style Clients fill:#e1f5ff
    style APILayer fill:#f0f9ff
    style Auth fill:#fce7f3
    style RealTime fill:#fef3c7
    style DataLayer fill:#d1fae5
    style EmailLayer fill:#f3e8ff
    style Infra fill:#dbeafe`
            }
        ],

        webDesigns: [
            '/cunocovoProject/hero/hero.png?v=20260625',
            '/cunocovoProject/signUp.png',
            '/cunocovoProject/signUp-Validation.png',
            '/cunocovoProject/postCreate.png',
            '/cunocovoProject/about.png',
            '/cunocovoProject/alertDialog.png',
            '/cunocovoProject/emailSend.png'
        ],

        highlights: [
            'Feed API optimised from 3 seconds to 700ms through composite indexing, DTO cleanup, query optimisation, and in-memory caching',
            'Comment button latency eliminated from 2 seconds to 0ms by removing a redundant API pre-check',
            'Zero-downtime migration from AWS EC2 to Fly.io with full DNS cutover, Docker containerisation, and email provider migration',
            'Notification duplication bug eliminated through database transaction wrapping of previously non-atomic concurrent writes',
            'Cross-platform rendering fixed on Android, iOS, and Safari using passive event listeners and Intersection Observer',
            'Complete content moderation system built end to end removing engineering bottleneck from report to resolution',
            'Admin panel built at dedicated subdomain enabling non-technical moderation of users, posts, and comments',
            'IP-based rate limiting implemented across all authentication and high-frequency endpoints'
        ],

        metrics: [
            { label: 'Feed Load Time', value: '700ms' },
            { label: 'Feed Improvement', value: '77%' },
            { label: 'Comment Latency', value: '0ms' },
            { label: 'Migration Downtime', value: '0' },
            { label: 'Notification Duplication', value: 'Eliminated' },
            { label: 'Cross-Platform Issues', value: 'Resolved' },
            { label: 'Moderation Without Eng', value: '100%' },
            { label: 'Rate Limited Endpoints', value: 'All auth' }
        ],

        results: 'Built and maintained a production social platform serving real creative professionals with consistent reliability. Reduced feed loading from 3 seconds to 700ms through systematic multi-layer optimisation. Eliminated a 2-second comment button latency by identifying and removing a redundant API call. Fixed a notification duplication race condition through proper database transaction design. Resolved cross-platform rendering failures on Android, iOS, and Safari affecting scroll behaviour and tap interactions. Led a complete zero-downtime infrastructure migration from AWS EC2 to Fly.io. Built a full content moderation system that removed engineering from the report-to-resolution workflow. The platform operates with reliable uptime serving a community of photographers, videographers, and creative professionals.',

        platforms: ['web'],
        live: 'https://cc-prod-user.fly.dev/',
        hero: '/cunocovoProject/hero/hero.png?v=20260625'
    }

]