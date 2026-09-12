
import { FormEvent, useMemo, useState } from 'react';
import {
  Bot,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  Copy,
  Hash,
  Heart,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  PanelLeftClose,
  Plus,
  Send,
  Sparkles,
  Sun,
  User,
  X,
} from 'lucide-react';

type Role = 'bot' | 'user';
type Message = {
  id: number;
  role: Role;
  text: string;
  time: string;
};

const quickPrompts = [
  "How's your day going?",
  'Tell me a joke',
  'What should I eat today?',
];

type Conversation = {
  id: string;
  title: string;
  starter: string;
};

const conversations: Conversation[] = [
  { id: 'catching-up', title: 'Catching up with ChinguAi', starter: "Hey! I'm ChinguAi, your chat buddy. Talk to me about anything — your day, food, movies, weekend plans, or just say hi!" },
  { id: 'weekend', title: 'Weekend plans', starter: "Weekend chat! Any plans, or are you just winging it? I'm here for whatever — lazy days, adventures, or figuring out what to do." },
  { id: 'food', title: 'Food ideas', starter: "Let's talk food! Hungry but don't know what to eat? Tell me what you're craving and I'll throw some ideas your way." },
  { id: 'movies', title: 'Movie night', starter: "Movie night! Tell me what kind of vibe you're after — comedy, thriller, feel-good — and I'll help you pick something to watch." },
];

function makeStarter(conv: Conversation): Message {
  return { id: Date.now(), role: 'bot', text: conv.starter, time: getTime() };
}

const jokes = [
  "Why don't skeletons fight each other? They don't have the guts.",
  "I told my computer I needed a break, and now it won't stop showing me KitKat ads.",
  "Why did the scarecrow win an award? Because he was outstanding in his field.",
  "I'm reading a book about anti-gravity. It's impossible to put down!",
  "Why don't eggs tell jokes? They'd crack each other up.",
];

function pickRandom(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)];
}

function getBotReply(input: string): string {
  const prompt = input.toLowerCase();

  if (prompt.includes('hello') || prompt.includes('hi') || prompt.includes('hey') || prompt.includes('yo')) {
    return "Hey there! So good to hear from you. What's on your mind today?";
  }
  if (prompt.includes('how are you') || prompt.includes("how's your day") || prompt.includes('how you doing') || prompt.includes("how's it going")) {
    return "I'm doing great, thanks for asking! Just hanging out in the digital world, ready to chat. How about you — how's your day been so far?";
  }
  if (prompt.includes('joke') || prompt.includes('funny') || prompt.includes('make me laugh')) {
    return pickRandom(jokes);
  }
  if (prompt.includes('food') || prompt.includes('eat') || prompt.includes('hungry') || prompt.includes('lunch') || prompt.includes('dinner') || prompt.includes('breakfast')) {
    const ideas = [
      "Ooh, how about some pizza? You can never go wrong with pizza.",
      "Maybe a nice bowl of ramen? Comforting and delicious.",
      "How about tacos? Fun to make and even better to eat.",
      "A simple sandwich and some fruit could hit the spot if you want something light.",
      "Treat yourself to some sushi — fresh and tasty!",
    ];
    return pickRandom(ideas);
  }
  if (prompt.includes('movie') || prompt.includes('film') || prompt.includes('watch') || prompt.includes('binge')) {
    return "Ooh, movie time! If you want something fun, try a comedy. In the mood for thrills? Go for a suspense flick. Or just rewatch your all-time favorite — nothing wrong with that!";
  }
  if (prompt.includes('music') || prompt.includes('song') || prompt.includes('playlist')) {
    return "Music is the best! What are you into lately? I can suggest something chill, something upbeat, or something to match whatever mood you're in.";
  }
  if (prompt.includes('weekend') || prompt.includes('plans') || prompt.includes('bored') || prompt.includes('do today')) {
    return "Weekend vibes! You could go for a walk, try a new recipe, binge a show, or just chill and do nothing — that counts as a plan too. What sounds good to you?";
  }
  if (prompt.includes('weather') || prompt.includes('rain') || prompt.includes('sunny') || prompt.includes('hot') || prompt.includes('cold')) {
    return "I can't look outside, but I hope it's nice where you are! Perfect weather for a walk, or if it's rainy — perfect weather for staying in with a warm drink.";
  }
  if (prompt.includes('tired') || prompt.includes('sleep') || prompt.includes('exhausted')) {
    return "Aw, sounds like you need a break. Grab some water, maybe a quick nap, and don't be too hard on yourself. Rest is productive too!";
  }
  if (prompt.includes('sad') || prompt.includes('down') || prompt.includes('blue') || prompt.includes('depressed')) {
    return "I'm sorry you're feeling that way. It's okay to have off days — they happen to everyone. Want to talk about it, or would a joke help instead?";
  }
  if (prompt.includes('happy') || prompt.includes('great') || prompt.includes('awesome') || prompt.includes('excited')) {
    return "That's wonderful to hear! I love good energy. Tell me more — what's got you in such a great mood?";
  }
  if (prompt.includes('hobby') || prompt.includes('fun') || prompt.includes('bored')) {
    return "Looking for something fun? You could try drawing, learn a few words in a new language, cook something new, or go down a Wikipedia rabbit hole about something random. What sounds fun?";
  }
  if (prompt.includes('love') || prompt.includes('like you') || prompt.includes('marry')) {
    return "Aww, you're sweet! I'm just a friendly bot, but I appreciate the love. Let's keep chatting — what else is on your mind?";
  }
  if (prompt.includes('bye') || prompt.includes('goodbye') || prompt.includes('see you') || prompt.includes('gtg')) {
    return "Take care! It was fun chatting with you. Come back anytime — I'll be right here!";
  }
  if (prompt.includes('thank')) {
    return "You're so welcome! I'm always happy to chat. Anything else on your mind?";
  }

  const fallbacks = [
    "That's interesting! Tell me more about it.",
    "Hmm, I haven't thought about that before. What do you think about it?",
    "Ooh, good topic! What's your take on it?",
    "I hear you! Go on — I'm listening.",
    "Nice one! How's that making you feel?",
  ];
  return pickRandom(fallbacks);
}

