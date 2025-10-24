import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Impressum() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-butcher-black text-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-butcher-red hover:text-butcher-red-light transition-colors mb-8"
          >
            ← Zurück zur Startseite
          </Link>
        </div>

        <h1 className="font-bebas text-5xl md:text-6xl text-butcher-red mb-12 tracking-wider">
          IMPRESSUM
        </h1>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="font-bebas text-3xl text-white mb-4 tracking-wide">Angaben gemäß § 5 TMG</h2>
            <div className="space-y-2">
              <p>Meat the Butcher</p>
              <p>Inhaber: Lasse Hosemann</p>
              <p>Rüdesheimer Ring 142</p>
              <p>53879 Euskirchen</p>
            </div>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-white mb-4 tracking-wide">Kontakt</h2>
            <div className="space-y-2">
              <p>Telefon: +49 (0) 163 265 6288</p>
              <p>E-Mail: meatthebutcher@web.de</p>
              <p>Webseite: www.meatthebutcher.de</p>
            </div>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-white mb-4 tracking-wide">Umsatzsteuer-Identifikationsnummer</h2>
            <p>USt-IdNr.: [USt-IdNr.]</p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-white mb-4 tracking-wide">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <div className="space-y-2">
              <p>Martin Neugebauer</p>
              <p>Eupener Str. 142</p>
              <p>53879 Euskirchen</p>
            </div>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-white mb-4 tracking-wide">Haftungsausschluss</h2>
            <div className="space-y-4">
              <h3 className="text-xl text-white font-semibold">Haftung für Inhalte</h3>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. 
                Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu 
                überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. 
                Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden 
                von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>

              <h3 className="text-xl text-white font-semibold mt-6">Haftung für Links</h3>
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese 
                fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber 
                der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. 
                Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <p>
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht 
                zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>

              <h3 className="text-xl text-white font-semibold mt-6">Urheberrecht</h3>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. 
                Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen 
                der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, 
                nicht kommerziellen Gebrauch gestattet.
              </p>
              <p>
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere 
                werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, 
                bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-white mb-4 tracking-wide">Quelle</h2>
            <p>
              Dieses Impressum wurde erstellt mit dem Impressum Generator von 
              <a 
                href="https://www.impressum-generator.de/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-butcher-red hover:text-butcher-red-light ml-1"
              >
                impressum-generator.de
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}