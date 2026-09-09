import { synthesizeDynamicResponse } from '../lib/ai/synthesizer';
import { ChatMessageData } from '../lib/ai/types';

interface DialogueTurn {
  user: string;
  expectedKeywords: string[];
  forbiddenKeywords: string[];
}

interface TestScenario {
  name: string;
  turns: DialogueTurn[];
}

const scenarios: TestScenario[] = [
  {
    name: 'Scenario 1: Services Menu -> Follow-up on Online Store -> Deep-dive on Payments',
    turns: [
      {
        user: 'What kind of business solutions can you build for me?',
        expectedKeywords: ['online stores', 'booking', 'operations'],
        forbiddenKeywords: ['react', 'next.js', 'sql', 'endpoints', "i'm here to assist you"],
      },
      {
        user: 'I want an online store for my clothing brand',
        expectedKeywords: ['Tearsize', 'clothing', 'checkout', 'order'],
        forbiddenKeywords: [
          'what arnel builds for businesses', // Should NOT repeat the 5-service menu!
          '1. custom websites & landing pages',
          '2. online stores & e-commerce',
          'endpoints',
          "i'm here to assist you",
        ],
      },
      {
        user: 'How do my customers pay on the site?',
        expectedKeywords: ['payment', 'credit card'],
        forbiddenKeywords: ['stripe api key', 'webhook secret', 'sql', "i'm here to assist you"],
      },
    ],
  },
  {
    name: 'Scenario 2: Service Selection by Number (Option 2: Booking System) -> Clinic Niche',
    turns: [
      {
        user: 'Can you show me what you offer?',
        expectedKeywords: ['custom websites', 'booking', 'operations'],
        forbiddenKeywords: ['api', 'database schema', "i'm here to assist you"],
      },
      {
        user: 'I want number 2, booking appointments',
        expectedKeywords: ['Booking', 'HiveSync VA', 'appointment'],
        forbiddenKeywords: [
          'what arnel builds for businesses', // Must NOT repeat menu
          '1. custom websites & landing pages',
          "i'm here to assist you",
        ],
      },
      {
        user: 'It is for our dental clinic, is it easy for patients?',
        expectedKeywords: ['dental', 'patient', 'appointment'],
        forbiddenKeywords: ['backend controller', 'cron job', "i'm here to assist you"],
      },
    ],
  },
  {
    name: 'Scenario 3: Conversational Affirmation & Contacting Arnel',
    turns: [
      {
        user: 'Tell me about the staff management tools',
        expectedKeywords: ['Present Po', 'timesheet', 'qr'],
        forbiddenKeywords: ['redis', 'docker', "i'm here to assist you"],
      },
      {
        user: 'Sounds good! How can we talk with Arnel?',
        expectedKeywords: ['arnlebaylon15@gmail.com', 'project form'],
        forbiddenKeywords: ['github commit', 'pull request', "i'm here to assist you"],
      },
    ],
  },
  {
    name: 'Scenario 4: Deep Multi-Turn Online Store Follow-Ups (Wide Context across 7 Turns)',
    turns: [
      {
        user: 'Can you build an online store for my fashion brand?',
        expectedKeywords: ['Tearsize', 'fashion', 'checkout'],
        forbiddenKeywords: ["i'm here to assist you", 'what arnel builds for businesses'],
      },
      {
        user: 'It is a brand new collection launching next month',
        expectedKeywords: ['Launching', 'collection', 'Tearsize'],
        forbiddenKeywords: ["i'm here to assist you", 'what arnel builds for businesses'],
      },
      {
        user: 'Can it connect to my Instagram bio?',
        expectedKeywords: ['Instagram', 'social', 'tap'],
        forbiddenKeywords: ["i'm here to assist you"],
      },
      {
        user: 'What if an item or size is sold out?',
        expectedKeywords: ['stock', 'inventory', 'sold out'],
        forbiddenKeywords: ["i'm here to assist you"],
      },
      {
        user: 'How does shipping and delivery work?',
        expectedKeywords: ['shipping', 'delivery', 'checkout'],
        forbiddenKeywords: ["i'm here to assist you"],
      },
      {
        user: 'Can you also design our brand logo and color palette?',
        expectedKeywords: ['logo', 'branding', 'typography'],
        forbiddenKeywords: ["i'm here to assist you"],
      },
      {
        user: 'What if we want to add an unusual custom feature like a music player?',
        expectedKeywords: ['store', 'custom'],
        forbiddenKeywords: ["i'm here to assist you with any questions about arnel's services", "i'm here to assist you"],
      },
    ],
  },
  {
    name: 'Scenario 5: Salon Booking -> Answering Assistant Question -> Cancellation & Roles',
    turns: [
      {
        user: 'I need an online booking system for my hair salon',
        expectedKeywords: ['salon', 'booking', 'calendar'],
        forbiddenKeywords: ["i'm here to assist you"],
      },
      {
        user: 'Right now clients book mostly through Instagram DMs and WhatsApp',
        expectedKeywords: ['instagram', 'whatsapp', 'booking'],
        forbiddenKeywords: ["i'm here to assist you"],
      },
      {
        user: 'What if someone cancels last minute or does a no show?',
        expectedKeywords: ['rescheduling', 'cancellation', 'reminder'],
        forbiddenKeywords: ["i'm here to assist you"],
      },
      {
        user: 'Can my receptionist use it without seeing my profit numbers?',
        expectedKeywords: ['role', 'privacy', 'receptionist'],
        forbiddenKeywords: ["i'm here to assist you"],
      },
      {
        user: 'Can I pay half now and half when it launches?',
        expectedKeywords: ['milestone', 'deposit', '50%'],
        forbiddenKeywords: ["i'm here to assist you"],
      },
    ],
  },
];

