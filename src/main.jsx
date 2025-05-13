import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const mealsByDate = {
  "2025-05-14": ["Grilled Chicken", "Greek Salad", "Lentil Soup"],
  "2025-05-15": ["Pasta Carbonara", "Caesar Salad", "Tomato Soup"],
};

function App() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [ratings, setRatings] = useState({});
  const [feedback, setFeedback] = useState({});

  const handleMealToggle = (meal) => {
    setSelectedMeals((prev) =>
      prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]
    );
  };

  const handleSubmit = () => {
    const result = selectedMeals.map((meal) => ({
      meal,
      rating: ratings[meal] || null,
      comment: feedback[meal] || '',
    }));
    console.log("Submitted:", { date: selectedDate, meals: result });
    alert("Feedback submitted! (Check console for now)");
  };

  const meals = mealsByDate[selectedDate] || [];

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Meal Feedback</h1>

      <label className="block mb-2 font-medium">Choose a date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => {
          setSelectedDate(e.target.value);
          setSelectedMeals([]);
          setRatings({});
          setFeedback({});
        }}
        className="w-full border p-2 rounded mb-4"
      />

      {meals.length > 0 && (
        <div className="space-y-4">
          {meals.map((meal) => (
            <div key={meal} className="border p-3 rounded bg-white shadow-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedMeals.includes(meal)}
                  onChange={() => handleMealToggle(meal)}
                />
                <span className="font-semibold">{meal}</span>
              </label>

              {selectedMeals.includes(meal) && (
                <div className="mt-2 space-y-2">
                  <div>
                    <label className="block text-sm">Rating (1–5):</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={ratings[meal] || ''}
                      onChange={(e) =>
                        setRatings({ ...ratings, [meal]: e.target.value })
                      }
                      className="w-full border p-1 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Feedback:</label>
                    <textarea
                      rows="2"
                      value={feedback[meal] || ''}
                      onChange={(e) =>
                        setFeedback({ ...feedback, [meal]: e.target.value })
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
