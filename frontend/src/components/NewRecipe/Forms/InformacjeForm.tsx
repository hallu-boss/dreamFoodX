// InformacjeForm.tsx - Komponent formularza informacji
import React, { useState } from 'react';
import { UploadIcon } from '../../../Icons';
import { ArrowRight } from 'lucide-react';
import { NewRecipeInfo } from '../../../pages/NewRecipe';

interface InformacjeFormProps {
  formData: NewRecipeInfo;
  recipeImage?: File | null;
  handleRecipeImageChange: (image: File) => void;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
      console.log(image);
      setPreviewUrl(URL.createObjectURL(image));
    }
  };

  const handleImageClick = () => {
    document.getElementById('image')?.click();
  };

  const handleVisibilityToggle = () => {
    const fakeEvent = {
      target: {
        name: 'visible',
        value: !formData.visible ? 'true' : 'false',
        type: 'checkbox',
        checked: !formData.visible,
      } as HTMLInputElement,
    } as React.ChangeEvent<HTMLInputElement>;

    handleInputChange(fakeEvent);
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

      <div className="flex items-end gap-3">
        <button className="mb-1" onClick={handleVisibilityToggle}>
          <span
            className={`
      inline-flex 
      items-center 
      px-2 py-1 
      rounded-full 
      border-2 
      transition-colors duration-200
      ${
        formData.visible
          ? 'bg-plant-50 hover:bg-plant-100 border-plant-200'
          : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
      }
      `}
          >
            {formData.visible ? '🌐 Publiczny' : '🔒 Prywatny'}
          </span>
        </button>

        <div className="flex-1">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Cena produktu *
          </label>
          <div className="relative">
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              disabled={!formData.visible}
              className={`
          w-full px-3 py-2 pr-12 border border-gray-300 rounded-md shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${
            !formData.visible
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : ''
          }
        `}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span
                className={`text-sm font-medium ${
                  !formData.visible ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                zł
              </span>
            </div>
          </div>
        </div>
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
