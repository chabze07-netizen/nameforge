'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
  { id: 'gaming', name: '🎮 Gaming', icon: '🎮' },
  { id: 'band', name: '🎸 Band', icon: '🎸' },
  { id: 'dev', name: '💻 Developer', icon: '💻' },
  { id: 'youtube', name: '📺 YouTube', icon: '📺' },
  { id: 'stream', name: '📱 Stream', icon: '📱' },
]

const adjectives: Record<string, string[]> = {
  gaming: ['Shadow', 'Dark', 'Silent', 'Fierce', 'Phantom', 'Neon', 'Cyber', 'Iron', 'Storm', 'Blaze', 'Frost', 'Venom', 'Ghost', 'Raven', 'Wolf', 'Dragon', 'Phoenix', 'Viper', 'Hawk', 'Tiger'],
  band: ['Electric', 'Midnight', 'Crimson', 'Neon', 'Velvet', 'Thunder', 'Iron', 'Golden', 'Silver', 'Broken', 'Wild', 'Lost', 'Running', 'Flying', 'Dancing'],
  dev: ['Code', 'Byte', 'Pixel', 'Data', 'Cloud', 'Net', 'Web', 'Tech', 'Smart', 'Fast', 'Open', 'Free', 'Swift', 'Clean', 'Pure'],
  youtube: ['The', 'Epic', 'Real', 'Official', 'Mr', 'Ms', 'Super', 'Mega', 'Ultra', 'Pro'],
  stream: ['Live', 'Real', 'Pure', 'Epic', 'Chill', 'Cool', 'Vibe', 'Flow', 'Zone', 'Mode'],
}

const nouns: Record<string, string[]> = {
  gaming: ['Wolf', 'Ninja', 'Knight', 'Hunter', 'Slayer', 'Viper', 'Falcon', 'Bear', 'Tiger', 'Eagle', 'Raven', 'Fox', 'Ghost', 'Shadow', 'Storm', 'Flame', 'Frost', 'Blade', 'Axe', 'Sword'],
  band: ['Riders', 'Sons', 'Rebels', 'Kings', 'Queens', 'Hearts', 'Dreams', 'Nights', 'Stars', 'Fire', 'Rain', 'Thunder', 'Dragons', 'Wolves', 'Angels'],
  dev: ['Master', 'Wizard', 'Ninja', 'Guru', 'Hacker', 'Coder', 'Builder', 'Maker', 'Craftsman', 'Architect', 'Surgeon', 'Artist', 'Genius', 'Sage', 'Owl'],
  youtube: ['Channel', 'TV', 'Zone', 'Hub', 'World', 'Show', 'Life', 'Gaming', 'Plays', 'Daily', 'Vlog', 'Cast', 'Media', 'Network', 'Tube'],
  stream: ['Gaming', 'Plays', 'Zone', 'Hub', 'Vibes', 'TV', 'Cast', 'Stream', 'Live', 'Club', 'Squad', 'Crew', 'Army', 'Fam', 'Squad'],
}

const suffixes = ['X', 'Pro', 'King', 'Lord', 'Master', 'Prime', 'Edge', 'Core', 'Lab', 'Hub', 'HQ', 'FX', 'YT', 'TV', 'GG', 'OP', 'GOAT', 'MVP', 'Z', 'Zero', 'One', 'Bot', 'AI']

function generateName(category: string, useSuffix: boolean = false): string {
  const adjList = adjectives[category] || adjectives.gaming
  const nounList = nouns[category] || nouns.gaming
  
  const adj = adjList[Math.floor(Math.random() * adjList.length)]
  const noun = nounList[Math.floor(Math.random() * nounList.length)]
  
  if (useSuffix && Math.random() > 0.5) {
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
    return `${adj}${noun}${suffix}`
  }
  
  return `${adj}${noun}`
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('gaming')
  const [names, setNames] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const generate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const newNames = Array(12).fill(null).map(() => generateName(selectedCategory, true))
      setNames(newNames)
      setIsGenerating(false)
    }, 300)
  }

  const copyToClipboard = async (name: string, index: number) => {
    await navigator.clipboard.writeText(name)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 1500)
  }

  useEffect(() => {
    generate()
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="p-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          NameForge
        </h1>
        <p className="text-slate-400 mt-2">AI-Powered Name Generator</p>
      </header>

      {/* Ad Banner Top */}
      <div className="max-w-4xl mx-auto mb-8 px-4">
        <div className="bg-slate-800/50 rounded-lg h-24 flex items-center justify-center text-slate-500 text-sm border border-slate-700">
          Advertisement Banner (Google AdSense)
        </div>
      </div>

      {/* Category Selector */}
      <div className="max-w-2xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="text-center mb-8">
        <button
          onClick={generate}
          disabled={isGenerating}
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-bold text-lg text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          {isGenerating ? 'Generating...' : '✨ Generate Names'}
        </button>
      </div>

      {/* Names Grid */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <AnimatePresence mode="popLayout">
            {names.map((name, index) => (
              <motion.button
                key={`${name}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.02 }}
                onClick={() => copyToClipboard(name, index)}
                className="p-4 bg-slate-800/80 backdrop-blur rounded-xl border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-700/80 transition-all group"
              >
                <span className="text-white font-medium block truncate">{name}</span>
                <span className="text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                  {copiedIndex === index ? '✓ Copied!' : 'Click to copy'}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Ad Banner Bottom */}
      <div className="max-w-4xl mx-auto mb-8 px-4">
        <div className="bg-slate-800/50 rounded-lg h-24 flex items-center justify-center text-slate-500 text-sm border border-slate-700">
          Advertisement Banner (Google AdSense)
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-500 text-sm">
        <p>Built by Cyrus 🤖 | Deploy your own at Vercel</p>
      </footer>
    </div>
  )
}