export function runDialogueTests() {
  console.log('====================================================');
  console.log('   CLIENT AI CHAT ADAPTATION & ANTI-REPETITION TEST  ');
  console.log('====================================================\n');

  let passedAll = true;

  for (const scenario of scenarios) {
    console.log(`\n📋 ${scenario.name}`);
    console.log('─'.repeat(scenario.name.length + 3));

    const history: ChatMessageData[] = [];

    for (let i = 0; i < scenario.turns.length; i++) {
      const turn = scenario.turns[i];
      console.log(`\n💬 [Turn ${i + 1}] User: "${turn.user}"`);

      const result = synthesizeDynamicResponse(
        turn.user,
        'client',
        { activeSection: 'contact' },
        history
      );

      const responseText = result.text;
      const lowerResponse = responseText.toLowerCase();

      // Check expected keywords
      const missing = turn.expectedKeywords.filter(
        kw => !lowerResponse.includes(kw.toLowerCase())
      );

      // Check forbidden keywords (like repeating the menu or developer jargon)
      const violated = turn.forbiddenKeywords.filter(
        kw => lowerResponse.includes(kw.toLowerCase())
      );

      if (missing.length > 0) {
        console.warn(`⚠️ Warning: Missing expected keywords: ${missing.join(', ')}`);
        passedAll = false;
      }

      if (violated.length > 0) {
        console.error(`❌ FAILED: Found forbidden keywords (repeated menu or jargon): ${violated.join(', ')}`);
        passedAll = false;
      }

      if (missing.length === 0 && violated.length === 0) {
        console.log(`✅ Passed: Adapted correctly without repetition or jargon.`);
      }

      console.log(`🤖 AI Response Preview:`);
      const preview = responseText
        .split('\n')
        .filter(l => l.trim().length > 0)
        .slice(0, 3)
        .join(' ')
        .slice(0, 160);
      console.log(`   "${preview}..."`);

      // Add to conversation history for the next turn
      history.push({
        id: `user-${i}`,
        role: 'user',
        content: turn.user,
        timestamp: Date.now(),
      });
      history.push({
        id: `assistant-${i}`,
        role: 'assistant',
        content: responseText,
        timestamp: Date.now(),
      });
    }
  }

  console.log('\n====================================================');
  if (passedAll) {
    console.log('🎉 ALL MULTI-TURN DIALOGUE ADAPTATION TESTS PASSED!');
  } else {
    console.log('❌ SOME TESTS FAILED: Check missing or violated assertions above.');
  }
  console.log('====================================================\n');
}

// Automatically execute if run directly
if (typeof process !== 'undefined' && process.argv[1]?.includes('test_dialogue')) {
  runDialogueTests();
}
