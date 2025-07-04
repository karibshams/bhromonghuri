        // Show loading animation
        loadingAnimation.classList.add('show');
        aiResult.classList.remove('show');
        
        // Generate AI itinerary
        try {
            const itinerary = await AIFeatures.generatePersonalizedItinerary({
                destination,
                duration,
                budget,
                travelers,
                travelStyle,
                startDate,
                interests,
                language: currentLanguage || 'en'
            });
            
            displayItinerary(itinerary);
            
            // Hide loading, show result
            loadingAnimation.classList.remove('show');
            aiResult.classList.add('show');
            
            // Scroll to result
            aiResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (error) {
            console.error('Error generating itinerary:', error);
            // Fallback to mock data
            const mockItinerary = generateMockItinerary({
                destination,
                duration,
                budget,
                travelers,
                travelStyle,
                startDate,
                interests
            });
            
            displayItinerary(mockItinerary);
            loadingAnimation.classList.remove('show');
            aiResult.classList.add('show');
            aiResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }// Trip Planner JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tripPlannerForm');
    const loadingAnimation = document.getElementById('loadingAnimation');
    const aiResult = document.getElementById('aiResult');
    const itineraryContent = document.getElementById('itineraryContent');

    // Set minimum date to today
    const startDate = document.getElementById('startDate');
    const today = new Date().toISOString().split('T')[0];
    startDate.setAttribute('min', today);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const destination = formData.get('destination');
        const duration = parseInt(formData.get('duration'));
        const budget = parseInt(formData.get('budget'));
        const travelers = parseInt(formData.get('travelers'));
        const travelStyle = formData.get('travelStyle');
        const startDate = formData.get('startDate');
        
        // Get selected interests
        const interests = [];
        formData.getAll('interests').forEach(interest => {
            interests.push(interest);
        });

        // Show loading animation
        loadingAnimation.classList.add('show');
        aiResult.classList.remove('show');
        
        // Generate AI itinerary
        try {
            const itinerary = await AIFeatures.generatePersonalizedItinerary({
                destination,
                duration,
                budget,
                travelers,
                travelStyle,
                startDate,
                interests,
                language: currentLanguage || 'en'
            });
            
            displayItinerary(itinerary);
            
            // Hide loading, show result
            loadingAnimation.classList.remove('show');
            aiResult.classList.add('show');
            
            // Scroll to result
            aiResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (error) {
            console.error('Error generating itinerary:', error);
            // Fallback to mock data
            const mockItinerary = generateMockItinerary({
                destination,
                duration,
                budget,
                travelers,
                travelStyle,
                startDate,
                interests
            });
            
            displayItinerary(mockItinerary);
            loadingAnimation.classList.remove('show');
            aiResult.classList.add('show');
            aiResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Generate mock itinerary (replace with Claude AI integration)
function generateMockItinerary(params) {
    const { destination, duration, budget, travelers, travelStyle, startDate, interests } = params;
    
    const activities = getActivitiesByInterests(interests);
    const dailyBudget = Math.floor(budget / duration);
    
    let itinerary = `
        <div class="itinerary-header">
            <h3>${destination} ${duration}-Day ${travelStyle} Adventure</h3>
            <div class="trip-meta">
                <span><i class="fas fa-calendar"></i> Starting ${formatDate(startDate)}</span>
                <span><i class="fas fa-users"></i> ${travelers} Traveler${travelers > 1 ? 's' : ''}</span>
                <span><i class="fas fa-tag"></i> ৳${budget.toLocaleString()} per person</span>
            </div>
        </div>
    `;
    
    // Generate daily itinerary
    for (let day = 1; day <= duration; day++) {
        const dayActivities = getRandomActivities(activities, 3);
        
        itinerary += `
            <div class="itinerary-day">
                <h4>Day ${day}</h4>
                <div class="day-schedule">
                    <div class="time-slot">
                        <strong>Morning:</strong> ${dayActivities[0]}
                    </div>
                    <div class="time-slot">
                        <strong>Afternoon:</strong> ${dayActivities[1]}
                    </div>
                    <div class="time-slot">
                        <strong>Evening:</strong> ${dayActivities[2]}
                    </div>
                </div>
                <div class="day-budget">
                    <strong>Estimated Cost:</strong> ৳${dailyBudget.toLocaleString()}
                </div>
            </div>
        `;
    }
    
    // Add budget breakdown
    itinerary += `
        <div class="budget-breakdown">
            <h4>Budget Breakdown</h4>
            <ul>
                <li>Accommodation: ৳${Math.floor(budget * 0.35).toLocaleString()}</li>
                <li>Food & Dining: ৳${Math.floor(budget * 0.25).toLocaleString()}</li>
                <li>Transportation: ৳${Math.floor(budget * 0.20).toLocaleString()}</li>
                <li>Activities & Entrance Fees: ৳${Math.floor(budget * 0.15).toLocaleString()}</li>
                <li>Shopping & Miscellaneous: ৳${Math.floor(budget * 0.05).toLocaleString()}</li>
            </ul>
        </div>
        
        <div class="travel-tips">
            <h4>AI Travel Tips for ${destination}</h4>
            <ul>
                <li>Best time to visit: ${getBestTime(destination)}</li>
                <li>Local currency and exchange tips</li>
                <li>Must-try local dishes</li>
                <li>Cultural etiquette to remember</li>
                <li>Emergency contacts and safety tips</li>
            </ul>
        </div>
    `;
    
    return itinerary;
}

// Helper functions
function getActivitiesByInterests(interests) {
    const activityMap = {
        beach: ['Beach relaxation', 'Sunset viewing', 'Beach volleyball', 'Seafood dining', 'Coastal walk'],
        mountains: ['Mountain trekking', 'Sunrise hike', 'Cable car ride', 'Mountain village visit', 'Photography tour'],
        wildlife: ['Wildlife safari', 'Bird watching', 'Nature walk', 'Conservation center visit', 'Night safari'],
        culture: ['Temple/Mosque visit', 'Museum tour', 'Cultural show', 'Local market exploration', 'Historical site tour'],
        food: ['Cooking class', 'Street food tour', 'Fine dining experience', 'Local market visit', 'Food festival'],
        photography: ['Golden hour shoot', 'Landmark photography', 'Street photography walk', 'Drone photography', 'Night photography'],
        watersports: ['Snorkeling', 'Jet skiing', 'Parasailing', 'Kayaking', 'Scuba diving'],
        shopping: ['Local market shopping', 'Mall visit', 'Souvenir hunting', 'Craft workshop', 'Night market']
    };
    
    let activities = [];
    interests.forEach(interest => {
        if (activityMap[interest]) {
            activities = activities.concat(activityMap[interest]);
        }
    });
    
    // Add default activities if none selected
    if (activities.length === 0) {
        activities = ['City tour', 'Local cuisine experience', 'Cultural site visit', 'Shopping', 'Relaxation'];
    }
    
    return activities;
}

function getRandomActivities(activities, count) {
    const shuffled = activities.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, activities.length));
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function getBestTime(destination) {
    const seasons = {
        "Cox's Bazar": "October to March (Winter)",
        "Thailand": "November to February (Cool season)",
        "Nepal": "October to December (Clear skies)",
        "Sundarbans": "November to February (Winter)",
        "Sylhet": "September to November (Post-monsoon)"
    };
    
    return seasons[destination] || "Check local weather patterns";
}

// Display the generated itinerary
function displayItinerary(itinerary) {
    const itineraryContent = document.getElementById('itineraryContent');
    itineraryContent.innerHTML = itinerary;
}

// Download itinerary as PDF (mock function)
function downloadItinerary() {
    showNotification('Downloading your itinerary as PDF...', 'info');
    // In real implementation, you would generate and download a PDF
    setTimeout(() => {
        showNotification('Itinerary downloaded successfully!', 'success');
    }, 2000);
}

// Share itinerary
function shareItinerary() {
    if (navigator.share) {
        navigator.share({
            title: 'My Bhromonghuri Trip Itinerary',
            text: 'Check out my AI-generated trip itinerary!',
            url: window.location.href
        }).then(() => {
            showNotification('Shared successfully!', 'success');
        }).catch((error) => console.log('Error sharing:', error));
    } else {
        // Copy to clipboard fallback
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        showNotification('Link copied to clipboard!', 'success');
    }
}

// Regenerate itinerary
function regenerateItinerary() {
    const form = document.getElementById('tripPlannerForm');
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showNotification('Please adjust your preferences and generate again', 'info');
}

// Integration with Claude AI (placeholder for actual implementation)
async function generateAIItinerary(params) {
    // This is where you would integrate with Claude AI API
    // Example structure:
    /*
    const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
            prompt: `Generate a ${params.duration}-day itinerary for ${params.destination} with a budget of ${params.budget} BDT per person. Travel style: ${params.travelStyle}. Interests: ${params.interests.join(', ')}.`,
            max_tokens: 2000
        })
    });
    
    const data = await response.json();
    return data.response;
    */
    
    // For now, return mock data
    return generateMockItinerary(params);
}