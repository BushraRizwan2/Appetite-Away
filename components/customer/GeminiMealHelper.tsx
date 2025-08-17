
import React, { useState } from 'react';
import { getMealSuggestion } from '../../services/geminiService';
import Button from '../shared/Button';
import Spinner from '../shared/Spinner';
import { ICONS } from '../../constants';

const GeminiMealHelper: React.FC = () => {
  const [craving, setCraving] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSuggestion = async () => {
    if (!craving) return;
    setLoading(true);
    setSuggestion('');
    const result = await getMealSuggestion(craving);
    setSuggestion(result);
    setLoading(false);
  };

  return (
    <div className="p-4 bg-gradient-to-br from-rose-100 to-amber-100 dark:from-rose-900/50 dark:to-amber-900/50 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-rose-500">{ICONS.sparkles}</span>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Can't decide?</h3>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Tell us what you're feeling, and we'll suggest something!</p>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={craving}
          onChange={(e) => setCraving(e.target.value)}
          placeholder="e.g., 'something warm and comforting'"
          className="flex-grow px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200"
        />
        <Button onClick={handleSuggestion} disabled={loading || !craving}>
          {loading ? <Spinner size="sm" /> : 'Suggest Meal'}
        </Button>
      </div>

      {suggestion && (
        <div className="mt-4 p-3 bg-white/70 dark:bg-black/50 rounded-md">
          <p className="text-sm text-slate-600 dark:text-slate-300">How about trying:</p>
          <p className="font-bold text-rose-600 dark:text-rose-400 text-center text-lg">{suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiMealHelper;