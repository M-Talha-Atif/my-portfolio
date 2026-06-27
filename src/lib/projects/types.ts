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
    demoLinks?: Partial<Record<'web' | 'mobile', string>>,
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