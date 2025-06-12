import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import {
  GripVertical,
  Trash2,
  Clock,
  Thermometer,
  Gauge,
  ChefHat,
} from 'lucide-react';
import { NewRecipeStep } from '../../pages/NewRecipe';

interface RecipeStepCardProps {
  step: NewRecipeStep;
  stepNumber: number;
  getIngredientName: (id: number) => string;
  onRemove: () => void;
  id: string;
  isDragOverlay?: boolean;
  isDisabled?: boolean;
}

function RecipeStepCard({
  step,
  stepNumber,
  getIngredientName,
  onRemove,
  id,
  isDragOverlay = false,
  isDisabled = false,
}: RecipeStepCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: isDisabled || isDragOverlay,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getStepIcon = () => {
    switch (step.stepType) {
      case 'ADD_INGREDIENT':
        return <ChefHat className="w-5 h-5 text-blue-500" />;
      case 'COOKING':
        return <Gauge className="w-5 h-5 text-red-500" />;
      case 'DESCRIPTION':
        return (
          <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
            i
          </div>
        );
      default:
        return <div className="w-5 h-5 bg-gray-300 rounded-full" />;
    }
  };

  const getStepTypeLabel = () => {
    switch (step.stepType) {
      case 'ADD_INGREDIENT':
        return 'Dodanie składnika';
      case 'COOKING':
        return 'Gotowanie';
      case 'DESCRIPTION':
        return 'Opis';
      default:
        return 'Krok';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group relative bg-white border rounded-xl shadow-sm transition-all duration-200
        ${isDragging ? 'shadow-lg ring-2 ring-plant-200 opacity-50' : 'hover:shadow-md border-gray-200'}
        ${isDragOverlay ? 'shadow-xl ring-2 ring-plant-300' : ''}
      `}
    >
      {/* Header z numerem kroku i kontrolkami */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-3">
          {/* Numer kroku */}
          <div className="flex-shrink-0 w-8 h-8 bg-plant-100 text-plant-700 rounded-full flex items-center justify-center font-semibold text-sm">
            {stepNumber}
          </div>

          {/* Ikona typu kroku */}
          {getStepIcon()}

          <div>
            <div className="font-semibold text-gray-900">{step.title}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              {getStepTypeLabel()}
            </div>
          </div>
        </div>

        {/* Kontrolki */}
        <div className="flex items-center gap-1">
          {/* Uchwyt do przeciągania */}
          <button
            {...attributes}
            {...listeners}
            disabled={isDisabled}
            className={`
              p-1.5 rounded-md transition-colors duration-200
              ${
                isDisabled
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-grab active:cursor-grabbing'
              }
            `}
            title="Przeciągnij, aby zmienić kolejność"
          >
            <GripVertical size={18} />
          </button>

          {/* Przycisk usunięcia */}
          <button
            onClick={onRemove}
            disabled={isDisabled}
            className={`
              p-1.5 rounded-md transition-colors duration-200
              ${
                isDisabled
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }
            `}
            title="Usuń krok"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Zawartość kroku */}
      <div className="px-4 pb-4">
        {step.stepType === 'ADD_INGREDIENT' && (
          <div className="space-y-2">
            {step.ingredientId && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Składnik:</span>
                <span className="font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  {getIngredientName(step.ingredientId)}
                </span>
              </div>
            )}
            {step.amount && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Ilość:</span>
                <span className="font-medium">{step.amount}</span>
              </div>
            )}
          </div>
        )}

        {step.stepType === 'COOKING' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {step.time && (
              <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
                <Clock className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">Czas</div>
                  <div className="font-medium">{step.time}</div>
                </div>
              </div>
            )}
            {step.temperature && (
              <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
                <Thermometer className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">Temperatura</div>
                  <div className="font-medium">{step.temperature}</div>
                </div>
              </div>
            )}
            {step.mixSpeed && (
              <div className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded-lg">
                <Gauge className="w-4 h-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">Prędkość</div>
                  <div className="font-medium">{step.mixSpeed}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {step.stepType === 'DESCRIPTION' && step.description && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-700 leading-relaxed">
              {step.description}
            </div>
          </div>
        )}
      </div>

      {/* Wskaźnik przeciągania */}
      {isDragging && (
        <div className="absolute inset-0 bg-plant-100 border-2 border-dashed border-plant-300 rounded-xl flex items-center justify-center">
          <div className="text-plant-600 font-medium">Przeciąganie...</div>
        </div>
      )}
    </div>
  );
}

export default RecipeStepCard;
