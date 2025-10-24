import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Datenschutz() {
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
          DATENSCHUTZ
        </h1>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="font-bebas text-3xl text-white mb-4 tracking-wide">Datenschutzerklärung</h2>
            <p className="mb-4">
              Wir freuen uns über Ihr Interesse an unserer Webseite. Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. 
              Nachfolgend informieren wir Sie im Detail über den Umgang mit Ihren Daten.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-white mb-4 tracking-wide">1. Datenschutz auf einen Blick</h2>
            
            <h3 className="text-xl text-white font-semibold mt-6 mb-3">Allgemeine Hinweise</h3>
            <p className="mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
              wenn Sie diese Webseite besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. 
              Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>

            <h3 className="text-xl text-white font-semibold mt-6 mb-3">Datenerfassung auf dieser Webseite</h3>
            <p className="mb-4">
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Webseite?</strong>
            </p>
            <p className="mb-4">
              Die Datenverarbeitung auf dieser Webseite erfolgt durch den Webseitenbetreiber. Dessen Kontaktdaten können Sie dem 
              Impressum dieser Webseite entnehmen.
            </p>

            <h3 className="text-xl text-white font-semibold mt-6 mb-3">Wie erfassen wir Ihre Daten?</h3>
            <p className="mb-4">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, 
              die Sie in ein Kontaktformular eingeben.
            </p>
            <p className="mb-4">
              Andere Daten werden automatisch oder nach Ihrer Einwilligung durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten 
              (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, 
              sobald Sie diese Webseite betreten.
            </p>

            <h3 className="text-xl text-white font-semibold mt-6 mb-3">Wofür nutzen wir Ihre Daten?</h3>
            <p className="mb-4">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Webseite zu gewährleisten. Andere Daten können zur 
              Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>

            <h3 className="text-xl text-white font-semibold mt-6 mb-3">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
            <p className="mb-4">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen 
              Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine 
              Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. 
              Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. 
              Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
            <p className="mb-4">
              Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-white mb-4 tracking-wide">2. Hosting und Content Delivery Networks (CDN)</h2>
            <p className="mb-4">
              Wir hosten unsere Webseite bei einem externen Dienstleister. Die personenbezogenen Daten, die auf dieser Webseite erfasst werden, 
              werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v.a. um IP-Adressen, Kontaktdaten, Meta- und Kommunikationsdaten, 
              Vertragsdaten, Kontaktdaten, Namen, Webseitenzugriffe und sonstige Daten, die über eine Webseite generiert werden, handeln.
            </p>
            <p className="mb-4">
              Die Nutzung des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden 
              (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots 
              durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-white mb-4 tracking-wide">3. Kontaktformular und E-Mail-Kontakt</h2>
            <p className="mb-4">
              Wenn Sie uns per Kontaktformular oder E-Mail kontaktieren, werden Ihre angegebenen Daten zur Bearbeitung Ihrer Anfrage 
              und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="mb-4">
              Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt somit ausschließlich auf Grundlage Ihrer Einwilligung 
              (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. 
              Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.
            </p>
            <p className="mb-4">
              Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur 
              Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihrer Anfrage). 
              Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-white mb-4 tracking-wide">4. Analyse- und Werbetools</h2>
            <p className="mb-4">
              Diese Webseite nutzt keine Analyse- oder Werbetools, die personenbezogene Daten erheben und an Dritte weitergeben.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-white mb-4 tracking-wide">5. Plugins und Tools</h2>
            <p className="mb-4">
              Diese Webseite verwendet Social-Media-Plugins von Drittanbietern. Diese Plugins sind mit einem entsprechenden Logo gekennzeichnet. 
              Wenn Sie eine Webseite aufrufen, die ein solches Plugin enthält, stellt Ihr Browser eine direkte Verbindung zu den Servern des 
              jeweiligen Anbieters her. Der Inhalt des Plugins wird vom Anbieter direkt an Ihren Browser übermittelt und von diesem in die Webseite 
              integriert. Wir haben daher keinen Einfluss auf den Umfang der Daten, die der Anbieter mit Hilfe dieses Plugins erhebt.
            </p>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-white mb-4 tracking-wide">6. Ihre Rechte als betroffene Person</h2>
            
            <h3 className="text-xl text-white font-semibold mt-6 mb-3">Auskunft, Löschung, Berichtigung</h3>
            <p className="mb-4">
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten 
              personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder 
              Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
            </p>

            <h3 className="text-xl text-white font-semibold mt-6 mb-3">Recht auf Einschränkung der Verarbeitung</h3>
            <p className="mb-4">
              Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit 
              an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:
            </p>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, 
                  um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
              <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung 
                  der Datenverarbeitung verlangen.</li>
              <li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von 
                  Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
              <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. 
                  Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bebas text-3xl text-white mb-4 tracking-wide">7. Aktualität dieser Datenschutzerklärung</h2>
            <p className="mb-4">
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Ende Oktober 2025. Durch die Weiterentwicklung unserer Webseite und Angebote 
              darüber oder aufgrund geänderter gesetzlicher oder behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}