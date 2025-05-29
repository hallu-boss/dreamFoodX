import { useNavigate, useParams } from "react-router-dom";
import { components } from "../types/api";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../App";
import { ArrowLeft, ArrowRight, Pause, Play, RefreshCw, Thermometer, RotateCw, Plus, ArrowRightToLine } from "lucide-react";
type GetApiRecipePlayIdResponse = components["schemas"]["GetApiRecipePlayIdResponse"];

export function RecipePlayPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState<GetApiRecipePlayIdResponse | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState("00:00");
  const [initialTimerSet, setInitialTimerSet] = useState(false);

  const timerSpeed = 20;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/recipe/play/${id}`);
        const data = (await response.json()) as GetApiRecipePlayIdResponse;
        setRecipe(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  useEffect(() => {
    // Reset timer state when changing steps
    setTimerRunning(false);
    setInitialTimerSet(false);
  }, [currentStepIndex]);

  useEffect(() => {
    // Setup timer for COOKING steps
    if (!recipe || !recipe.steps) return;

    const currentStep = recipe.steps[currentStepIndex];
    if (currentStep?.stepType === "COOKING" && currentStep.time && !initialTimerSet) {
      setRemainingTime(currentStep.time);
      setInitialTimerSet(true);
    }
  }, [recipe, currentStepIndex, initialTimerSet]);

  useEffect(() => {
    // Timer countdown logic
    if (!timerRunning) return;

    const timerInterval = setInterval(() => {
      setRemainingTime(prevTime => {
        const [minutes, seconds] = prevTime.split(":").map(Number);

        // Calculate total seconds and decrement (uwzględniamy prędkość)
        let totalSeconds = minutes * 60 + seconds;
        if (totalSeconds <= 0) {
          clearInterval(timerInterval);
          setTimerRunning(false);
          return "00:00";
        }

        // Odejmujemy sekundy zgodnie z prędkością
        totalSeconds -= 1;

        // Zapobiegamy ujemnym wartościom
        if (totalSeconds < 0) totalSeconds = 0;

        // Convert back to mm:ss format
        const newMinutes = Math.floor(totalSeconds / 60);
        const newSeconds = totalSeconds % 60;

        return `${String(newMinutes).padStart(2, "0")}:${String(newSeconds).padStart(2, "0")}`;
      });
    }, 1000 / timerSpeed);

    return () => clearInterval(timerInterval);
  }, [timerRunning, timerSpeed]);

  const toggleTimer = () => {
    setTimerRunning(prev => !prev);
  };

  // Funkcja do resetowania timera
  const resetTimer = () => {
    if (!recipe || !recipe.steps) return;

    const currentStep = recipe.steps[currentStepIndex];
    if (currentStep?.stepType === "COOKING" && currentStep.time) {
      setRemainingTime(currentStep.time);
      // Opcjonalnie można zatrzymać timer przy resecie
      setTimerRunning(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!recipe || !recipe.steps || recipe.steps.length === 0) return <div>Recipe not found.</div>;

  const currentStep = recipe.steps[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === recipe.steps.length - 1;

  return (
    <div className="relative min-h-screen bg-amber-50 py-4">
      <div className="w-[95%] h-[800px] flex flex-row justify-between items-center mx-auto px-6 py-8 bg-white rounded-md text-gray-500">
        {!isFirst ? (
          <ArrowLeft
            className="w-10 h-10 text-plant-500 hover:text-gray-600 cursor-pointer"
            onClick={() => setCurrentStepIndex(i => i - 1)}
          />
        ) : (
          <div className="w-10 h-10" />
        )}
        <div className="flex-1 flex flex-col h-full">
          <h2 className="text-6xl px-6 py-8 text-gray-500 text-center bg-gray-300 rounded-t-md">
            {currentStep?.title}
          </h2>
          {currentStep?.stepType === "ADD_INGREDIENT" && (
            <div className="flex flex-col justify-start pt-[200px] items-center text-center h-full bg-gray-100 rounded-b-md">
              <div className="flex items-center justify-center gap-2 text-5xl font-medium bg-plant-100 px-6 py-3 rounded-lg">
                <Plus className="w-10 h-10 text-plant-500" />
                <span>{currentStep.ingredient?.title} {currentStep.amount}{currentStep.ingredient?.unit}</span>
              </div>
            </div>
          )}

          {currentStep?.stepType === "COOKING" && (
            <div className="flex flex-col justify-start pt-[12%] text-center h-full bg-gray-100 rounded-b-md">
              <div>
                <h3 className="text-4xl mb-8">{currentStep.description}</h3>

                {/* Informacje o temperaturze i prędkości ostrzy */}
                <div className="flex justify-center gap-12 mb-12">
                  {currentStep.temperature && (
                    <div className="flex items-center text-orange-500 gap-2 text-2xl font-medium bg-orange-100 px-6 py-3 rounded-lg">
                      <Thermometer className="w-8 h-8" />
                      <span>Temperatura: {currentStep.temperature * 18}°C</span>
                    </div>
                  )}

                  {currentStep.mixSpeed && (
                    <div className="flex items-center text-blue-500 gap-2 text-2xl font-medium bg-blue-100 px-6 py-3 rounded-lg">
                      <RotateCw className="w-8 h-8" />
                      <span>Prędkość ostrzy: {currentStep.mixSpeed}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center">
                  <h4 className="text-6xl mb-8 font-bold">{remainingTime}</h4>
                  <div className="flex items-center gap-4">
                    <button
                      className="flex items-center justify-center p-4 rounded-full bg-plant-500 text-white hover:bg-plant-600 transition-colors"
                      onClick={toggleTimer}
                    >
                      {timerRunning ?
                        <Pause className="w-10 h-10" /> :
                        <Play className="w-10 h-10" />
                      }
                    </button>
                    {remainingTime !== currentStep.time && (
                      <button
                        className="flex items-center justify-center p-4 rounded-full border-2 border-plant-500 text-gray-400 hover:text-white hover:bg-plant-100 hover:border-plant-100 transition-colors"
                        onClick={resetTimer}
                        title="Resetuj timer"
                      >
                        <RefreshCw className="w-10 h-10" />
                      </button>
                    )}
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    Prędkość: {timerSpeed}x
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep.stepType === "DESCRIPTION" && (
            <div className="flex flex-col justify-start pt-[200px] items-center text-center h-full bg-gray-100 rounded-b-md">
              <p className="text-3xl">{currentStep.description}</p>
            </div>
          )}

        </div>
        {!isLast ? (
          <ArrowRight
            className="w-10 h-10 text-plant-500 hover:text-gray-600 cursor-pointer"
            onClick={() => setCurrentStepIndex(i => i + 1)}
          />
        ) : (
          <ArrowRightToLine
            className="w-10 h-10 text-plant-500 hover:text-gray-600 cursor-pointer"
            onClick={() => navigate(`/recipe/${id}`)}
          />
        )}
      </div>
    </div>
  )
}
