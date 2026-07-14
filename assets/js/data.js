/* Site content — single source of truth for repeatable sections */
window.SITE_DATA = {
    expertise: [
        {
            icon: 'smartphone',
            title: 'iOS Product Development',
            text: 'Building native iOS features and applications with Swift, SwiftUI, and UIKit, from implementation through production release.'
        },
        {
            icon: 'code',
            title: 'Architecture & Refactoring',
            text: 'Improving code structure, clarifying responsibilities, and making products easier to maintain and extend.'
        },
        {
            icon: 'link',
            title: 'API & Service Integration',
            text: 'Integrating REST APIs, authentication, analytics, push notifications, Firebase, and external SDKs.'
        },
        {
            icon: 'zap',
            title: 'Performance & Stability',
            text: 'Investigating bottlenecks, reducing unnecessary work, improving startup time, and making application behavior more predictable.'
        },
        {
            icon: 'rocket',
            title: 'CI/CD & App Store Delivery',
            text: 'Preparing repeatable build pipelines, TestFlight distributions, multiple environments, and App Store releases.'
        },
        {
            icon: 'users',
            title: 'Existing Product Development',
            text: 'Joining established teams, understanding existing codebases, and delivering new functionality without destabilizing the product.'
        }
    ],
    tech: [
        {
            title: 'iOS Foundations',
            items: ['Swift', 'SwiftUI', 'UIKit', 'Combine', 'Swift Concurrency', 'GCD', 'Core Data', 'StoreKit']
        },
        {
            title: 'Architecture',
            items: ['MVVM', 'TCA', 'Clean Architecture', 'SOLID', 'Dependency Injection', 'Modularization', 'Design Patterns']
        },
        {
            title: 'Data & Integrations',
            items: ['REST API', 'GraphQL', 'Firebase', 'Supabase', 'Auth0', 'Push Notifications', 'Analytics']
        },
        {
            title: 'Quality & Performance',
            items: ['XCTest', 'Unit Testing', 'UI Testing', 'Instruments', 'Performance Optimization', 'Memory Profiling', 'Debugging']
        },
        {
            title: 'Delivery & Tools',
            items: ['Xcode', 'Git', 'CI/CD', 'TestFlight', 'App Store Connect', 'SwiftLint', 'Jira', 'Figma']
        }
    ],
    projects: [
        {
            title: 'Elite Prospects',
            desc: 'A white-label hockey platform delivered as 15 apps from one shared codebase, built around GraphQL data flows, CMS-driven UI, and Auth0 authentication.',
            image: 'assets/images/project8.png',
            alt: 'Elite Prospects Hockey Stats app screenshot',
            tags: ['SwiftUI', 'GraphQL', 'Auth0'],
            scope: 'Shared codebase, CMS-driven UI, multi-tenant architecture',
            url: 'https://apps.apple.com/app/id6737055644'
        },
        {
            title: 'Wallester',
            desc: 'A fintech app for business card and payment workflows, built with SwiftUI and TCA to support secure flows and scalable delivery.',
            image: 'assets/images/project9.png',
            alt: 'Wallester business app screenshot',
            tags: ['SwiftUI', 'TCA', 'Fintech'],
            scope: 'TCA architecture, secure payment flows, CI/CD',
            url: 'https://wallester.com/business'
        },
        {
            title: 'Braavos',
            desc: 'A self-custody crypto wallet for secure digital asset management, with an emphasis on native iOS clarity, trust, and safety.',
            image: 'assets/images/project7.png',
            alt: 'Braavos crypto wallet app screenshot',
            tags: ['SwiftUI', 'Web3', 'Security'],
            scope: 'Wallet flows, secure storage, App Store release',
            url: 'https://apps.apple.com/app/id1636013523'
        },
        {
            title: 'Sevensix',
            desc: 'An AI-powered iOS tennis app that turns structured training data into a polished coaching experience.',
            image: 'assets/images/project1.png',
            alt: 'Sevensix app screenshot',
            tags: ['Swift', 'UIKit', 'AI'],
            scope: 'AI integration, API-driven features, App Store release',
            url: 'https://apps.apple.com/app/id1505604446'
        },
        {
            title: 'Floor Planner',
            desc: 'An iOS floor planning tool for creating, editing, and visualizing interior layouts in 2D and real-time 3D.',
            image: 'assets/images/project4.png',
            alt: 'Floor Planner app screenshot',
            tags: ['SwiftUI', 'Canvas', 'SceneKit'],
            scope: '2D layout editor, Canvas drawing, 3D rendering',
            url: 'https://floorplanner.com'
        },
        {
            title: 'BURN',
            desc: 'A fitness product built around guided workouts and video training, taken from client idea through to store release.',
            image: 'assets/images/project2.png',
            alt: 'BURN fitness app screenshot',
            tags: ['SwiftUI', 'Video', 'Fitness'],
            scope: 'Product delivery, video playback UX, cross-platform collaboration',
            url: 'https://www.burnbyrebecca.com'
        },
        {
            title: 'Super VPN',
            desc: 'A VPN app centered on secure connectivity, subscriptions, and dependable onboarding.',
            image: 'assets/images/project5.png',
            alt: 'Super VPN app screenshot',
            tags: ['Swift', 'UIKit', 'StoreKit'],
            scope: 'Connection flows, subscriptions, stability',
            url: 'https://www.vpnsuper.com'
        },
        {
            title: 'Business Empire',
            desc: 'A business simulation game shaped around progression systems, monetization, and tap-driven engagement.',
            image: 'assets/images/project6.png',
            alt: 'Business Empire app screenshot',
            tags: ['Swift', 'UIKit', 'StoreKit'],
            scope: 'Game mechanics, StoreKit, release cycle',
            url: 'https://apps.apple.com/app/id6451208928'
        },
        {
            title: 'DriverPro',
            desc: 'A driving-test preparation app with structured study flows, progress tracking, and synced learning data.',
            image: 'assets/images/project3.png',
            alt: 'DriverPro app screenshot',
            tags: ['SwiftUI', 'SwiftData', 'Supabase'],
            scope: 'Learning flows, local persistence, sync architecture',
            url: 'https://www.ayvens.com/cs-cz/mobilni-aplikace/'
        }
    ],
    focus: [
        'Multiple iOS app configurations',
        'White-label architecture',
        'Environment-based configurations',
        'API-driven content',
        'Authentication and analytics',
        'TestFlight and release workflows',
        'Distributed team collaboration',
        'Production application support'
    ],
    articles: [
        {
            title: 'Security in Swift',
            category: 'Security',
            desc: 'A guide to building safer iOS apps with modern Swift security patterns and production-minded practices.',
            image: 'assets/images/public4.png',
            alt: 'Security in Swift article cover',
            url: 'https://medium.com/@mustafos/security-in-swift-a-practical-guide-for-ios-developers-2025-a763e3efde48'
        },
        {
            title: 'The Coffee Shop Problem',
            category: 'Caching',
            desc: 'A practical look at caching strategy in iOS — how data is stored, refreshed, and served when the network is slow or unavailable.',
            image: 'assets/images/public5.png',
            alt: 'The Coffee Shop Problem article cover',
            url: 'https://www.linkedin.com/pulse/coffee-shop-problem-why-caching-defines-user-mustafa-bekirov-ptaje'
        },
        {
            title: 'Fixing Memory Leaks in a SwiftUI App',
            category: 'Memory & ARC',
            desc: 'Finding and fixing ARC-related memory leaks in SwiftUI — retain cycles, strong references, and debugging with Instruments.',
            image: 'assets/images/public6.png',
            alt: 'Fixing Memory Leaks in a SwiftUI App article cover',
            url: 'https://www.linkedin.com/pulse/fixing-memory-leaks-swiftui-app-mustafa-bekirov-5k4le'
        },
        {
            title: 'How iOS Developers Can Use AI in Their Projects',
            category: 'AI & ML',
            desc: 'Integrating Core ML and LLMs into native iOS apps — practical patterns for adding on-device intelligence and smarter product features.',
            image: 'assets/images/public1.png',
            alt: 'How iOS Developers Can Use AI in Their Projects article cover',
            url: 'https://medium.com/@mustafos/ai-in-ios-7280407e5b9f'
        },
        {
            title: 'Generics in Swift',
            category: 'Swift Fundamentals',
            desc: 'Swift generics syntax and motivation — why generics exist, how they work, and how to use them cleanly in SwiftUI projects.',
            image: 'assets/images/public2.png',
            alt: 'Generics in Swift article cover',
            url: 'https://medium.com/@mustafos/tricky-generics-in-swift-mastering-complexity-in-swiftui-projects-4a4a3fc884a6'
        },
        {
            title: 'Swift Concurrency',
            category: 'Concurrency',
            desc: 'Using async/await in iOS applications for cleaner asynchronous code and more predictable execution.',
            image: 'assets/images/public3.png',
            alt: 'Swift Concurrency article cover',
            url: 'https://medium.com/@mustafos/swift-concurrency-leveraging-async-await-in-ios-applications-5784c3c2b1af'
        }
    ],
    process: [
        { step: '01', title: 'Understand', text: 'I clarify the product goal, technical context, constraints, and expected outcome.' },
        { step: '02', title: 'Plan', text: 'I break the work into a practical implementation plan and identify potential risks early.' },
        { step: '03', title: 'Build', text: 'I implement the solution, communicate progress, and verify important edge cases.' },
        { step: '04', title: 'Deliver', text: 'I prepare the feature for testing, release, and future maintenance.' }
    ],
    heroProfile: {
        title: 'Mustafa Bekirov',
        role: 'iOS Developer',
        text: 'I build and ship native iOS products for startups and product teams.',
        avatar: 'assets/images/avatar.png',
        tags: ['Swift', 'SwiftUI', 'UIKit']
    },
    heroFloats: [
        {
            icon: 'layout',
            label: 'SwiftUI',
            category: 'Interface',
            title: 'SwiftUI',
            text: 'Declarative UI for scalable, maintainable iOS products.'
        },
        {
            icon: 'code',
            label: 'Swift',
            category: 'Language',
            title: 'Swift',
            text: 'Modern Swift with concurrency and production-focused code.'
        },
        {
            icon: 'layers',
            label: 'Architecture',
            category: 'Structure',
            title: 'Architecture',
            text: 'Clear structure for products that need to grow over time.'
        },
        {
            icon: 'link',
            label: 'API Integration',
            category: 'Services',
            title: 'API Integration',
            text: 'Authentication, backend data flows, and third-party services.'
        },
        {
            icon: 'zap',
            label: 'Performance',
            category: 'Quality',
            title: 'Performance',
            text: 'Faster startup, lower overhead, and smoother interaction.'
        },
        {
            icon: 'shield',
            label: 'Security',
            category: 'Trust',
            title: 'Security',
            text: 'Safer mobile flows for fintech, crypto, and user data.'
        },
        {
            icon: 'sparkles',
            label: 'AI / LLM',
            category: 'Intelligence',
            title: 'AI / LLM',
            text: 'Integrating modern AI capabilities into native iOS products.'
        },
        {
            icon: 'rocket',
            label: 'CI/CD',
            category: 'Delivery',
            title: 'CI/CD',
            text: 'TestFlight, repeatable builds, and release-ready workflows.'
        }
    ]
};
