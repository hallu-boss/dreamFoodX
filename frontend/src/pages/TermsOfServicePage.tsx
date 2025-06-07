import React from 'react';
import {
  ArrowLeft,
  FileText,
  Users,
  ShoppingCart,
  AlertTriangle,
  Scale,
  Shield,
  Gavel,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfServicePage: React.FC = () => {
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
              <FileText className="w-12 h-12 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Regulamin Serwisu
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
                Postanowienia ogólne
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Niniejszy Regulamin określa zasady korzystania z serwisu
                internetowego DreamFood dostępnego pod adresem www.dreamfood.pl
                (dalej: "Serwis", "Platforma"). Serwis jest prowadzony przez
                DreamFood Sp. z o.o. z siedzibą w Warszawie.
              </p>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-gray-700 text-sm">
                  <strong>Ważne:</strong> Korzystając z Serwisu, akceptujesz
                  wszystkie postanowienia niniejszego Regulaminu. Jeśli nie
                  zgadzasz się z którymkolwiek z tych warunków, nie korzystaj z
                  naszego Serwisu.
                </p>
              </div>
            </div>
          </section>

          {/* Definitions */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Definicje
              </h2>
            </div>

            <div className="grid gap-3">
              <div className="border-l-4 border-orange-500 pl-4">
                <strong>Serwis/Platforma:</strong> serwis internetowy DreamFood
                dostępny pod adresem www.dreamfood.pl
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <strong>Użytkownik:</strong> osoba fizyczna korzystająca z
                Serwisu
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <strong>Konto:</strong> indywidualne konto użytkownika w
                Serwisie
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <strong>Przepis:</strong> treść kulinarna publikowana w Serwisie
                przez Użytkowników
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <strong>Zakup:</strong> transakcja płatna dotycząca dostępu do
                Przepisu
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <strong>Autor:</strong> Użytkownik publikujący Przepisy w
                Serwisie
              </div>
            </div>
          </section>

          {/* Account Registration */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Rejestracja i konto użytkownika
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">
                    Wymagania rejestracji:
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      Ukończenie 16. roku życia
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      Podanie prawdziwych danych osobowych
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      Posiadanie ważnego adresu email
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      Akceptacja Regulaminu i Polityki Prywatności
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">
                    Obowiązki użytkownika:
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      Ochrona danych logowania
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      Aktualizacja danych osobowych
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      Informowanie o nieautoryzowanym dostępie
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      Przestrzeganie zasad korzystania z Serwisu
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-gray-700 text-sm">
                  <strong>Ważne:</strong> Każdy Użytkownik może posiadać tylko
                  jedno Konto. Tworzenie wielu Kont przez tę samą osobę jest
                  zabronione i może skutkować zablokowaniem wszystkich Kont.
                </p>
              </div>
            </div>
          </section>

          {/* Content Rules */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Zasady publikowania przepisów
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    ✅ Dozwolone treści:
                  </h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Oryginalne przepisy kulinarne</li>
                    <li>• Własne zdjęcia potraw</li>
                    <li>• Dokładne instrukcje przygotowania</li>
                    <li>• Listy składników z proporcjami</li>
                    <li>• Wskazówki i triki kulinarne</li>
                    <li>• Informacje o wartościach odżywczych</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    ❌ Zabronione treści:
                  </h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Przepisy skopiowane z innych źródeł</li>
                    <li>• Treści naruszające prawa autorskie</li>
                    <li>• Zdjęcia pobrane z internetu</li>
                    <li>• Niepełne lub błędne instrukcje</li>
                    <li>• Treści obraźliwe lub wulgarne</li>
                    <li>• Reklamy i spam</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Prawa autorskie:
                </h3>
                <p className="text-gray-700 text-sm">
                  Publikując Przepis, oświadczasz, że jesteś jego autorem lub
                  posiadasz odpowiednie uprawnienia. Udzielasz Serwisowi
                  niewyłącznej licencji na wyświetlanie, dystrybucję i promocję
                  Twojego Przepisu w ramach Platformy.
                </p>
              </div>
            </div>
          </section>

          {/* Purchases and Payments */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Zakupy i płatności
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">
                    Proces zakupu:
                  </h3>
                  <ol className="space-y-1 text-gray-700 text-sm list-decimal list-inside">
                    <li>Dodanie Przepisu do koszyka</li>
                    <li>Przejście do finalizacji zamówienia</li>
                    <li>Wybór metody płatności</li>
                    <li>Potwierdzenie zakupu</li>
                    <li>Przetworzenie płatności</li>
                    <li>Otrzymanie dostępu do Przepisu</li>
                  </ol>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">
                    Metody płatności:
                  </h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Karty płatnicze (Visa, Mastercard)</li>
                    <li>• Przelewy bankowe</li>
                    <li>• Płatności mobilne</li>
                    <li>• Portfele elektroniczne</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Ceny</h3>
                  <p className="text-gray-700 text-sm">
                    Ceny podane w PLN brutto. Zawierają wszystkie obowiązujące
                    podatki.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Faktury</h3>
                  <p className="text-gray-700 text-sm">
                    Faktury VAT wysyłane automatycznie na email po zakupie.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Dostęp</h3>
                  <p className="text-gray-700 text-sm">
                    Natychmiastowy dostęp do zakupionych Przepisów po płatności.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Refunds */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Prawo odstąpienia i zwroty
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Prawo odstąpienia od umowy:
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  Zgodnie z art. 38 pkt 13 ustawy o prawach konsumenta, prawo
                  odstąpienia od umowy nie przysługuje w przypadku umów o
                  dostarczanie treści cyfrowych, które nie są zapisane na
                  nośniku materialnym, jeżeli spełnianie świadczenia rozpoczęło
                  się za wyraźną zgodą konsumenta przed upływem terminu do
                  odstąpienia od umowy.
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>
                    Oznacza to, że po otrzymaniu dostępu do Przepisu, nie można
                    odstąpić od umowy.
                  </strong>
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-green-500 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Zwrot możliwy:
                  </h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Błąd techniczny uniemożliwiający dostęp</li>
                    <li>• Przepis znacząco różni się od opisu</li>
                    <li>• Podwójna płatność za ten sam Przepis</li>
                    <li>• Przepis narusza prawa autorskie</li>
                  </ul>
                </div>

                <div className="border border-red-500 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Zwrot niemożliwy:
                  </h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Zmiana zdania po zakupie</li>
                    <li>• Nieudane przygotowanie potrawy</li>
                    <li>• Niezadowolenie ze smaku</li>
                    <li>• Posiadanie już podobnego Przepisu</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-gray-700 text-sm">
                  <strong>Procedura zwrotu:</strong> Aby zgłosić wniosek o
                  zwrot, skontaktuj się z nami w ciągu 14 dni od zakupu przez
                  email: zwroty@dreamfood.pl. Czas rozpatrzenia: do 14 dni
                  roboczych.
                </p>
              </div>
            </div>
          </section>

          {/* Revenue Sharing */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Program dla autorów
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Podział przychodów:
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-sm">
                        Autor przepisu:
                      </span>
                      <span className="font-semibold text-green-600">70%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-sm">Platforma:</span>
                      <span className="font-semibold text-orange-600">30%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Wypłaty:</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Wypłaty raz w miesiącu</li>
                    <li>• Minimalna kwota: 50 PLN</li>
                    <li>• Przelew na konto bankowe</li>
                    <li>• Raport szczegółowy w panelu</li>
                  </ul>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Wymagania dla autorów:
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Zweryfikowane konto użytkownika</li>
                    <li>• Podpisana umowa o współpracy</li>
                    <li>• Oryginalne przepisy wysokiej jakości</li>
                    <li>• Przestrzeganie wytycznych jakościowych</li>
                  </ul>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Regularna aktywność na platformie</li>
                    <li>• Odpowiadanie na komentarze użytkowników</li>
                    <li>• Aktualizowanie przepisów w razie potrzeby</li>
                    <li>• Przestrzeganie regulaminu serwisu</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Zakazy i ograniczenia
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Zabronione działania:
                  </h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Łamanie praw autorskich</li>
                    <li>• Publikowanie nieodpowiednich treści</li>
                    <li>• Próby włamania do systemu</li>
                    <li>• Używanie botów i automatyzacji</li>
                    <li>• Tworzenie fałszywych kont</li>
                    <li>• Oszukiwanie w systemie płatności</li>
                    <li>• Spamowanie i reklamy</li>
                    <li>• Dystrybucja złośliwego oprogramowania</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Konsekwencje naruszeń:
                  </h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Ostrzeżenie lub upomnienie</li>
                    <li>• Czasowe zawieszenie konta</li>
                    <li>• Trwałe zablokowanie konta</li>
                    <li>• Usunięcie wszystkich treści</li>
                    <li>• Zatrzymanie wypłat</li>
                    <li>• Powiadomienie organów ścigania</li>
                    <li>• Dochodzenie roszczeń prawnych</li>
                    <li>• Ban IP i urządzeń</li>
                  </ul>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-gray-700 text-sm">
                  <strong>Procedura zgłaszania naruszeń:</strong> Jeśli
                  zauważysz naruszenie regulaminu, skontaktuj się z nami przez
                  email: abuse@dreamfood.pl lub użyj przycisku "Zgłoś" przy
                  danej treści.
                </p>
              </div>
            </div>
          </section>

          {/* Liability */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Odpowiedzialność
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Odpowiedzialność Platformy:
                  </h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Zapewnienie dostępności Serwisu</li>
                    <li>• Ochrona danych osobowych</li>
                    <li>• Bezpieczeństwo płatności</li>
                    <li>• Moderacja treści</li>
                    <li>• Wsparcie techniczne</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Odpowiedzialność Użytkownika:
                  </h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Treści publikowane na Platformie</li>
                    <li>• Przestrzeganie regulaminu</li>
                    <li>• Bezpieczeństwo konta</li>
                    <li>• Prawdziwość danych</li>
                    <li>• Konsekwencje własnych działań</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Wyłączenia odpowiedzialności:
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  Platforma nie ponosi odpowiedzialności za:
                </p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>
                    • Skutki zdrowotne wynikające z przygotowania potraw według
                    przepisów
                  </li>
                  <li>• Treści publikowane przez Użytkowników</li>
                  <li>
                    • Przerwy w dostępności Serwisu z przyczyn technicznych
                  </li>
                  <li>
                    • Straty wynikające z nieprawidłowego użytkowania Platformy
                  </li>
                  <li>• Działania osób trzecich</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Final Provisions */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Gavel className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Postanowienia końcowe
              </h2>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">
                    Zmiany regulaminu:
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Zastrzegamy sobie prawo do zmiany Regulaminu. O zmianach
                    informujemy z 30-dniowym wyprzedzeniem przez email i
                    powiadomienie w Serwisie.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">
                    Prawo właściwe:
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Regulamin podlega prawu polskiemu. Wszelkie spory
                    rozstrzygane są przez sądy właściwe dla siedziby Platformy.
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Rozwiązywanie sporów:
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">
                      1. Negocjacje
                    </h4>
                    <p className="text-gray-600 text-xs">
                      Bezpośredni kontakt z obsługą klienta
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">
                      2. Mediacja
                    </h4>
                    <p className="text-gray-600 text-xs">
                      Polubowne rozwiązanie przez mediatora
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm">
                      3. Sąd
                    </h4>
                    <p className="text-gray-600 text-xs">
                      Postępowanie sądowe w ostateczności
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Platforma ODR:
                </h3>
                <p className="text-gray-700 text-sm">
                  Konsumenci mogą skorzystać z internetowej platformy ODR
                  dostępnej pod adresem:
                  <a
                    href="http://ec.europa.eu/consumers/odr/"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    ec.europa.eu/consumers/odr/
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-orange-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Kontakt
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>DreamFood Sp. z o.o.</strong>
                </p>
                <p className="text-gray-700">ul. Kulinarna 123</p>
                <p className="text-gray-700">00-001 Warszawa</p>
                <p className="text-gray-700">NIP: 123-456-78-90</p>
                <p className="text-gray-700">REGON: 123456789</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Kontakt:</strong>
                </p>
                <p className="text-gray-700">📧 regulamin@dreamfood.pl</p>
                <p className="text-gray-700">📞 +48 123 456 789</p>
                <p className="text-gray-700">🕐 Pon-Pt: 9:00-17:00</p>
                <p className="text-gray-700 text-sm mt-2">
                  <strong>Obsługa klienta:</strong> pomoc@dreamfood.pl
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Sprawy prawne:</strong> legal@dreamfood.pl
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-gray-700 text-sm">
                <strong>Numer KRS:</strong> 0000123456 |
                <strong> Sąd rejestrowy:</strong> Sąd Rejonowy dla m.st.
                Warszawy, XII Wydział Gospodarczy KRS
              </p>
            </div>
          </section>

          {/* Effective Date */}
          <section className="border-t border-gray-200 pt-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Regulamin wchodzi w życie z dniem publikacji na stronie
                internetowej.
              </p>
              <p className="text-gray-600 text-sm">
                Wersja z dnia: {new Date().toLocaleDateString('pl-PL')}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
