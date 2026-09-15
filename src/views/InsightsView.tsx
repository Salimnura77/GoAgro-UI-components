import React, { useState } from 'react';
import { ARTICLES } from '../data/mockData';

interface InsightsViewProps {
  onBack: () => void;
  onOpenArbitrage: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  onBack,
  onOpenArbitrage,
  onShowToast,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const heroArticle = ARTICLES[0];
  const listArticles = ARTICLES.slice(1);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    onShowToast('Subscribed to Dawanau 06:00 AM Morning Wire!', 'mark_email_read');
  };

  return (
    <div className="flex flex-col w-full space-y-4 pb-12">
      {/* Top Nav Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] text-[#4edea3] hover:text-[#75ff9e] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back</span>
        </button>
        <span className="text-[10px] font-mono text-[#00e676] bg-[#262b29] px-2 py-0.5 rounded">
          DAILY INTELLIGENCE BRIEF
        </span>
      </div>

      <div className="space-y-1">
        <h2 className="font-['Plus_Jakarta_Sans'] text-[22px] font-bold text-[#dfe4e0] tracking-tight">
          GoAgro Insights
        </h2>
        <p className="text-[12px] text-[#bacbb9]">
          Wholesale agricultural commodity intelligence, corridor arbitrage spreads, and highway haulage policies.
        </p>
      </div>

      {/* Hero Editorial Card */}
      <div className="rounded-2xl bg-[#181d1a] overflow-hidden border border-[#262b29] shadow-2xl">
        <div className="relative h-48 w-full bg-[#262b29]">
          <img
            src={heroArticle.image}
            alt={heroArticle.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181d1a] via-black/40 to-transparent"></div>
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-md bg-[#00e676] text-[#00210b] text-[10px] font-bold uppercase tracking-wide">
              {heroArticle.category}
            </span>
          </div>
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-[#bacbb9]">
            <span>{heroArticle.readTime}</span>
            <span>{heroArticle.timeAgo}</span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] font-bold text-[#dfe4e0] leading-snug">
            {heroArticle.title}
          </h3>
          <p className="text-[12px] text-[#bacbb9] leading-relaxed">
            {heroArticle.snippet}
          </p>

          {/* Telemetry Pill Deck */}
          <div className="grid grid-cols-3 gap-2 bg-[#0a0f0d] p-2.5 rounded-xl border border-[#262b29] text-[11px] font-mono">
            <div>
              <span className="text-[#859585] text-[10px] block uppercase">Spot Spread</span>
              <span className="text-[#75ff9e] font-bold">{heroArticle.spotSpread}</span>
            </div>
            <div>
              <span className="text-[#859585] text-[10px] block uppercase">Corridor Vol</span>
              <span className="text-[#dfe4e0] font-bold">{heroArticle.corridorVol}</span>
            </div>
            <div>
              <span className="text-[#859585] text-[10px] block uppercase">Supply Risk</span>
              <span className="text-[#ffb4ab] font-bold">{heroArticle.supplyRisk}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#262b29] flex items-center justify-center text-[#4edea3] font-bold text-[12px]">
                {heroArticle.authorInitials}
              </div>
              <div>
                <span className="text-[12px] font-bold text-[#dfe4e0] block">{heroArticle.author}</span>
                <span className="text-[10px] text-[#bacbb9]">{heroArticle.authorRole}</span>
              </div>
            </div>
            <button
              onClick={onOpenArbitrage}
              className="px-3 py-1.5 rounded-lg bg-[#262b29] text-[#75ff9e] text-[11px] font-semibold flex items-center gap-1 hover:bg-[#313633]"
            >
              <span>View Spread</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Corridor Realization Index Bar */}
      <div className="rounded-xl bg-[#181d1a] p-4 space-y-3 border border-[#262b29]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#4edea3]">
            AgriGo Corridor Index Net Realization
          </span>
          <span className="text-[10px] font-mono text-[#00e676]">24H WEIGHTED</span>
        </div>

        <div className="space-y-2.5 text-[12px]">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[#dfe4e0] font-medium">Kano ➔ Lagos (Mile 12)</span>
              <span className="text-[#75ff9e] font-mono font-bold">+₦210/kg spread</span>
            </div>
            <div className="w-full bg-[#262b29] h-2 rounded-full overflow-hidden">
              <div className="bg-[#00e676] h-full rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[#dfe4e0] font-medium">Gboko ➔ Lagos Port Terminal</span>
              <span className="text-[#75ff9e] font-mono font-bold">+₦190/kg spread</span>
            </div>
            <div className="w-full bg-[#262b29] h-2 rounded-full overflow-hidden">
              <div className="bg-[#4edea3] h-full rounded-full" style={{ width: '86%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[#dfe4e0] font-medium">Zaria ➔ Dei-Dei Feed Hub Abuja</span>
              <span className="text-[#75ff9e] font-mono font-bold">+₦170/kg spread</span>
            </div>
            <div className="w-full bg-[#262b29] h-2 rounded-full overflow-hidden">
              <div className="bg-[#80f9c8] h-full rounded-full" style={{ width: '89%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Intelligence Articles List */}
      <div className="space-y-3">
        <span className="text-[13px] font-bold text-[#dfe4e0]">Latest Intelligence Dispatches</span>

        {listArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => onShowToast(`Loaded: ${art.title}`, 'article')}
            className="p-3 bg-[#181d1a] rounded-xl border border-[#262b29] flex items-center gap-3 cursor-pointer hover:bg-[#1c211e] transition-colors"
          >
            <img
              src={art.image}
              alt={art.title}
              className="w-16 h-16 rounded-lg object-cover bg-[#262b29] flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[9px] uppercase tracking-wider text-[#4edea3] font-bold block">
                {art.category}
              </span>
              <h4 className="text-[13px] font-semibold text-[#dfe4e0] line-clamp-2 leading-snug mt-0.5">
                {art.title}
              </h4>
              <div className="flex items-center gap-2 text-[10px] text-[#bacbb9] mt-1">
                <span>{art.author}</span>
                <span>•</span>
                <span>{art.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dawanau Morning Wire Subscription */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-[#181d1a] to-[#1c211e] border border-[#00e676]/30 space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00e676] text-[20px]">mail</span>
          <h4 className="font-['Plus_Jakarta_Sans'] text-[15px] font-bold text-[#dfe4e0]">
            The 06:00 Dawanau Morning Wire
          </h4>
        </div>
        <p className="text-[12px] text-[#bacbb9]">
          Direct WhatsApp / Email dispatch on wholesale grain prices, haulage toll alerts, and port offloading delays before the bells ring.
        </p>

        {subscribed ? (
          <div className="p-2.5 bg-[#0a0f0d] rounded-lg text-center text-[#75ff9e] text-[12px] font-semibold flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>You are subscribed to the 06:00 AM Morning Wire!</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="trader@agrofarm.ng"
              className="flex-1 p-2.5 bg-[#0a0f0d] rounded-lg text-[#dfe4e0] text-[13px] border border-[#262b29] focus:border-[#00e676] focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-[#00e676] text-[#00210b] font-bold text-[12px] rounded-lg shadow-md hover:bg-[#75ff9e] active:scale-95 transition-all"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
