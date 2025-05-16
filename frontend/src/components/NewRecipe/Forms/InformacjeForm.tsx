// InformacjeForm.tsx - Komponent formularza informacji
import React, { useState } from "react";
import { UploadIcon } from "../../../Icons";
import { ArrowRight } from "lucide-react";
import { NewRecipeInfo } from "../../../pages/NewRecipe";

interface InformacjeFormProps {
  formData: NewRecipeInfo;
  recipeImage?: File | null;
  handleRecipeImageChange: (image: File) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleNextStep: () => void;
}

const InformacjeForm: React.FC<InformacjeFormProps> = ({
  formData,
  recipeImage,
  handleRecipeImageChange,
  handleInputChange,
  handleNextStep,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    recipeImage ? URL.createObjectURL(recipeImage) : null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      handleRecipeImageChange(image);
      console.log(image)
      setPreviewUrl(URL.createObjectURL(image));
    }
  };

  const handleImageClick = () => {
    document.getElementById("image")?.click();
  };

  return (
    <div className="space-y-6 text-gray-600">
      <h2 className="text-2xl font-bold mb-6">Informacje</h2>

      <div className="space-y-2">
        <label htmlFor="title" className="block font-medium">
          Nazwa
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded bg-gray-50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block font-medium">
          Opis
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={5}
          className="w-full p-2 border rounded bg-gray-50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="block font-medium">
          Kategoria
        </label>
        <div className="relative">
          <select
            id="category"
            name="category"
            value={formData.category}
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
        <label htmlFor="price" className="block font-medium">
          Cena
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          pattern="\d*"
          placeholder="123"
          onChange={handleInputChange}
          className="w-full p-2 border rounded bg-gray-50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="image" className="block font-medium">
          Obraz
        </label>
        <div
          className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 cursor-pointer"
          onClick={handleImageClick}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Podgląd"
              className="max-h-48 rounded object-contain"
            />
          ) : (
            <div className="text-center">
              <UploadIcon />
              <p className="mt-1 text-sm text-gray-500">
                Kliknij, aby wybrać lub przeciągnij obraz
              </p>
            </div>
          )}
        </div>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <div className="flex justify-end mt-8">
        <button onClick={handleNextStep} className="btn flex items-center">
          Dalej
          <ArrowRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default InformacjeForm;
