'use client'
import { useEffect, useId, useRef } from 'react'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
    code: string
    title?: string
}

export default function MermaidDiagram({ code, title }: MermaidDiagramProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const diagramId = `mermaid-${useId().replace(/:/g, '')}`

    useEffect(() => {
        // Initialize mermaid with dark theme configuration
        mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            themeVariables: {
                primaryColor: '#818cf8',
                primaryTextColor: '#e5e7eb',
                primaryBorderColor: '#4f46e5',
                lineColor: '#6366f1',
                secondaryColor: '#a78bfa',
                tertiaryColor: '#c4b5fd',
                background: '#1a1a1a',
                mainBkg: '#262626',
                secondBkg: '#1f1f1f',
                border1: '#404040',
                border2: '#525252',
                arrowheadColor: '#818cf8',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                fontSize: '14px',
                nodeBorder: '#4f46e5',
                clusterBkg: '#1f1f1f',
                clusterBorder: '#404040',
                defaultLinkColor: '#6366f1',
                titleColor: '#e5e7eb',
                edgeLabelBackground: '#262626',
                actorBorder: '#4f46e5',
                actorBkg: '#262626',
                actorTextColor: '#e5e7eb',
                actorLineColor: '#6366f1',
                signalColor: '#e5e7eb',
                signalTextColor: '#e5e7eb',
                labelBoxBkgColor: '#262626',
                labelBoxBorderColor: '#404040',
                labelTextColor: '#e5e7eb',
                loopTextColor: '#e5e7eb',
                noteBorderColor: '#4f46e5',
                noteBkgColor: '#1f1f1f',
                noteTextColor: '#e5e7eb',
                activationBorderColor: '#4f46e5',
                activationBkgColor: '#262626',
                sequenceNumberColor: '#e5e7eb'
            },
            securityLevel: 'loose',
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
                curve: 'basis'
            },
            sequence: {
                useMaxWidth: true,
                mirrorActors: true,
                messageFontSize: 14,
                messageFontWeight: 400,
                wrap: true,
                wrapPadding: 10
            }
        })

        const renderDiagram = async () => {
            if (containerRef.current) {
                try {
                    // Clear previous content
                    containerRef.current.innerHTML = ''
                    
                    // Render the diagram
                    const { svg } = await mermaid.render(diagramId, code)
                    containerRef.current.innerHTML = svg
                    
                    // Apply additional styling to SVG
                    const svgElement = containerRef.current.querySelector('svg')
                    if (svgElement) {
                        svgElement.style.maxWidth = '100%'
                        svgElement.style.height = 'auto'
                    }
                } catch (error) {
                    console.error('Error rendering mermaid diagram:', error)
                    containerRef.current.innerHTML = `
                        <div class="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300">
                            <p class="font-medium mb-1">Failed to render diagram</p>
                            <p class="text-sm">Please check the diagram syntax</p>
                        </div>
                    `
                }
            }
        }

        renderDiagram()
    }, [code, diagramId])

    return (
        <div className="mermaid-container">
            {title && (
                <h4 className="text-sm font-medium text-white mb-3">{title}</h4>
            )}
            <div 
                ref={containerRef} 
                className="mermaid-diagram rounded-lg bg-[rgba(0,0,0,0.3)] p-6 overflow-x-auto"
            />
        </div>
    )
}