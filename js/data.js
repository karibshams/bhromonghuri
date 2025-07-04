// Sample data for the website

const trips = [
    {
        id: 1,
        title: "Cox's Bazar Beach Paradise",
        description: "Experience the world's longest natural sandy beach with crystal clear waters",
        destination: "Cox's Bazar",
        type: "domestic",
        duration: "3 Days, 2 Nights",
        price: 8500,
        image: "images/trips/cox-bazar.jpg",
        featured: true,
        highlights: [
            "Beach activities and water sports",
            "Himchari National Park visit",
            "Inani Beach exploration",
            "Local seafood experience"
        ]
    },
    {
        id: 2,
        title: "Sundarbans Wildlife Adventure",
        description: "Explore the world's largest mangrove forest and spot Royal Bengal Tigers",
        destination: "Sundarbans",
        type: "domestic",
        duration: "4 Days, 3 Nights",
        price: 12000,
        image: "images/trips/sundarbans.jpg",
        featured: true,
        highlights: [
            "Tiger spotting opportunities",
            "Boat safari through mangroves",
            "Bird watching",
            "Local village experience"
        ]
    },
    {
        id: 3,
        title: "Thailand Beach & Culture Tour",
        description: "Discover Thailand's beautiful beaches, temples, and vibrant culture",
        destination: "Thailand",
        type: "international",
        duration: "7 Days, 6 Nights",
        price: 45000,
        image: "images/trips/thailand.jpg",
        featured: true,
        highlights: [
            "Bangkok city tour",
            "Phuket beach relaxation",
            "Temple visits",
            "Thai cooking class"
        ]
    },
    {
        id: 4,
        title: "Sylhet Tea Gardens & Waterfalls",
        description: "Immerse yourself in the scenic beauty of tea gardens and waterfalls",
        destination: "Sylhet",
        type: "domestic",
        duration: "3 Days, 2 Nights",
        price: 7500,
        image: "images/trips/sylhet.jpg",
        featured: false,
        highlights: [
            "Tea garden tours",
            "Jaflong stone collection",
            "Ratargul Swamp Forest",
            "Bisnakandi visit"
        ]
    },
    {
        id: 5,
        title: "Nepal Himalayan Trek",
        description: "Challenge yourself with breathtaking mountain views and cultural experiences",
        destination: "Nepal",
        type: "international",
        duration: "10 Days, 9 Nights",
        price: 55000,
        image: "images/trips/nepal.jpg",
        featured: false,
        highlights: [
            "Everest Base Camp trek",
            "Kathmandu heritage sites",
            "Mountain sunrise views",
            "Buddhist monastery visits"
        ]
    },
    {
        id: 6,
        title: "Saint Martin's Island Getaway",
        description: "Escape to Bangladesh's only coral island with pristine beaches",
        destination: "Saint Martin",
        type: "domestic",
        duration: "3 Days, 2 Nights",
        price: 9500,
        image: "images/trips/saint-martin.jpg",
        featured: false,
        highlights: [
            "Coral reef exploration",
            "Fresh seafood BBQ",
            "Sunrise and sunset views",
            "Chera Dwip visit"
        ]
    }
];

const gallery = [
    {
        id: 1,
        title: "Sunset at Cox's Bazar",
        location: "Cox's Bazar, Bangladesh",
        image: "images/gallery/sunset-cox.jpg",
        photographer: "Ahmed Rahman"
    },
    {
        id: 2,
        title: "Royal Bengal Tiger",
        location: "Sundarbans, Bangladesh",
        image: "images/gallery/tiger.jpg",
        photographer: "Sarah Khan"
    },
    {
        id: 3,
        title: "Tea Garden Morning",
        location: "Sylhet, Bangladesh",
        image: "images/gallery/tea-garden.jpg",
        photographer: "Rafiq Islam"
    },
    {
        id: 4,
        title: "Thai Temple Architecture",
        location: "Bangkok, Thailand",
        image: "images/gallery/thai-temple.jpg",
        photographer: "Lisa Wong"
    },
    {
        id: 5,
        title: "Himalayan Peaks",
        location: "Nepal",
        image: "images/gallery/himalayas.jpg",
        photographer: "John Doe"
    },
    {
        id: 6,
        title: "Crystal Clear Waters",
        location: "Saint Martin, Bangladesh",
        image: "images/gallery/clear-water.jpg",
        photographer: "Maria Garcia"
    }
];

const events = [
    {
        id: 1,
        title: "Annual Photography Contest 2024",
        date: "2024-03-15",
        time: "10:00 AM",
        location: "Dhaka",
        description: "Share your best travel photographs and win exciting prizes",
        image: "images/events/photo-contest.jpg"
    },
    {
        id: 2,
        title: "Travel Meetup & Networking",
        date: "2024-02-20",
        time: "5:00 PM",
        location: "Gulshan, Dhaka",
        description: "Connect with fellow travelers and share experiences",
        image: "images/events/meetup.jpg"
    },
    {
        id: 3,
        title: "Sustainable Travel Workshop",
        date: "2024-04-10",
        time: "2:00 PM",
        location: "Online",
        description: "Learn about eco-friendly travel practices",
        image: "images/events/workshop.jpg"
    }
];

const blogPosts = [
    {
        id: 1,
        title: "10 Hidden Gems in Bangladesh You Must Visit",
        excerpt: "Discover the lesser-known destinations that will take your breath away",
        author: "Travel Expert",
        date: "2024-01-15",
        image: "images/blog/hidden-gems.jpg",
        content: "Bangladesh is full of amazing places waiting to be explored..."
    },
    {
        id: 2,
        title: "How to Pack Light for Long Trips",
        excerpt: "Master the art of minimalist packing without missing essentials",
        author: "Sarah Rahman",
        date: "2024-01-10",
        image: "images/blog/packing.jpg",
        content: "Packing light is an art that every traveler should master..."
    },
    {
        id: 3,
        title: "Solo Travel Safety Tips for Women",
        excerpt: "Essential safety guidelines for women traveling alone",
        author: "Maria Khan",
        date: "2024-01-05",
        image: "images/blog/solo-travel.jpg",
        content: "Solo travel can be incredibly empowering for women..."
    }
];

// Trip planner interests and styles
const travelStyles = [
    "Adventure",
    "Relaxation",
    "Cultural",
    "Luxury",
    "Budget",
    "Family",
    "Solo",
    "Romantic"
];

const interests = [
    "Beach & Ocean",
    "Mountains & Hiking",
    "Wildlife & Nature",
    "History & Culture",
    "Food & Cuisine",
    "Photography",
    "Water Sports",
    "Shopping",
    "Nightlife",
    "Wellness & Spa"
];

// Sample user reviews
const reviews = [
    {
        name: "Aminul Islam",
        rating: 5,
        trip: "Cox's Bazar Beach Paradise",
        comment: "Amazing experience! The team was very professional and the itinerary was perfect.",
        date: "2024-01-20"
    },
    {
        name: "Fatima Begum",
        rating: 5,
        trip: "Sundarbans Wildlife Adventure",
        comment: "Once in a lifetime experience. Saw tigers and the guide was extremely knowledgeable.",
        date: "2024-01-15"
    },
    {
        name: "Rakib Hasan",
        rating: 4,
        trip: "Thailand Beach & Culture Tour",
        comment: "Great trip overall. Would have liked more free time but everything was well organized.",
        date: "2024-01-10"
    }
];

// Export data for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        trips,
        gallery,
        events,
        blogPosts,
        travelStyles,
        interests,
        reviews
    };
}