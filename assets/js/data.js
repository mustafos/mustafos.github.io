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
            title: 'Sevensix',
            desc: 'A native iOS application focused on delivering a polished mobile experience with structured data and smooth user interactions.',
            image: 'assets/images/project1.png',
            alt: 'Sevensix app screenshot',
            tags: ['Swift', 'UIKit', 'REST API'],
            scope: 'Core features, API integration, App Store release',
            url: 'https://apps.apple.com/app/id1505604446'
        },
        {
            title: 'QırımKey',
            desc: 'A custom keyboard application providing localized input support with a focus on usability and system integration.',
            image: 'assets/images/project2.png',
            alt: 'QırımKey app screenshot',
            tags: ['Swift', 'SwiftUI', 'UIKit'],
            scope: 'Keyboard extension, system integration, App Store release',
            url: 'https://apps.apple.com/app/id6739430313'
        },
        {
            title: 'DriverPro',
            desc: 'A study and preparation app helping users plan and practice for driving tests with structured learning content.',
            image: 'assets/images/project3.png',
            alt: 'DriverPro app screenshot',
            tags: ['Swift', 'SwiftUI', 'Firebase'],
            scope: 'Learning flows, Firebase, in-app purchases',
            url: 'https://appadvice.com/app/driverpro-plan-study-test/6474212227'
        },
        {
            title: 'Pulse Measure',
            desc: 'A health-focused iOS application for measuring and tracking vital data with a clear, accessible interface.',
            image: 'assets/images/project4.png',
            alt: 'Pulse Measure app screenshot',
            tags: ['Swift', 'UIKit', 'Core Data'],
            scope: 'Measurement features, local persistence, UI performance',
            url: 'https://apps.apple.com/app/id1589931101'
        },
        {
            title: 'Super VPN',
            desc: 'A VPN application providing secure connectivity with subscription management and a streamlined onboarding experience.',
            image: 'assets/images/project5.png',
            alt: 'Super VPN app screenshot',
            tags: ['Swift', 'UIKit', 'StoreKit'],
            scope: 'Connection flows, subscriptions, stability',
            url: 'https://www.vpnsuper.com'
        },
        {
            title: 'Business Empire',
            desc: 'A business simulation game with progression mechanics, in-app purchases and engaging mobile gameplay.',
            image: 'assets/images/project6.png',
            alt: 'Business Empire app screenshot',
            tags: ['Swift', 'UIKit', 'StoreKit'],
            scope: 'Game mechanics, StoreKit, release cycle',
            url: 'https://apps.apple.com/app/id6451208928'
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
    heroFloats: [
        { icon: 'chart', label: 'Analytics' },
        { icon: 'zap', label: 'Performance' },
        { icon: 'layout', label: 'SwiftUI' },
        { icon: 'layers', label: 'Firebase' },
        { icon: 'link', label: 'REST API' },
        { icon: 'rocket', label: 'CI/CD' }
    ]
};
