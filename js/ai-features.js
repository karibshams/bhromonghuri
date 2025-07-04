// AI Features for Bhromonghuri
// This file handles all AI-powered features including Claude AI integration

// Claude AI Configuration
const CLAUDE_API_CONFIG = {
    apiKey: 'YOUR_CLAUDE_API_KEY', // Replace with your actual API key
    apiUrl: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-opus-20240229',
    maxTokens: 2000
};

// Language configuration
let currentLanguage = 'en'; // Default to English

// AI Features Module
const AIFeatures = {
    // 1. Personalized Trip Itinerary Generation (Enhanced)
    async generatePersonalizedItinerary(params) {
        const { destination, duration, budget, travelers, travelStyle, interests, startDate, language } = params;
        
        const prompt = language === 'bn' ? 
            `আমার জন্য একটি ${duration} দিনের ভ্রমণ পরিকল্পনা তৈরি করুন:
            গন্তব্য: ${destination}
            বাজেট: ৳${budget} প্রতি ব্যক্তি
            ভ্রমণকারী: ${travelers} জন
            ভ্রমণ শৈলী: ${travelStyle}
            আগ্রহ: ${interests.join(', ')}
            শুরুর তারিখ: ${startDate}
            
            দয়া করে প্রতিদিনের বিস্তারিত সূচি, খরচ বিভাজন, স্থানীয় টিপস এবং সাংস্কৃতিক পরামর্শ অন্তর্ভুক্ত করুন।` :
            
            `Create a personalized ${duration}-day trip itinerary for me:
            Destination: ${destination}
            Budget: ৳${budget} per person
            Travelers: ${travelers} people
            Travel Style: ${travelStyle}
            Interests: ${interests.join(', ')}
            Start Date: ${startDate}
            
            Please include daily detailed schedule, cost breakdown, local tips, and cultural advice.`;

        try {
            const response = await this.callClaudeAPI(prompt);
            return this.formatItinerary(response, language);
        } catch (error) {
            console.error('Error generating itinerary:', error);
            return this.getMockItinerary(params);
        }
    },

    // 2. Mood-Based Trip Suggestions
    async suggestTripsByMood(mood, budget, season, language = 'en') {
        const moodPrompts = {
            adventurous: language === 'bn' ? 'রোমাঞ্চকর এবং উত্তেজনাপূর্ণ' : 'adventurous and exciting',
            relaxing: language === 'bn' ? 'শান্তিপূর্ণ এবং আরামদায়ক' : 'peaceful and relaxing',
            cultural: language === 'bn' ? 'সাংস্কৃতিক এবং ঐতিহাসিক' : 'cultural and historical',
            romantic: language === 'bn' ? 'রোমান্টিক এবং অন্তরঙ্গ' : 'romantic and intimate',
            family: language === 'bn' ? 'পরিবার-বান্ধব এবং মজাদার' : 'family-friendly and fun'
        };

        const prompt = language === 'bn' ?
            `আমি ${moodPrompts[mood]} ভ্রমণ খুঁজছি। আমার বাজেট ৳${budget} এবং ${season} মৌসুমে যেতে চাই। বাংলাদেশ এবং আন্তর্জাতিক উভয় গন্তব্যের জন্য 5টি ভ্রমণ পরামর্শ দিন।` :
            `I'm looking for ${moodPrompts[mood]} trips. My budget is ৳${budget} and I want to travel in ${season}. Suggest 5 trips including both Bangladesh and international destinations.`;

        try {
            const response = await this.callClaudeAPI(prompt);
            return this.parseTripSuggestions(response, language);
        } catch (error) {
            console.error('Error suggesting trips:', error);
            return this.getMockMoodSuggestions(mood, budget, season);
        }
    },

    // 3. AI Chat Assistant
    async chatWithAssistant(message, context = {}, language = 'en') {
        const systemPrompt = language === 'bn' ?
            `আপনি Bhromonghuri এর সহায়ক ভ্রমণ পরামর্শদাতা। বাংলাদেশী ভ্রমণকারীদের সাহায্য করুন এবং স্থানীয় ও আন্তর্জাতিক ভ্রমণ সম্পর্কে পরামর্শ দিন।` :
            `You are Bhromonghuri's helpful travel assistant. Help Bangladeshi travelers with local and international travel advice.`;

        const prompt = `${systemPrompt}\n\nUser: ${message}\nContext: ${JSON.stringify(context)}`;

        try {
            const response = await this.callClaudeAPI(prompt);
            return {
                message: response,
                language: language,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error in chat:', error);
            return {
                message: language === 'bn' ? 
                    'দুঃখিত, এই মুহূর্তে সাহায্য করতে পারছি না। অনুগ্রহ করে পরে চেষ্টা করুন।' :
                    'Sorry, I cannot help at the moment. Please try again later.',
                language: language,
                timestamp: new Date().toISOString()
            };
        }
    },

    // 4. Multi-language Support
    setLanguage(lang) {
        currentLanguage = lang;
        this.updateUILanguage(lang);
    },

    updateUILanguage(lang) {
        const translations = {
            en: {
                generateItinerary: 'Generate AI Itinerary',
                whereToGo: 'Where do you want to go?',
                tripDuration: 'Trip Duration (days)',
                budget: 'Budget per Person (BDT)',
                travelStyle: 'Travel Style',
                interests: 'What are your interests?',
                chatPlaceholder: 'Ask me anything about travel...',
                sendMessage: 'Send',
                suggestByMood: 'Get Trip Suggestions by Mood'
            },
            bn: {
                generateItinerary: 'AI ভ্রমণ পরিকল্পনা তৈরি করুন',
                whereToGo: 'আপনি কোথায় যেতে চান?',
                tripDuration: 'ভ্রমণের সময়কাল (দিন)',
                budget: 'প্রতি ব্যক্তি বাজেট (টাকা)',
                travelStyle: 'ভ্রমণ শৈলী',
                interests: 'আপনার আগ্রহ কি?',
                chatPlaceholder: 'ভ্রমণ সম্পর্কে যেকোনো প্রশ্ন করুন...',
                sendMessage: 'পাঠান',
                suggestByMood: 'মুড অনুযায়ী ভ্রমণ পরামর্শ'
            }
        };

        // Update UI elements with translations
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    },

    // Helper function to call Claude API
    async callClaudeAPI(prompt) {
        // In production, this should be handled by your backend
        const response = await fetch(CLAUDE_API_CONFIG.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': CLAUDE_API_CONFIG.apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: CLAUDE_API_CONFIG.model,
                max_tokens: CLAUDE_API_CONFIG.maxTokens,
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.content[0].text;
    },

    // Format itinerary response
    formatItinerary(response, language) {
        // Parse and format the AI response into structured HTML
        return `
            <div class="ai-generated-itinerary">
                <div class="itinerary-content">
                    ${response}
                </div>
                <div class="itinerary-actions">
                    <button onclick="AIFeatures.saveItinerary()" class="btn btn-primary">
                        ${language === 'bn' ? 'সংরক্ষণ করুন' : 'Save Itinerary'}
                    </button>
                    <button onclick="AIFeatures.shareItinerary()" class="btn btn-secondary">
                        ${language === 'bn' ? 'শেয়ার করুন' : 'Share'}
                    </button>
                </div>
            </div>
        `;
    },

    // Mock data fallbacks
    getMockItinerary(params) {
        const { destination, duration, budget, language } = params;
        
        if (language === 'bn') {
            return `
                <div class="mock-itinerary">
                    <h3>${destination} ${duration}-দিনের ভ্রমণ পরিকল্পনা</h3>
                    <p>বাজেট: ৳${budget.toLocaleString()}</p>
                    <div class="day-plan">
                        <h4>দিন ১</h4>
                        <p>সকাল: ${destination} পৌঁছান এবং হোটেলে চেক-ইন</p>
                        <p>দুপুর: স্থানীয় খাবার উপভোগ করুন</p>
                        <p>সন্ধ্যা: এলাকা ঘুরে দেখুন</p>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="mock-itinerary">
                <h3>${destination} ${duration}-Day Trip Plan</h3>
                <p>Budget: ৳${budget.toLocaleString()}</p>
                <div class="day-plan">
                    <h4>Day 1</h4>
                    <p>Morning: Arrive at ${destination} and check-in</p>
                    <p>Afternoon: Enjoy local cuisine</p>
                    <p>Evening: Explore the area</p>
                </div>
            </div>
        `;
    },

    getMockMoodSuggestions(mood, budget, season) {
        const suggestions = {
            adventurous: [
                { name: "Sundarbans Tiger Safari", price: 12000, duration: "4 days" },
                { name: "Nepal Trekking Adventure", price: 45000, duration: "7 days" }
            ],
            relaxing: [
                { name: "Cox's Bazar Beach Resort", price: 8000, duration: "3 days" },
                { name: "Thailand Spa Retreat", price: 35000, duration: "5 days" }
            ],
            cultural: [
                { name: "Old Dhaka Heritage Tour", price: 3000, duration: "2 days" },
                { name: "India Golden Triangle", price: 25000, duration: "6 days" }
            ]
        };

        return suggestions[mood] || suggestions.relaxing;
    },

    // Save itinerary
    saveItinerary() {
        const itinerary = document.querySelector('.ai-generated-itinerary').innerHTML;
        localStorage.setItem('savedItinerary', itinerary);
        showNotification(currentLanguage === 'bn' ? 'ভ্রমণ পরিকল্পনা সংরক্ষিত হয়েছে!' : 'Itinerary saved!', 'success');
    },

    // Share itinerary
    shareItinerary() {
        if (navigator.share) {
            navigator.share({
                title: 'My Bhromonghuri Trip Itinerary',
                text: 'Check out my AI-generated trip plan!',
                url: window.location.href
            });
        } else {
            // Fallback to copying link
            navigator.clipboard.writeText(window.location.href);
            showNotification(currentLanguage === 'bn' ? 'লিঙ্ক কপি হয়েছে!' : 'Link copied!', 'success');
        }
    }
};

// Initialize AI Chat Widget
function initAIChatWidget() {
    const chatWidget = document.createElement('div');
    chatWidget.className = 'ai-chat-widget';
    chatWidget.innerHTML = `
        <div class="chat-toggle" onclick="toggleChat()">
            <i class="fas fa-robot"></i>
        </div>
        <div class="chat-window" id="chatWindow">
            <div class="chat-header">
                <h4>AI Travel Assistant</h4>
                <div class="language-toggle">
                    <button onclick="AIFeatures.setLanguage('en')" class="lang-btn active" data-lang="en">EN</button>
                    <button onclick="AIFeatures.setLanguage('bn')" class="lang-btn" data-lang="bn">বাং</button>
                </div>
                <button onclick="toggleChat()" class="close-chat">&times;</button>
            </div>
            <div class="chat-messages" id="chatMessages"></div>
            <div class="chat-input">
                <input type="text" id="chatInput" placeholder="Ask me anything about travel..." data-translate="chatPlaceholder">
                <button onclick="sendChatMessage()" data-translate="sendMessage">Send</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(chatWidget);
}

// Chat functions
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.toggle('active');
}

async function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addChatMessage(message, 'user');
    input.value = '';
    
    // Get AI response
    const response = await AIFeatures.chatWithAssistant(message, {}, currentLanguage);
    addChatMessage(response.message, 'assistant');
}

function addChatMessage(message, sender) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageEl = document.createElement('div');
    messageEl.className = `chat-message ${sender}`;
    messageEl.textContent = message;
    messagesDiv.appendChild(messageEl);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initAIChatWidget();
    
    // Add language toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
});