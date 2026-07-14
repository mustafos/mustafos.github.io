/* Site content — single source of truth for repeatable sections */
window.SITE_DATA = {
    expertise: [
        {
            icon: 'smartphone',
            title: 'iOS Product Development',
            text: 'Building native iOS features and applications with Swift, SwiftUI and UIKit, from initial implementation to production release.'
        },
        {
            icon: 'code',
            title: 'Architecture & Refactoring',
            text: 'Improving code structure, separating responsibilities and making existing applications easier to maintain and extend.'
        },
        {
            icon: 'link',
            title: 'API & Service Integration',
            text: 'Integrating REST APIs, authentication, analytics, push notifications, Firebase and external SDKs.'
        },
        {
            icon: 'zap',
            title: 'Performance & Stability',
            text: 'Investigating bottlenecks, reducing unnecessary work, improving startup time and making application behavior more predictable.'
        },
        {
            icon: 'rocket',
            title: 'CI/CD & App Store Delivery',
            text: 'Preparing repeatable build pipelines, TestFlight distributions, multiple environments and App Store releases.'
        },
        {
            icon: 'users',
            title: 'Existing Product Development',
            text: 'Joining established teams, understanding existing codebases and delivering new functionality without destabilizing the product.'
        }
    ],
    tech: [
        {
            title: 'iOS',
            items: ['Swift', 'SwiftUI', 'UIKit', 'Combine', 'Concurrency', 'Grand Central Dispatch', 'Core Data', 'StoreKit']
        },
        {
            title: 'Architecture',
            items: ['MVVM', 'Clean Architecture', 'SOLID', 'Dependency Injection', 'Design Patterns', 'Modularization']
        },
        {
            title: 'Networking and Services',
            items: ['REST API', 'Firebase', 'Alamofire', 'Push Notifications', 'Analytics']
        },
        {
            title: 'Engineering Tools',
            items: ['Xcode', 'Git', 'XCTest', 'SwiftLint', 'CI/CD', 'Jira', 'Figma']
        }
    ],
    projects: [
        {
            title: 'Elite Prospects',
            desc: 'A white-label hockey platform delivered as 15 apps from one shared codebase, combining GraphQL data flows, Strapi CMS, and Auth0 authentication in a scalable multi-tenant architecture.',
            image: 'assets/images/project8.png',
            alt: 'Elite Prospects Hockey Stats app screenshot',
            tags: ['SwiftUI', 'GraphQL', 'Auth0'],
            scope: 'Shared codebase, CMS-driven UI, multi-tenant architecture',
            url: 'https://apps.apple.com/app/id6737055644'
        },
        {
            title: 'Wallester',
            desc: 'A large-scale fintech app for business card and payment workflows, built with TCA to support secure feature delivery and scalable mobile architecture.',
            image: 'assets/images/project9.png',
            alt: 'Wallester business app screenshot',
            tags: ['SwiftUI', 'TCA', 'Fintech'],
            scope: 'TCA architecture, secure payment flows, CI/CD',
            url: 'https://wallester.com/business'
        },
        {
            title: 'Braavos',
            desc: 'A self-custody crypto wallet built for secure digital asset management and a native iOS experience that prioritizes trust, clarity, and safety.',
            image: 'assets/images/project7.png',
            alt: 'Braavos crypto wallet app screenshot',
            tags: ['SwiftUI', 'Web3', 'Security'],
            scope: 'Wallet flows, secure storage, App Store release',
            url: 'https://apps.apple.com/app/id1636013523'
        },
        {
            title: 'Sevensix',
            desc: 'An AI-powered native iOS tennis coach that turns structured training data into a polished mobile experience with intuitive user interactions.',
            image: 'assets/images/project1.png',
            alt: 'Sevensix app screenshot',
            tags: ['Swift', 'UIKit', 'AI'],
            scope: 'AI integration, API-driven features, App Store release',
            url: 'https://apps.apple.com/app/id1505604446'
        },
        {
            title: 'Floor Planner',
            desc: 'An iOS floor planning tool for creating, editing, and visualizing interior layouts with intuitive 2D drawing and real-time 3D previews.',
            image: 'assets/images/project4.png',
            alt: 'Floor Planner app screenshot',
            tags: ['SwiftUI', 'Canvas', 'SceneKit'],
            scope: '2D layout editor, Canvas drawing, 3D rendering',
            url: 'https://floorplanner.com'
        },
        {
            title: 'BURN',
            desc: 'A cross-platform fitness product built around guided workouts and video training, delivered from client idea through to store release.',
            image: 'assets/images/project2.png',
            alt: 'BURN fitness app screenshot',
            tags: ['SwiftUI', 'Video', 'Fitness'],
            scope: 'Product delivery, video playback UX, cross-platform collaboration',
            url: 'https://www.burnbyrebecca.com'
        },
        {
            title: 'Super VPN',
            desc: 'A VPN app focused on secure connectivity, subscription flows, and stable onboarding, with a deeper emphasis on networking and protocol behavior.',
            image: 'assets/images/project5.png',
            alt: 'Super VPN app screenshot',
            tags: ['Swift', 'UIKit', 'StoreKit'],
            scope: 'Connection flows, subscriptions, stability',
            url: 'https://www.vpnsuper.com'
        },
        {
            title: 'Business Empire',
            desc: 'A business simulation game built around progression, monetization, and tap-driven engagement loops.',
            image: 'assets/images/project6.png',
            alt: 'Business Empire app screenshot',
            tags: ['Swift', 'UIKit', 'StoreKit'],
            scope: 'Game mechanics, StoreKit, release cycle',
            url: 'https://apps.apple.com/app/id6451208928'
        },
        {
            title: 'DriverPro',
            desc: 'A learning app for driving-test preparation with structured study flows, progress tracking, and reliable synced data.',
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
        'Authentication & analytics',
        'TestFlight & release workflows',
        'Distributed team collaboration',
        'Production application support'
    ],
    articles: [
        {
            title: 'Security in Swift',
            category: 'Security',
            desc: 'A practical guide to building safer iOS apps with modern Swift security patterns and real-world considerations for production code.',
            image: 'assets/images/public4.png',
            alt: 'Security in Swift article cover',
            url: 'https://medium.com/@mustafos/security-in-swift-a-practical-guide-for-ios-developers-2025-a763e3efde48'
        },
        {
            title: 'The Coffee Shop Problem',
            category: 'Performance',
            desc: 'Why caching strategy defines user experience — and how thoughtful data handling shapes the way mobile apps feel in everyday use.',
            image: 'assets/images/public5.png',
            alt: 'The Coffee Shop Problem article cover',
            url: 'https://www.linkedin.com/pulse/coffee-shop-problem-why-caching-defines-user-mustafa-bekirov-ptaje'
        },
        {
            title: 'Fixing Memory Leaks in a SwiftUI App',
            category: 'SwiftUI',
            desc: 'A practical walkthrough of identifying and resolving memory leaks in a production SwiftUI application.',
            image: 'assets/images/public6.png',
            alt: 'Fixing Memory Leaks in a SwiftUI App article cover',
            url: 'https://www.linkedin.com/pulse/fixing-memory-leaks-swiftui-app-mustafa-bekirov-5k4le'
        },
        {
            title: 'AI in iOS',
            category: 'iOS Development',
            desc: 'Exploring how artificial intelligence capabilities can be integrated into native iOS applications.',
            image: 'assets/images/public1.png',
            alt: 'AI in iOS article cover',
            url: 'https://medium.com/@mustafos/ai-in-ios-7280407e5b9f'
        },
        {
            title: 'Generics in Swift',
            category: 'Swift',
            desc: 'Mastering complex generics in SwiftUI projects and writing more flexible, reusable Swift code.',
            image: 'assets/images/public2.png',
            alt: 'Generics in Swift article cover',
            url: 'https://medium.com/@mustafos/tricky-generics-in-swift-mastering-complexity-in-swiftui-projects-4a4a3fc884a6'
        },
        {
            title: 'Swift Concurrency',
            category: 'Concurrency',
            desc: 'Leveraging async/await in iOS applications for cleaner asynchronous code and better performance.',
            image: 'assets/images/public3.png',
            alt: 'Swift Concurrency article cover',
            url: 'https://medium.com/@mustafos/swift-concurrency-leveraging-async-await-in-ios-applications-5784c3c2b1af'
        }
    ],
    process: [
        { step: '01', title: 'Understand', text: 'I clarify the product goal, technical context, constraints and expected outcome.' },
        { step: '02', title: 'Plan', text: 'I break the task into a practical implementation plan and identify potential risks.' },
        { step: '03', title: 'Build', text: 'I implement the solution, communicate progress and verify important edge cases.' },
        { step: '04', title: 'Deliver', text: 'I prepare the feature for testing, release and future maintenance.' }
    ],
    heroProfile: {
        title: 'Mustafa Bekirov',
        role: 'iOS Developer',
        text: 'I build and ship native iOS products for startups and product teams.',
        tags: ['Swift', 'SwiftUI', 'UIKit']
    },
    heroFloats: [
        {
            icon: 'layout',
            label: 'SwiftUI',
            title: 'SwiftUI',
            text: 'Declarative interfaces for scalable, maintainable iOS products.'
        },
        {
            icon: 'code',
            label: 'Swift',
            title: 'Swift',
            text: 'Modern Swift with async/await, Combine and clean architecture.'
        },
        {
            icon: 'link',
            label: 'REST API',
            title: 'API Integration',
            text: 'REST APIs, authentication, Firebase and third-party SDKs.'
        },
        {
            icon: 'layers',
            label: 'Firebase',
            title: 'Firebase',
            text: 'Analytics, push notifications and cloud-backed features.'
        },
        {
            icon: 'zap',
            label: 'Performance',
            title: 'Performance',
            text: 'Startup time, memory usage and smooth UI responsiveness.'
        },
        {
            icon: 'rocket',
            label: 'CI/CD',
            title: 'CI/CD & Release',
            text: 'TestFlight, App Store delivery and repeatable build pipelines.'
        }
    ]
};
