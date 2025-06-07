import React from 'react';
import {
  ArrowLeft,
  Shield,
  Eye,
  Lock,
  FileText,
  Mail,
  Calendar,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Powrót
          </button>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Polityka Prywatności
            </h1>
            <p className="text-gray-600">
              Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          {/* Introduction */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Wprowadzenie
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Niniejsza Polityka Prywatności opisuje, w jaki sposób DreamFood
              ("my", "nas", "nasze") zbiera, używa i chroni Twoje dane osobowe
              podczas korzystania z naszej platformy przepisów kulinarnych.
              Szanujemy Twoją prywatność i zobowiązujemy się do ochrony Twoich
              danych osobowych zgodnie z RODO i obowiązującymi przepisami prawa.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Jakie dane zbieramy
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Dane podawane przez użytkownika:
                </h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Imię i nazwisko</li>
                  <li>• Adres email</li>
                  <li>• Hasło (zaszyfrowane)</li>
                  <li>• Informacje o preferencjach kulinarnych</li>
                  <li>
                    • Treści dodawane przez użytkownika (przepisy, komentarze,
                    oceny)
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Dane zbierane automatycznie:
                </h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Adres IP</li>
                  <li>• Informacje o przeglądarce i urządzeniu</li>
                  <li>
                    • Dane o aktywności na stronie (odwiedzane strony, czas
                    spędzony)
                  </li>
                  <li>• Pliki cookies i podobne technologie</li>
                  <li>• Dane geolokalizacyjne (jeśli wyrażisz zgodę)</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Dane transakcyjne:
                </h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Historia zakupów przepisów</li>
                  <li>• Dane o płatnościach (bez numerów kart)</li>
                  <li>• Faktury i rachunki</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Usage */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Jak wykorzystujemy Twoje dane
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">
                  Podstawowe funkcje serwisu:
                </h3>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Tworzenie i zarządzanie kontem użytkownika</li>
                  <li>• Umożliwienie publikowania i kupowania przepisów</li>
                  <li>• Przetwarzanie płatności</li>
                  <li>• Obsługa klienta i wsparcie techniczne</li>
                  <li>• Zapewnienie bezpieczeństwa platformy</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">
                  Ulepszanie serwisu:
                </h3>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Analiza sposobu korzystania z platformy</li>
                  <li>• Personalizacja treści i rekomendacji</li>
                  <li>• Rozwój nowych funkcjonalności</li>
                  <li>• Optymalizacja wydajności serwisu</li>
                  <li>• Badania i analizy statystyczne</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                Marketing (tylko za zgodą):
              </h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li>• Wysyłanie newslettera z nowymi przepisami</li>
                <li>• Informacje o promocjach i nowościach</li>
                <li>• Spersonalizowane rekomendacje</li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Udostępnianie danych
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>
                  Nie sprzedajemy Twoich danych osobowych third party.
                </strong>
                Możemy udostępniać dane tylko w następujących przypadkach:
              </p>

              <div className="grid gap-4">
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-800">
                    Dostawcy usług:
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Zaufanym partnerom pomagającym w świadczeniu usług (hosting,
                    płatności, analytics)
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-800">
                    Wymogi prawne:
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Gdy jesteśmy zobowiązani prawnie do udostępnienia danych
                    organom ścigania
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-800">
                    Za Twoją zgodą:
                  </h3>
                  <p className="text-gray-700 text-sm">
                    W innych przypadkach tylko po uzyskaniu Twojej wyraźnej
                    zgody
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Pliki cookies
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                Używamy plików cookies i podobnych technologii w następujących
                celach:
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Niezbędne
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Umożliwiają podstawowe funkcje strony (logowanie, koszyk
                    zakupów)
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Analityczne
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Pomagają zrozumieć, jak użytkownicy korzystają ze strony
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Marketingowe
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Umożliwiają personalizację treści i reklam
                  </p>
                </div>
              </div>

              <p className="text-gray-700 text-sm">
                Możesz zarządzać ustawieniami cookies w swojej przeglądarce.
                Pamiętaj, że wyłączenie niektórych cookies może wpłynąć na
                funkcjonalność strony.
              </p>
            </div>
          </section>

          {/* User Rights */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Twoje prawa
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Prawo dostępu:</strong> możesz poprosić o kopię
                    swoich danych
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Prawo do sprostowania:</strong> możesz poprawić
                    nieprawidłowe dane
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Prawo do usunięcia:</strong> możesz poprosić o
                    usunięcie swoich danych
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Prawo do ograniczenia:</strong> możesz ograniczyć
                    przetwarzanie
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Prawo do przenoszenia:</strong> możesz otrzymać dane
                    w formacie strukturalnym
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Prawo sprzeciwu:</strong> możesz sprzeciwić się
                    przetwarzaniu
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Cofnięcie zgody:</strong> możesz cofnąć zgodę w
                    każdym momencie
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Skarga do UODO:</strong> masz prawo złożyć skargę do
                    organu nadzorczego
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-gray-700 text-sm">
                <strong>Jak skorzystać z praw:</strong> Aby skorzystać z
                powyższych praw, skontaktuj się z nami przez email:{' '}
                <strong>privacy@dreamfood.pl</strong>
                lub przez formularz kontaktowy na stronie.
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Bezpieczeństwo danych
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                Stosujemy odpowiednie środki techniczne i organizacyjne w celu
                ochrony Twoich danych osobowych przed nieautoryzowanym dostępem,
                utratą lub zniszczeniem:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800">
                    Środki techniczne:
                  </h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Szyfrowanie danych SSL/TLS</li>
                    <li>• Bezpieczne serwery z certyfikatami</li>
                    <li>• Regularne kopie zapasowe</li>
                    <li>• Monitoring bezpieczeństwa 24/7</li>
                    <li>• Aktualizacje zabezpieczeń</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800">
                    Środki organizacyjne:
                  </h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Ograniczony dostęp do danych</li>
                    <li>• Szkolenia pracowników</li>
                    <li>• Procedury bezpieczeństwa</li>
                    <li>• Kontrole dostępu</li>
                    <li>• Polityki prywatności</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Okres przechowywania danych
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800">
                    Dane konta użytkownika
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Przechowywane do momentu usunięcia konta lub przez 3 lata od
                    ostatniego logowania
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800">
                    Dane transakcyjne
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Przechowywane przez 5 lat zgodnie z wymogami księgowymi
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800">
                    Dane marketingowe
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Przechowywane do momentu cofnięcia zgody lub przez 2 lata od
                    ostatniej aktywności
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800">
                    Logi systemowe
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Przechowywane przez 12 miesięcy w celach bezpieczeństwa
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Children */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Dane dzieci
            </h2>
            <p className="text-gray-700">
              Nasza usługa nie jest przeznaczona dla dzieci poniżej 16. roku
              życia. Nie zbieramy świadomie danych osobowych od dzieci poniżej
              tego wieku. Jeśli dowiesz się, że dziecko przekazało nam dane
              osobowe, skontaktuj się z nami, a usuniemy te informacje z naszych
              serwerów.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Zmiany w polityce prywatności
            </h2>
            <p className="text-gray-700">
              Możemy okresowo aktualizować niniejszą Politykę Prywatności. O
              wszelkich zmianach poinformujemy Cię przez email lub poprzez
              widoczne powiadomienie na naszej stronie. Zachęcamy do regularnego
              przeglądania tej polityki, aby być na bieżąco z tym, jak chronimy
              Twoje informacje.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-orange-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Kontakt
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>
                  Jeśli masz pytania dotyczące tej Polityki Prywatności,
                  skontaktuj się z nami:
                </strong>
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-gray-700">
                    <strong>Email:</strong> privacy@dreamfood.pl
                  </p>
                  <p className="text-gray-700">
                    <strong>Telefon:</strong> +48 123 456 789
                  </p>
                  <p className="text-gray-700">
                    <strong>Adres:</strong> ul. Kulinarna 123, 00-001 Warszawa
                  </p>
                </div>
                <div>
                  <p className="text-gray-700">
                    <strong>Inspektor Ochrony Danych:</strong>
                  </p>
                  <p className="text-gray-700">iod@dreamfood.pl</p>
                  <p className="text-gray-700 text-sm mt-2">
                    Czas odpowiedzi: do 30 dni roboczych
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
