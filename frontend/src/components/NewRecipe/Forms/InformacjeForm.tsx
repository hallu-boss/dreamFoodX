// InformacjeForm.tsx - Komponent formularza informacji
import React from "react";
import { RecipeFormData } from "../../../types/newRecipe";
import { UploadIcon, ArrowRightIcon } from "../../../Icons";

interface InformacjeFormProps {
  formData: RecipeFormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleNextStep: () => void;
}

const InformacjeForm: React.FC<InformacjeFormProps> = ({
  formData,
  handleInputChange,
  handleNextStep,
}) => {
  return (
    <div className="space-y-6 text-gray-600">
      <h2 className="text-2xl font-bold mb-6">Informacje</h2>

      <div className="space-y-2">
        <label htmlFor="nazwa" className="block font-medium">
          Nazwa
        </label>
        <input
          type="text"
          id="nazwa"
          name="nazwa"
          value={formData.nazwa}
          onChange={handleInputChange}
          className="w-full p-2 border rounded bg-gray-50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="opis" className="block font-medium">
          Opis
        </label>
        <textarea
          id="opis"
          name="opis"
          value={formData.opis}
          onChange={handleInputChange}
          rows={5}
          className="w-full p-2 border rounded bg-gray-50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="kategoria" className="block font-medium">
          Kategoria
        </label>
        <div className="relative">
          <select
            id="kategoria"
            name="kategoria"
            value={formData.kategoria}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-gray-50 appearance-none pr-8"
          >
            <option value="">Wybierz kategorię</option>
            <option value="sniadanie">Śniadanie</option>
            <option value="obiad">Obiad</option>
            <option value="kolacja">Kolacja</option>
            <option value="deser">Deser</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
            ▼
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="obraz" className="block font-medium">
          Obraz
        </label>
        <div className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="text-center">
            <UploadIcon />
            <p className="mt-1 text-sm text-gray-500">
              Kliknij, aby wybrać lub przeciągnij obraz
            </p>
          </div>
          <input
            type="file"
            id="obraz"
            name="obraz"
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button onClick={handleNextStep} className="btn flex items-center">
          Dalej
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default InformacjeForm;