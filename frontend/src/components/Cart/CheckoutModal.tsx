import React, { useState } from "react";
import {
  X,
  CreditCard,
  Lock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useCart } from "../../contexts/CartContext";


interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  acceptTerms: boolean;
  newsletter: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { items, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState<'form' | 'processing' | 'success'>('form');
  
  const [formData, setFormData] = useState<PaymentData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    acceptTerms: false,
    newsletter: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Walidacja formularza
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Numer karty (podstawowa walidacja - 16 cyfr)
    const cardNumber = formData.cardNumber.replace(/\s/g, "");
    if (!cardNumber) {
      newErrors.cardNumber = "Numer karty jest wymagany";
    } else if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Numer karty musi mieć 16 cyfr";
    }

    // Data ważności (MM/YY)
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Data ważności jest wymagana";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Format: MM/YY";
    } else {
      // Sprawdź czy data nie jest przeszła
      const [month, year] = formData.expiryDate.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      if (parseInt(year) < currentYear || 
          (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = "Karta jest przeterminowana";
      }
    }

    // CVV
    if (!formData.cvv) {
      newErrors.cvv = "CVV jest wymagany";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV musi mieć 3-4 cyfry";
    }

    // Regulamin
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Musisz zaakceptować regulamin";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Formatowanie numeru karty (dodaje spacje co 4 cyfry)
  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const groups = numbers.match(/.{1,4}/g);
    return groups ? groups.join(" ") : numbers;
  };

  // Formatowanie daty ważności (MM/YY)
  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length >= 2) {
      return numbers.substring(0, 2) + "/" + numbers.substring(2, 4);
    }
    return numbers;
  };

  // Obsługa zmian w formularzu
  const handleInputChange = (field: keyof PaymentData, value: string | boolean) => {
    let processedValue = value;

    // Specjalne formatowanie dla niektórych pól
    if (field === "cardNumber" && typeof value === "string") {
      processedValue = formatCardNumber(value);
    } else if (field === "expiryDate" && typeof value === "string") {
      processedValue = formatExpiryDate(value);
    } else if (field === "cvv" && typeof value === "string") {
      processedValue = value.replace(/\D/g, "").substring(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [field]: processedValue,
    }));

    // Usuń błąd dla tego pola
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Symulacja procesu płatności
  const processPayment = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      // Symulacja opóźnienia API
      setTimeout(() => {
        // 90% szans na sukces (dla demonstracji)
        resolve(Math.random() > 0.1);
      }, 3000);
    });
  };

  // Obsługa przesłania formularza
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setCurrentStep('processing');
    setIsProcessing(true);

    try {
      const success = await processPayment();
      
      if (success) {
        setCurrentStep('success');
        setPaymentSuccess(true);
        await clearCart();
        
        // Wywołaj callback sukcesu po krótkim opóźnieniu
        setTimeout(() => {
          onSuccess?.();
        }, 2000);
      } else {
        // Symulacja błędu płatności
        setErrors({ general: "Płatność została odrzucona. Spróbuj ponownie." });
        setCurrentStep('form');
      }
    } catch (error) {
      setErrors({ general: "Wystąpił błąd podczas przetwarzania płatności." });
      setCurrentStep('form');
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset stanu przy zamknięciu
  const handleClose = () => {
    if (!isProcessing) {
      setCurrentStep('form');
      setPaymentSuccess(false);
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Finalizacja zamówienia
          </h2>
          {!isProcessing && (
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Zawartość modala */}
        <div className="p-6">
          {currentStep === 'form' && (
            <>
              {/* Podsumowanie zamówienia */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">
                  Podsumowanie zamówienia
                </h3>
                <div className="text-sm text-gray-600 mb-2">
                  {items.length} {items.length === 1 ? 'przepis' : 'przepisów'}
                </div>
                <div className="text-lg font-bold text-green-600">
                  {total.toFixed(2)} zł
                </div>
              </div>

              {/* Błąd ogólny */}
              {errors.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-sm text-red-700">{errors.general}</span>
                </div>
              )}

              {/* Formularz */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Dane karty */}
                <div>
                  <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Dane karty płatniczej
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Numer karty
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          errors.cardNumber ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      {errors.cardNumber && (
                        <p className="text-sm text-red-600 mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Data ważności
                        </label>
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                            errors.expiryDate ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        {errors.expiryDate && (
                          <p className="text-sm text-red-600 mt-1">{errors.expiryDate}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                            errors.cvv ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="123"
                          maxLength={4}
                        />
                        {errors.cvv && (
                          <p className="text-sm text-red-600 mt-1">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checkboxy */}
                <div className="space-y-3">
                  <div>
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
                        className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Akceptuję{" "}
                        <a href="#" className="text-orange-600 hover:text-orange-700">
                          regulamin
                        </a>{" "}
                        i{" "}
                        <a href="#" className="text-orange-600 hover:text-orange-700">
                          politykę prywatności
                        </a>
                      </span>
                    </label>
                    {errors.acceptTerms && (
                      <p className="text-sm text-red-600 mt-1">{errors.acceptTerms}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.newsletter}
                        onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                        className="mt-1 w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">
                        Chcę otrzymywać newsletter z nowymi przepisami
                      </span>
                    </label>
                  </div>
                </div>

                {/* Bezpieczeństwo */}
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                  <Lock className="w-4 h-4 text-green-600" />
                  <span>Twoje dane są bezpiecznie szyfrowane</span>
                </div>

                {/* Przyciski */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Zapłać {total.toFixed(2)} zł
                  </button>
                </div>
              </form>
            </>
          )}

          {currentStep === 'processing' && (
            <div className="text-center py-8">
              <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Przetwarzanie płatności...
              </h3>
              <p className="text-gray-600">
                Proszę czekać, nie zamykaj tej strony
              </p>
            </div>
          )}

          {currentStep === 'success' && (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Płatność zakończona pomyślnie!
              </h3>
              <p className="text-gray-600 mb-4">
                Dziękujemy za zakup. Przepisy zostały dodane do Twojego konta.
              </p>
              <p className="text-sm text-gray-500">
                Potwierdzenie zakupu zostanie wysłane na Twój adres email.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;