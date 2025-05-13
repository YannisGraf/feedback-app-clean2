import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://woalbnuncsutaefidfdv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvYWxibnVuY3N1dGFlZmlkZmR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNTc1NjYsImV4cCI6MjA2MjczMzU2Nn0.p281yotGGU-TtQc-FdPrzCLCIeIUVfNVYM3I0SA3j38'
);

function App() {
  const [selectedDate, setSelectedDate] = useState('');
  const [meals, setMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [ratings, setRatings] = useState({});
  const [feedback, setFeedback] = useState({});

  const fetchMeals = async (dateStr) => {
    setMeals([]);
    setSelectedMeals([]);
    setRatings({});
    setFeedback({});

    const { data: menus, error: menuError } = await supabase
      .from('menus')
      .select('id')
      .eq('date', dateStr)
      .limit(1);

    if (menuError || !menus || menus.length === 0) {
      console.warn('No menu found for this date');
      return;
    }

    const menuId = menus[0].id;

    const { data: mealsData, error: mealsError } = await supabase
      .from('meals')
      .select('id, name')
      .eq('menu_id', menuId);

    if (mealsError) {
      console.error('Failed to fetch meals:', mealsError.message);
    } else {
      setMeals(mealsData);
    }
  };

  const handleMealToggle = (mealId) => {
    setSelectedMeals((prev) =>
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId]
    );
  };

  const handleSubmit = () => {
    const result = selectedMeals.map((mealId) => {
      const meal = meals.find((m) => m.id === mealId);
      return {
        meal: meal?.name || '',
        rating: ratings[mealId] || null,
        comment: feedback[mealId] || '',
      };
    });

    console.log('Submitted:', { date: selectedDate, meals: result });
    alert('Feedback submitted! (Console only for now)');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Meal Feedback</h1>

      <label className="block mb-2 font-medium">Choose a date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => {
          const dateStr = e.target.value;
          setSelectedDate(dateStr);
          fetchMeals(dateStr);
        }}
        className="w-full border p-2 rounded mb-4"
      />

      {meals.length > 0 && (
        <div className="space-y-4">
          {meals.map((meal) => (
            <div key={meal.id} className="border p-3 rounded bg-white shadow-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedMeals.includes(meal.id)}
                  onChange={() => handleMealToggle(meal.id)}
                />
                <span className="font-semibold">{meal.name}</span>
              </label>

              {selectedMeals.includes(meal.id) && (
                <div className="mt-2 space-y-2">
                  <div>
                    <label className="block text-sm">Rating (1–5):</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={ratings[meal.id] || ''}
                      onChange={(e) =>
                        setRatings({ ...ratings, [meal.id]: e.target.value })
                      }
                      className="w-full border p-1 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Feedback:</label>
                    <textarea
                      rows="2"
                      value={feedback[meal.id] || ''}
                      onChange={(e) =>
                        setFeedback({ ...feedback, [meal.id]: e.target.value })
                      }
                      className="w-full border p-1 rounded"
                    ></textarea>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedMeals.length > 0 && (
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded shadow"
        >
          Submit Feedback
        </button>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
