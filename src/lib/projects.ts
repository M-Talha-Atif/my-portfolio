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
    webDesigns?: string[],
    mobileDesigns?: string[],
    apk?: string,
    apkSize?: number,
     platforms?: ('web' | 'mobile')[], 
    results?: string,
    demo?: string,   // Loom or YouTube link
    live?: string,
    github?: string,
    hero?: string,
}


export const projects: Project[] = [
    {
        slug: 'memingo',
        title: 'Memingo — Language Learning Platform',
        short: 'AI-powered language learning with spaced repetition',
        overview: 'A comprehensive language learning platform that uses AI and spaced repetition algorithms to help users master new languages through interactive exercises, real-time pronunciation feedback, and personalized learning paths.',
        problem: 'Traditional language learning apps lack personalized adaptation and fail to provide immediate feedback on pronunciation, making it difficult for learners to progress efficiently.',
        solution: 'An AI-driven platform that adapts to each user\'s learning pace, provides real-time pronunciation analysis, and uses scientifically-backed spaced repetition to maximize retention.',
        features: [
            'AI-powered pronunciation feedback',
            'Interactive vocabulary exercises',
            'AR Learning Game',
            'Progress tracking dashboard',
            'Multi-language support'
        ],
        tech: ['React.js', 'Node.js', 'MongoDB', 'Redis', 'Tailwind', 'TensorFlow.js', 'Web Speech API', 'Jetpack Compose'],
        // diagrams: ['/images/diagrams/memingo-arch.svg', '/images/diagrams/memingo-flow.svg'],
        webDesigns: [
            '/memingoProject/webImages/AR_Expereinces.png',
            '/memingoProject/webImages/AR_Game.png',
            '/memingoProject/webImages/Analytics.png',
            '/memingoProject/webImages/Courses_Selection.png',
            '/memingoProject/webImages/Landing_Page.png',
            '/memingoProject/webImages/Leader_Board.png',
            '/memingoProject/webImages/Lesson_Progress.png',
            '/memingoProject/webImages/Lesson_Screen.png',
            '/memingoProject/webImages/Memingo_MockUp.png'
        ],
        mobileDesigns: [
            '/memingoProject/mobileImages/Listen_exercise.jpg',
            '/memingoProject/mobileImages/Speak_exercise.jpg',
            '/memingoProject/mobileImages/arrange_exercise.jpg',
            '/memingoProject/mobileImages/chatBot.jpg',
            '/memingoProject/mobileImages/chatBot2.jpg',
            '/memingoProject/mobileImages/complete_Senctence.jpg',
            '/memingoProject/mobileImages/complete_sentence.jpg',
            '/memingoProject/mobileImages/coursesSelection.jpg',
            '/memingoProject/mobileImages/hero.png',
            '/memingoProject/mobileImages/home.jpg',
            '/memingoProject/mobileImages/leaderBoard.jpg',
            '/memingoProject/mobileImages/lessonAttempt1.jpg',
            '/memingoProject/mobileImages/loader.jpg',
            '/memingoProject/mobileImages/login.jpg',
            '/memingoProject/mobileImages/matching_words.jpg',
            '/memingoProject/mobileImages/mcqsExercise.jpg',
            '/memingoProject/mobileImages/mcqs_exercise.jpg',
            '/memingoProject/mobileImages/profile.jpg',
            '/memingoProject/mobileImages/sentences_vocab.jpg',
            '/memingoProject/mobileImages/splashScreen.jpg',
            '/memingoProject/mobileImages/tips_vocab.jpg',
            '/memingoProject/mobileImages/typing_sentence_exercise.jpg',
            '/memingoProject/mobileImages/vocabDetection.jpg',
            '/memingoProject/mobileImages/vocabLearning (2).jpg',
            '/memingoProject/mobileImages/vocabLearning.jpg'
        ],
        platforms: ['web', 'mobile'],
        apk: '/downloads/memingo-v1.0.apk',
        apkSize: 45,
        results:
            'Implemented leaderboard response caching to reduce API latency, integrated OTP-based email signup to prevent bot accounts, and added AI-powered object detection for rapid vocabulary recognition. Resulted in 3× faster vocabulary retention and 89% user satisfaction with pronunciation feedback accuracy.',

        demo: 'https://www.loom.com/share/932ba5037d364dde88049686bd45c0d3',
        live: 'https://memingo-frontend-sooty.vercel.app/',
        github: 'https://github.com/M-Talha-Atif/Memingo-Full-Stack-FYP',
        hero: '/memingoProject/hero/heroMemingo.png'
    },
    {
        slug: 'leeds-dashboard',
        title: 'Leeds Financial Dashboard — Internal Data Management',
        short: 'Advanced financial modeling and scenario analysis platform',
        overview: 'A comprehensive internal financial dashboard built for Leeds to manage complex cost-benefit analysis, scenario modeling, and investment decision-making. The platform enables real-time financial simulations with advanced filtering, D-Sell cost adjustments, and multi-dimensional data visualization.',
        problem: 'Financial teams at Leeds struggled with scattered Excel models, inconsistent cost calculations, and inability to quickly simulate different investment scenarios for LEED projects. Manual data processing led to errors and slow decision-making.',
        solution: 'A centralized web application that automates financial modeling, provides real-time scenario comparisons, and offers intuitive visualizations for Capex/Opex analysis, value premium calculations, and investment positioning.',
        features: [
            'Real-time financial scenario modeling',
            'Advanced filtering by category, ownership, and tiers',
            'D-Sell cost adjustment simulations',
            'Interactive waterfall charts and data visualizations',
            'Cost view toggling (percentage vs absolute values)',
            'Bulk credit selection with keyboard shortcuts',
            'Commercial insights and investment verdicts',
            'Comprehensive reporting and data export'
        ],
        tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Headless UI', 'Radix UI'],
        webDesigns: [
            '/leedsProject/webImages/dashboard.png',
            '/leedsProject/webImages/reports.png',
            '/leedsProject/webImages/summary.png',
        ],
        // diagrams: ['/images/diagrams/memingo-arch.svg', '/images/diagrams/memingo-flow.svg'],
        platforms: ['web'],
        results: 'Reduced financial analysis time by 85%, improved decision accuracy by 40%, and enabled real-time scenario modeling that previously took days. Teams can now evaluate 50+ financial credits simultaneously with instant ROI calculations.',
        demo: 'https://www.loom.com/share/1f4d2cc1caab4a00b2faf112d05a2968',
        live: 'https://leeds-dashboard.vercel.app/',
        github: 'https://github.com/M-Talha-Atif/leeds-dashboard',
        hero: '/leedsProject/hero/heroLeeds.png'
    }

]