function getTime(): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date());
}

function App() {
  const [activeConvId, setActiveConvId] = useState('catching-up');
  const [messages, setMessages] = useState<Message[]>([makeStarter(conversations[0])]);
  const [draft, setDraft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const messageCountLabel = useMemo(
    () => `${messages.length} ${messages.length === 1 ? 'message' : 'messages'}`,
    [messages.length]
  );

  const sendMessage = (text: string): void => {
    const trimmedText = text.trim();
    if (!trimmedText || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      text: trimmedText,
      time: getTime(),
    };
    setMessages((current) => [...current, userMessage]);
    setDraft('');
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: 'bot',
          text: getBotReply(trimmedText),
          time: getTime(),
        },
      ]);
      setIsTyping(false);
    }, 650);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    sendMessage(draft);
  };

  const copyMessage = async (message: Message): Promise<void> => {
    await navigator.clipboard.writeText(message.text);
    setCopiedId(message.id);
    window.setTimeout(() => setCopiedId(null), 1600);
  };

  const startNewChat = (): void => {
    setActiveConvId('catching-up');
    setMessages([makeStarter(conversations[0])]);
    setDraft('');
    setIsTyping(false);
  };

  const loadConversation = (convId: string): void => {
    const conv = conversations.find((c) => c.id === convId);
    if (!conv) return;
    setActiveConvId(convId);
    setMessages([makeStarter(conv)]);
    setDraft('');
    setIsTyping(false);
  };

  const activeConv = conversations.find((c) => c.id === activeConvId) ?? conversations[0];

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <aside className={`sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="brand-row">
          <div className="brand-mark"><Sparkles size={22} strokeWidth={2.2} /></div>
          <span className="brand-name">Chingu<span>Ai</span></span>
          <button className="icon-button sidebar-toggle" onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar">
            <PanelLeftClose size={17} />
          </button>
        </div>

        <button className="new-chat-button" onClick={startNewChat}>
          <Plus size={18} />
          <span>New chat</span>
        </button>

        <div className="sidebar-section">
          <p className="eyebrow">Your space</p>
          <div className="workspace-card">
            <div className="workspace-icon"><Heart size={16} /></div>
            <div><strong>ChinguAi Chat</strong><span>Your friendly buddy</span></div>
            <ChevronDown size={15} className="muted-icon" />
          </div>
        </div>

        <div className="sidebar-section recent-section">
          <p className="eyebrow">Recent chats</p>
          {conversations.map((conv) => (
            <button key={conv.id} className={`chat-history ${conv.id === activeConvId ? 'active-history' : ''}`} onClick={() => loadConversation(conv.id)}>
              {conv.id === 'catching-up' ? <MessageCircle size={16} /> : <Hash size={16} />}
              <span>{conv.title}</span>
              <MoreHorizontal size={16} />
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="status-dot"><span /> Online</div>
          <div className="profile-row"><div className="avatar small-avatar">Y</div><div><strong>You</strong><span>Just chatting</span></div><MoreHorizontal size={17} className="muted-icon" /></div>
        </div>
      </aside>

      <main className="chat-panel">
        <header className="topbar">
          {!isSidebarOpen && <button className="icon-button" onClick={() => setIsSidebarOpen(true)} aria-label="Open sidebar"><Menu size={19} /></button>}
          <div className="conversation-title"><div className="bot-avatar"><Bot size={19} /></div><div><strong>{activeConv.title}</strong><span><span className="online-pip" /> ChinguAi is ready to chat</span></div></div>
          <div className="top-actions"><span className="secure-label"><Check size={14} /> Friendly mode</span><button className="icon-button" aria-label="Help"><CircleHelp size={19} /></button><button className="icon-button" aria-label="More options"><MoreHorizontal size={19} /></button></div>
        </header>

        <section className="chat-content">
          <div className="welcome-block"><div className="welcome-orb"><Sun size={24} /></div><p className="eyebrow">Your chat buddy</p><h1>Hey there!<br /><em>Let's chat.</em></h1><p className="welcome-copy">Talk to me about your day, food, movies, weekend plans, or just say hi. I'm here to keep the conversation going.</p></div>

          <div className="messages-list">
            {messages.map((message) => (
              <article className={`message-row ${message.role === 'user' ? 'user-row' : ''}`} key={message.id}>
                <div className={`avatar ${message.role === 'bot' ? 'bot-message-avatar' : 'user-message-avatar'}`}>{message.role === 'bot' ? <Bot size={17} /> : <User size={16} />}</div>
                <div className="message-body"><div className="message-meta"><strong>{message.role === 'bot' ? 'ChinguAi' : 'You'}</strong><span>{message.time}</span></div><div className="message-bubble">{message.text}</div>{message.role === 'bot' && <div className="message-tools"><button onClick={() => void copyMessage(message)}>{copiedId === message.id ? <Check size={13} /> : <Copy size={13} />} {copiedId === message.id ? 'Copied' : 'Copy'}</button></div>}</div>
              </article>
            ))}
            {isTyping && <div className="message-row"><div className="avatar bot-message-avatar"><Bot size={17} /></div><div className="message-body"><div className="message-meta"><strong>ChinguAi</strong><span>typing...</span></div><div className="message-bubble typing-bubble"><i /><i /><i /></div></div></div>}
          </div>

          <div className="composer-area"><p className="eyebrow prompt-label">Try asking</p><div className="prompt-chips">{quickPrompts.map((prompt) => <button key={prompt} onClick={() => sendMessage(prompt)}>{prompt}</button>)}</div><form className="composer" onSubmit={handleSubmit}><button type="button" className="attach-button" aria-label="Attach a file"><Paperclip size={19} /></button><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Say hi to ChinguAi..." aria-label="Message ChinguAi" /><button className="send-button" type="submit" disabled={!draft.trim() || isTyping} aria-label="Send message"><Send size={18} /></button></form><div className="composer-hint"><span><Clock3 size={13} /> ChinguAi replies with friendly, fun responses</span><span>{messageCountLabel}</span></div></div>
        </section>
      </main>

      <button className="mobile-close" onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar"><X size={18} /></button>
    </div>
  );
}

export default App;
